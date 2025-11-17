"use client";

import React, { useState, useCallback, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AccountInformationForm from "@/components/dashboard/AccountInformationForm";
import { AccountValues, UserProfile } from "@/types/Types";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { request } from "@/lib/api";
import { HiMenu, HiX } from "react-icons/hi";
import Tasks from "@/components/dashboard/Tasks";
import TasksDashboard from "@/components/dashboard/TasksDashboard";

export default function DashboardPage() {
  const [values, setValues] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    contact_number: "",
    birthday: "",
    bio: "",
    profile_image: null,
  });

  const [activeMenu, setActiveMenu] = useState<string>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await request<undefined, UserProfile>({
          endpoint: "/users/me/",
          method: "GET",
        });

        setValues({
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
          email: data.email ?? "",
          address: data.address ?? "",
          contact_number: data.contact_number ?? "",
          birthday: data.birthday ?? "",
          bio: data.bio ?? "",
          profile_image: data.profile_image ?? null,
        });
      } catch (error) {
        console.error("Profile load failed:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name as keyof AccountValues]: value }));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#eef7ff]">
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-black rounded-full shadow-lg"
          aria-label="Toggle navigation"
        >
          {isSidebarOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>

        <DashboardLayout
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          isSidebarOpen={isSidebarOpen}
          values={values}
        >
          {activeMenu === "account" && (
            <div className="bg-white rounded-xl shadow-2xl transition-all duration-500 ease-in-out">
              <AccountInformationForm
                values={values}
                handleChange={handleChange}
              />
            </div>
          )}

          {activeMenu === "todos" && (
            <div className="transition-all duration-500 ease-in-out">
              <Tasks />
            </div>
          )}

          {activeMenu === "dashboard" && (
            <div className="transition-all duration-500 ease-in-out">
              <TasksDashboard />
            </div>
          )}
        </DashboardLayout>
      </div>
    </ProtectedRoute>
  );
}
