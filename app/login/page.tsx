"use client";

import React, { useState } from "react";
import Image from "next/image";
import InputField from "@/components/ui/InputField";
import { LoginValues, AuthErrors } from "@/types/Types";
import Link from "next/link";
import SectionHeader from "@/components/global/SectionHeader";
import Button from "@/components/ui/Button";
import { ApiError, request } from "@/lib/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slices/loadingSlice";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [values, setValues] = useState<LoginValues>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<AuthErrors>({});
  const [apiError, setApiError] = useState<string>("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setApiError("");
    setErrors({});

    const newErrors: AuthErrors = {};
    if (!values.email) newErrors.email = "Email is required";
    if (!values.password) newErrors.password = "Password is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    dispatch(startLoading("Logging in..."));

    try {
      const data = await request<
        LoginValues,
        { refresh: string; access: string }
      >({
        endpoint: "/auth/login/",
        method: "POST",
        data: values,
      });

      console.log("Login success:", data);

      if (rememberMe) {
        localStorage.setItem("authToken", data.access); // persistent login
      } else {
        sessionStorage.setItem("authToken", data.access); // expires on browser close
      }

      router.push("/dashboard");
    } catch (err) {
      const error = err as ApiError;
      console.log("Login error:", error);

      if (error.field && error.detail) {
        setErrors((prev) => ({ ...prev, [error.field!]: error.detail! }));
      } else if (error.detail) {
        setApiError(error.detail);
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="h-screen bg-white shadow-xl rounded-2xl overflow-hidden w-full grid grid-cols-1 md:grid-cols-2">
      <div className="relative hidden md:block">
        <Image
          src="/images/auth/login.svg"
          alt="Login"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="p-8 sm:p-10 flex flex-col justify-center w-full max-w-md lg:max-w-lg mx-auto">
        <SectionHeader title="Log in to your account" />

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4">
            <label className="flex items-center cursor-pointer select-none mb-2 sm:mb-0">
              <input
                type="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition duration-150"
              />
              <span className="ml-2 text-md text-gray-700 font-medium">
                Remember me
              </span>
            </label>

            <Link
              href="/forgot-password"
              className="text-md font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-150"
            >
              Forgot your password?
            </Link>
          </div>

          {apiError && (
            <p className="text-red-500 text-sm font-medium">{apiError}</p>
          )}

          <Button type="submit">Log In</Button>
        </form>

        <div className="flex justify-center items-center mt-6">
          <p className="text-[#4B5563] text-md font-medium">
            Don't have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
