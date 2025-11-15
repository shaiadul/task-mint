import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  isSidebarOpen: boolean;
}

const DashboardLayout: React.FC<LayoutProps> = ({ children, activeMenu, setActiveMenu, isSidebarOpen }) => {
  const sidebarClass = isSidebarOpen ? "fixed inset-0 z-40 md:static md:translate-x-0" : "hidden md:block";
  const contentTransition = "transition-all duration-500 ease-in-out";

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] min-h-screen">
      <div className={`h-screen ${sidebarClass}`}>
        <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      </div>
      <div className={`flex flex-col ${contentTransition}`}>
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
