"use client";

import React, { useState } from "react";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import ProfileImageUploader from "../ui/ProfileImageUploader";
import { UserProfile } from "@/types/Types";

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

  const handleImageChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setImageError("Only image files are allowed.");
      return;
    }
    setImageError("");

    // Preview image instantly
    const url = URL.createObjectURL(file);
    values.profile_image = url;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<UserProfile> = {};

    if (!values.first_name) newErrors.first_name = "First name is required.";
    if (!values.email) newErrors.email = "Email is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    console.log("Saving changes:", values);
  };

  return (
    <div className="p-4 sm:p-8 md:p-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 relative inline-block">
        Account Information
        <span className="absolute left-0 bottom-0 w-2/3 border-b-2 border-blue-600"></span>
      </h2>

      {/* IMAGE UPLOADER */}
      <ProfileImageUploader
        image={values.profile_image}
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
          value={values.birthday}
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
