import React, { useMemo } from "react";

const Header: React.FC = () => {
  const currentDate = useMemo(() => {
    const today = new Date();
    return today.toLocaleDateString("en-US", { weekday: "long", month: "numeric", day: "numeric", year: "numeric" });
  }, []);

  return (
    <header className="flex justify-end items-center p-4 sm:p-6 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="p-2 bg-blue-100 text-blue-600 rounded-xl cursor-pointer hover:bg-blue-200 transition-colors duration-300 shadow-sm">
          <i className="lucide-bell w-5 h-5"></i>
        </div>
        <div className="text-gray-600 text-sm font-medium hidden sm:block">
          <div className="font-light">Friday</div>
          <div className="font-semibold">{currentDate}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
