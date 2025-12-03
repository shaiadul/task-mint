"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { startLoading, stopLoading } from "@/redux/slices/loadingSlice";

interface ProtectedRouteProps {
  children: React.ReactNode;
  waitTime?: number;
}

export default function ProtectedRoute({
  children,
  waitTime = 1000,
}: ProtectedRouteProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(startLoading("Checking authentication..."));

      // Intentional wait
      await new Promise((resolve) => setTimeout(resolve, waitTime));

      const token =
        localStorage.getItem("authToken") ||
        sessionStorage.getItem("authToken");

      if (!token) {
        router.replace("/login");
      } else {
        setIsAllowed(true);
      }

      dispatch(stopLoading());
    };

    checkAuth();
  }, [router, dispatch, waitTime]);

  // Show nothing while loading / checking
  if (!isAllowed) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100"></div>
    );
  }

  return <>{children}</>;
}
