import { NavItemProps, SidebarProps } from "@/types/Types";
import React, { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import LogoutButton from "../ui/LogoutButton";
import { LiaClipboardListSolid } from "react-icons/lia";
import { RiUser3Fill } from "react-icons/ri";

const NavItem: React.FC<NavItemProps> = ({
  icon,
  title,
  isActive,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`flex items-center p-3 cursor-pointer rounded-lg text-md font-medium transition-all duration-300 ease-in-out ${
      isActive
        ? "bg-linear-to-r from-[#1b3270] to-transparent text-white shadow-lg"
        : "text-[#8CA3CD] hover:bg-linear-to-r from-[#1b3270] to-transparent hover:text-white"
    }`}
  >
    <span className="w-10 h-10 flex items-center justify-center mr-3 text-xl">
      {icon}
    </span>
    {title}
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu }) => {
  const navItems = useMemo(
    () => [
      {
        title: "Dashboard",
        icon: <HiHome />,
        key: "dashboard",
      },
      {
        title: "Todos",
        icon: <LiaClipboardListSolid />,
        key: "todos",
      },
      {
        title: "Account Information",
        icon: <RiUser3Fill />,
        key: "account",
      },
    ],
    []
  );

  return (
    <div className="bg-[#0D224A] text-white w-full h-full p-6 flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center mb-10 p-4 border-b border-gray-700">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-500 border-4 border-white shadow-xl mb-3">
            <img
              src="https://placehold.co/80x80/94A3B8/FFFFFF?text=A"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-lg font-semibold">amanuel</p>
          <p className="text-sm text-gray-400">amanuel@gmail.com</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavItem
              key={item.key}
              title={item.title}
              icon={item.icon}
              isActive={activeMenu === item.key}
              onClick={() => setActiveMenu(item.key)}
            />
          ))}
        </nav>
      </div>

      <LogoutButton />
    </div>
  );
};

export default Sidebar;
