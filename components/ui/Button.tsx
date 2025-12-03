import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}

export default function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "w-full py-2 rounded-lg text-lg font-medium transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1";

  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses =
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300";
      break;
    case "secondary":
      variantClasses =
        "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-300";
      break;
    case "danger":
      variantClasses =
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300";
      break;
  }

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
