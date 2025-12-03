"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { FiCamera, FiUpload } from "react-icons/fi";
import { ProfileImageUploadProps } from "@/types/Types";

export default function ProfileImageUploader({
  image,
  onChange,
  error,
  firstName,
  email,
}: ProfileImageUploadProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(image || null);

  const firstLetter =
    firstName?.charAt(0).toUpperCase() || email?.charAt(0).toUpperCase() || "U";

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange(file);
      //   setPreview(URL.createObjectURL(file));
      setPreview(URL.createObjectURL(file));
      
    }
  };

  return (
    <div className="w-full max-w-[405px] flex items-center gap-6 p-5 rounded-xl border border-[#A1A3ABA1] bg-white shadow-md">
      <div className="relative">
        <div className="w-28 h-28 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden text-gray-700 text-4xl font-bold shadow">
          {preview ? (
            <Image
              src={preview}
              alt="Profile"
              width={120}
              height={120}
              className="w-full h-full object-cover"
            />
          ) : (
            firstLetter
          )}
        </div>

        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="absolute bottom-1 right-1 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md transition cursor-pointer"
        >
          <FiCamera size={16} />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileRef}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-all duration-500 cursor-pointer"
      >
        <FiUpload size={18} />
        Upload New Photo
      </button>

      {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
    </div>
  );
}
