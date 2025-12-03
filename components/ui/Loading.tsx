// components/ui/Loading.tsx
"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { motion } from "framer-motion";

const Loading: React.FC = () => {
  const { isLoading, message } = useSelector(
    (state: RootState) => state.loading
  );

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white bg-opacity-50 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent border-b-transparent rounded-full animate-spin"></div>
        {message && <p className="mt-4 text-blue-500 text-lg">{message}</p>}
      </div>
    </motion.div>
  );
};

export default Loading;
