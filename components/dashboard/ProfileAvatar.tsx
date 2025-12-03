"use client";
import { ProfileAvatarProps } from "@/types/Types";
import Image from "next/image";

export default function ProfileAvatar({
  profile_image,
  first_name,
  email,
}: ProfileAvatarProps) {
  const firstLetter =
    first_name?.charAt(0).toUpperCase() ||
    email?.charAt(0).toUpperCase() ||
    "U";

  return (
    <div className="flex flex-col items-center mb-10 p-4">
      <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-300 border border-white shadow-xl mb-3 flex items-center justify-center text-gray-700 font-bold text-3xl">
        {profile_image ? (
          <Image
            src={profile_image ? profile_image : ""}
            className="w-full h-full object-cover"
            width={100}
            height={100}
            alt={`Profile Image of ${first_name ? first_name : "User"}`}
          />
        ) : (
          firstLetter
        )}
      </div>

      <p className="text-lg font-semibold">{first_name || ""}</p>

      <p className="text-sm text-gray-400">{email}</p>
    </div>
  );
}
