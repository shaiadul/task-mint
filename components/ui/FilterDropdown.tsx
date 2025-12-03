"use client";
import { useState } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { AnimatePresence, motion } from "framer-motion";

export type DeadlineOption =
  | "Deadline Today"
  | "Expires in 5 days"
  | "Expires in 10 days"
  | "Expires in 30 days";

interface FilterDropdownProps {
  options: DeadlineOption[];
  selected: DeadlineOption[];
  onChange: (selected: DeadlineOption[]) => void;
}

export default function FilterDropdown({
  options,
  selected,
  onChange,
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (option: DeadlineOption) => {
    onChange(
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option]
    );
  };

  return (
    <div className="relative w-[180px]">
      <button
        onClick={toggleMenu}
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-lg
                   shadow-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span>Filter by</span>
        <LuArrowUpDown size={18} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onMouseLeave={toggleMenu}
            className="absolute right-0 mt-2 w-full bg-white rounded-lg shadow-xl py-2 z-20 border border-gray-200"
          >
            <h4 className="px-3 py-1 text-sm font-semibold text-gray-400 border-b-2 border-gray-200">
              Date
            </h4>
            <div className="space-y-1 p-2">
              {options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 px-2 py-1 rounded hover:bg-blue-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700 text-sm">{option}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
