"use client";

import React, { useState, useCallback } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AccountInformationForm from "@/components/dashboard/AccountInformationForm";
import { AccountValues } from "@/types/Types";
import ProtectedRoute from "@/lib/ProtectedRoute";

export default function DashboardPage() {
  const [values, setValues] = useState<AccountValues>({
    firstName: "Amanuel",
    lastName: "Yemane",
    email: "amanuel@gmail.com",
    address: "123 Main St, Springfield",
    contactNumber: "555-0101",
    birthday: "1990-01-01",
  });

  const [activeMenu, setActiveMenu] = useState<string>("account");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name as keyof AccountValues]: value }));
  }, []);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#eef7ff] font-inter">
        <button
          onClick={toggleSidebar}
          className="md:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-black rounded-full shadow-lg"
          aria-label="Toggle navigation"
        >
          <i className={`lucide-${isSidebarOpen ? "x" : "menu"} w-6 h-6`}></i>
        </button>

        <DashboardLayout
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          isSidebarOpen={isSidebarOpen}
        >
          {activeMenu === "account" ? (
            <div className="bg-white rounded-xl shadow-2xl transition-all duration-500 ease-in-out">
              <AccountInformationForm
                values={values}
                handleChange={handleChange}
              />
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl shadow-2xl transition-all duration-500 ease-in-out">
              <h3 className="text-xl font-semibold capitalize">
                {activeMenu} Page Content
              </h3>
              <p className="text-gray-500 mt-2">
                This area would display content for the {activeMenu} section.
              </p>
            </div>
          )}
        </DashboardLayout>
      </div>
    </ProtectedRoute>
  );
}
