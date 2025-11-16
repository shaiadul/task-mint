"use client";

import React, { useState } from "react";
import Image from "next/image";
import validateForm from "@/lib/validateForm";
import InputField from "@/components/ui/InputField";
import { SignupValues, AuthErrors, SignupRequest } from "@/types/Types";
import Link from "next/link";
import SectionHeader from "@/components/global/SectionHeader";
import Button from "@/components/ui/Button";
import { ApiError, request } from "@/lib/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slices/loadingSlice";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [values, setValues] = useState<SignupValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<AuthErrors>({});
  const [apiError, setApiError] = useState<string>("");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setApiError("");
    const validationErrors = validateForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    dispatch(startLoading("Signing up..."));

    try {
      const { confirmPassword, ...submitValues } = values;

      const data = await request<SignupRequest, { id: string; email: string }>({
        endpoint: "/users/signup/",
        method: "POST",
        data: submitValues,
      });

      console.log("User created:", data);
      router.push("/login");
    } catch (err) {
      const error = err as ApiError;
      console.log("Signup err:", error);

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
          src="/images/auth/signup.svg"
          alt="Signup"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="p-8 sm:p-10 flex flex-col justify-center w-full max-w-md lg:max-w-lg mx-auto">
        <SectionHeader />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />

            <InputField
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>

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

          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          {/* <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-medium mt-2 hover:bg-blue-700 transition-all duration-500 cursor-pointer"
          >
            Sign Up
          </button> */}

          {apiError && (
            <p className="text-red-500 text-sm font-medium">{apiError}</p>
          )}

          <Button type="submit">Sign Up</Button>
        </form>

        <div className="flex justify-center items-center mt-6">
          <p className="text-[#4B5563] text-md font-medium">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
