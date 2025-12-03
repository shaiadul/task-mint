"use client";

import { MdOutlineLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slices/loadingSlice";

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className = "" }: LogoutButtonProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(startLoading("Logging out..."));

    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    setTimeout(() => {
      dispatch(stopLoading());
      router.replace("/login");
    }, 500);
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex justify-center items-center w-full px-4 py-3 mx-auto text-lg font-medium text-[#8CA3CD] hover:text-red-600 transition-all duration-500 ease-in-out cursor-pointer ${className}`}
    >
      <MdOutlineLogout className="mr-3 text-2xl" />
      Logout
    </button>
  );
}
