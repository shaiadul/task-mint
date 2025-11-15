import React, { useMemo } from "react";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { RiNotification3Fill } from "react-icons/ri";

const Header: React.FC = () => {
  const currentDate = useMemo(() => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  return (
    <header className="flex justify-between items-center px-4 sm:px-8 md:px-10 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center">
        <Image
          src="/images/global/logo.svg"
          alt="Task Mint Logo"
          width={105}
          height={32}
          className="object-contain"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="p-2 bg-[#5272ff] text-white rounded-xl cursor-pointer transition-colors duration-300 shadow-sm">
          <RiNotification3Fill />
        </div>

        <div className="p-2 bg-[#5272ff] text-white rounded-xl cursor-pointer transition-colors duration-300 shadow-sm">
          <SlCalender />
        </div>

        <div className="text-gray-600 text-md font-medium hidden sm:block text-right">
          <div className="font-light">{currentDate.split(",")[0]}</div>
          <div className="font-semibold">{currentDate.split(",")[1]}</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
