"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiUsers, FiMessageCircle } from "react-icons/fi";

export default function CollaborationSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Collaborate Seamlessly
          </h2>
          <p className="text-gray-700 mb-6">
            Assign tasks, leave comments, and keep your team in sync with a simple interface.
          </p>
          <div className="flex gap-6 text-blue-600">
            <FiUsers size={32} />
            <FiMessageCircle size={32} />
          </div>
        </motion.div>
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <Image width={500} height={500} src="/images/home/hero.png" alt="Collaboration" />
        </motion.div>
      </div>
    </section>
  );
}
