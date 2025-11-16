"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Jane Doe",
    title: "Project Manager",
    text: "Task Mint streamlined our workflow. Our team is more productive than ever!",
  },
  {
    name: "John Smith",
    title: "Frontend Developer",
    text: "I love the simple UI and real-time collaboration features.",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">What Our Users Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="p-6 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300"
            >
              <p className="text-gray-700 mb-4">"{t.text}"</p>
              <h4 className="font-semibold">{t.name}</h4>
              <span className="text-sm text-gray-500">{t.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
