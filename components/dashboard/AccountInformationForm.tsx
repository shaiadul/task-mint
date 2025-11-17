"use client";

import React, { useState, useEffect } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import ProfileImageUploader from "../ui/ProfileImageUploader";
import { UserProfile } from "@/types/Types";
import { request, ApiError } from "@/lib/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slices/loadingSlice";

interface FormProps {
  values: UserProfile;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AccountInformationForm({
  values,
  handleChange,
}: FormProps) {
  const [errors, setErrors] = useState<Partial<UserProfile>>({});
  const [imageError, setImageError] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(
    typeof values.profile_image === "string" ? values.profile_image : null
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (values.profile_image instanceof File) {
      setPreview(URL.createObjectURL(values.profile_image));
    } else if (typeof values.profile_image === "string") {
      setPreview(values.profile_image);
    } else {
      setPreview(null);
    }
  }, [values.profile_image]);

  const handleImageChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setImageError("Only image files are allowed.");
      return;
    }
    setImageError("");

    const url = URL.createObjectURL(file);
    setPreview(url);

    values.profile_image = file;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<UserProfile> = {};
    if (!values.first_name) newErrors.first_name = "First name is required.";
    if (!values.email) newErrors.email = "Email is required.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    dispatch(startLoading("Updating profile..."));

    try {
      const formData = new FormData();
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("email", values.email);
      formData.append("address", values.address);
      formData.append("contact_number", values.contact_number);
      if (values.birthday) formData.append("birthday", values.birthday);

      if (values.profile_image instanceof File) {
        formData.append("profile_image", values.profile_image);
      }

      const data = await request<FormData, UserProfile>({
        endpoint: "/users/me/",
        method: "PATCH",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Profile updated:", data);
      dispatch(stopLoading());
    } catch (err) {
      const error = err as ApiError;
      if (error.field)
        setErrors((prev) => ({ ...prev, [error.field!]: error.detail! }));
      else if (error.detail) alert(error.detail);
      else alert("Something went wrong. Please try again.");
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="p-4 sm:p-8 md:p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 relative inline-block">
        Account Information
        <span className="absolute left-0 bottom-0 w-2/3 border-b-2 border-blue-600"></span>
      </h2>

      {/* IMAGE UPLOADER */}

      <ProfileImageUploader
        image={
          preview ||
          (values.profile_image instanceof File
            ? URL.createObjectURL(values.profile_image)
            : values.profile_image) ||
          null
        }
        onChange={handleImageChange}
        error={imageError}
        firstName={values.first_name}
        email={values.email}
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-6 mt-6 border border-[#A1A3ABA1] rounded-xl shadow-md p-5"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            name="first_name"
            value={values.first_name}
            onChange={handleChange}
            error={errors.first_name}
          />
          <InputField
            label="Last Name"
            name="last_name"
            value={values.last_name}
            onChange={handleChange}
          />
        </div>

        <InputField
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          label="Address"
          name="address"
          value={values.address}
          onChange={handleChange}
        />

        <InputField
          label="Contact Number"
          name="contact_number"
          value={values.contact_number}
          onChange={handleChange}
        />

        <InputField
          label="Birthday"
          name="birthday"
          type="date"
          value={values.birthday || ""}
          onChange={handleChange}
        />

        <div className="flex space-x-4 pt-5 my-5 max-w-3xl mx-auto">
          <Button type="submit">Save Changes</Button>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
