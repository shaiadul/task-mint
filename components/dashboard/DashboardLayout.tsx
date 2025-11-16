import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { LayoutProps } from "@/types/Types";

const DashboardLayout: React.FC<LayoutProps> = ({
  children,
  activeMenu,
  setActiveMenu,
  isSidebarOpen,
  values,
}) => {
  const sidebarClass = isSidebarOpen
    ? "fixed inset-0 z-40 md:static md:translate-x-0"
    : "hidden md:block";
  const contentTransition = "transition-all duration-300 ease-in-out";

  return (
    <div className="flex min-h-screen">
      <div className={`h-screen ${sidebarClass} ${contentTransition}`}>
        <Sidebar
          values={values}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
        />
      </div>

      <div
        className={`flex flex-col flex-1 min-h-screen ${contentTransition} ml-0 md:ml-80`}
      >
        <Header />
        <main className="flex-1 overflow-auto p-6 sm:p-8 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
