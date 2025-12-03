"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiUsers } from "react-icons/fi";

const features = [
  {
    icon: <FiCheckCircle size={28} />,
    title: "Organize Tasks",
    description: "Easily create, edit, and categorize tasks for better productivity.",
  },
  {
    icon: <FiClock size={28} />,
    title: "Track Deadlines",
    description: "Never miss a deadline with intuitive progress tracking.",
  },
  {
    icon: <FiUsers size={28} />,
    title: "Collaborate",
    description: "Invite your team and manage tasks together seamlessly.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
