import { NavItemProps, SidebarProps } from "@/types/Types";
import React, { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import LogoutButton from "../ui/LogoutButton";
import { LiaClipboardListSolid } from "react-icons/lia";
import { RiUser3Fill } from "react-icons/ri";
import ProfileAvatar from "./ProfileAvatar";

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
    <span className="w-10 h-10 flex items-center justify-center mr-1.5 text-xl">
      {icon}
    </span>
    {title}
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({
  activeMenu,
  setActiveMenu,
  values,
}) => {
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
    // <div className="bg-[#0D224A] text-white w-full h-full p-6 flex flex-col justify-between">
    <div className="fixed top-0 left-0 bg-[#0D224A] text-white w-80 h-screen p-6 flex flex-col justify-between shadow-xl">
      <div>
        <ProfileAvatar
          profile_image={
            values?.profile_image instanceof File
              ? URL.createObjectURL(values.profile_image)
              : values?.profile_image || ""
          }
          first_name={values?.first_name}
          email={values?.email}
        />

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
