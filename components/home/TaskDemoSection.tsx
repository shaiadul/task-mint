"use client";

import { motion } from "framer-motion";

const tasks = [
  { title: "Design landing page", status: "In Progress" },
  { title: "Implement auth API", status: "Pending" },
  { title: "Write unit tests", status: "Completed" },
];

export default function TaskDemoSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          See Task Management in Action
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {tasks.map((task, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="p-6 rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
              <span
                className={`text-sm font-medium px-3 py-1 rounded-full ${
                  task.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : task.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {task.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
