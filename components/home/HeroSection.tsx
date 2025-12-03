"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative bg-linear-to-r from-blue-600 to-purple-600 text-white py-32">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mb-10 md:mb-0"
        >
          <h1 className="text-5xl font-bold mb-6 leading-tight">Task Mint</h1>
          <p className="text-lg md:text-xl mb-8">
            Simplify your workflow. Manage tasks, track progress, and
            collaborate with your team seamlessly.
          </p>
          <div className="flex gap-4">
            <Link
              href="/signup"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              Get Started
            </Link>
            <Link href="/dashboard" className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-500 cursor-pointer">
              Explore More
            </Link>
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center"
        >
          <Image
            src="/images/home/hero.png"
            alt="Task Management Illustration"
            className="w-full max-w-md"
            layout="responsive"
            width={500}
            height={500}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
