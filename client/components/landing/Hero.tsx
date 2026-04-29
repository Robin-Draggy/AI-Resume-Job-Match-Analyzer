"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="text-center max-w-4xl mx-auto">
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold leading-tight"
      >
        Optimize Your Resume with{" "}
        <span className="bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          AI Precision
        </span>
      </motion.h1>

      <p className="mt-6 text-gray-300 text-lg md:text-xl">
        Instantly compare your resume with job descriptions, identify missing
        skills, and generate a tailored version that gets interviews.
      </p>

      {/* CTA */}
      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <button className="px-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-purple-500 hover:opacity-90 transition">
          Upload Resume
        </button>

        <button className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition">
          See Demo
        </button>
      </div>
    </section>
  );
}