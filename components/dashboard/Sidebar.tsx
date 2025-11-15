import { startLoading, stopLoading } from "@/redux/slices/loadingSlice";
import { AppDispatch } from "@/redux/store";
import { NavItemProps, SidebarProps } from "@/types/Types";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";
import { HiCheck, HiHome, HiUser } from "react-icons/hi";
import { useDispatch } from "react-redux";

const NavItem: React.FC<NavItemProps> = ({
  icon,
  title,
  isActive,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`flex items-center p-3 cursor-pointer rounded-lg text-sm font-medium transition-all duration-300 ease-in-out ${
      isActive
        ? "bg-linear-to-r from-[#1b3270] to-transparent text-white shadow-lg"
        : "text-gray-300 hover:bg-linear-to-r from-[#1b3270] to-transparent hover:text-white"
    }`}
  >
    <span className="w-5 h-5 flex items-center justify-center mr-3 text-lg">
      {icon}
    </span>
    {title}
  </div>
);

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, setActiveMenu }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const navItems = useMemo(
    () => [
      {
        title: "Dashboard",
        icon: <HiHome size={20} />,
        key: "dashboard",
      },
      {
        title: "Todos",
        icon: <HiCheck size={20} />,
        key: "todos",
      },
      {
        title: "Account Information",
        icon: <HiUser size={20} />,
        key: "account",
      },
    ],
    []
  );

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

      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center p-3 cursor-pointer rounded-lg text-sm font-medium text-gray-300 hover:bg-red-800 hover:text-white transition-all duration-300 ease-in-out">
          <span className="w-5 h-5 flex items-center justify-center mr-3 text-lg">
            <HiUser size={20} />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
