"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export default function SkillsBreakdown({
  matched,
  missing,
}: {
  matched: string[];
  missing: string[];
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Matched Skills */}
      <div className="glass-card">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="text-emerald-500" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">Matched Skills</h3>
          <span className="ml-auto bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-sm font-medium">
            {matched.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {matched.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className="skill-tag-matched"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Missing Skills */}
      <div className="glass-card">
        <div className="flex items-center gap-2 mb-4">
          <XCircle className="text-red-500" size={24} />
          <h3 className="text-lg font-semibold text-gray-900">Missing Skills</h3>
          <span className="ml-auto bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
            {missing.length}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {missing.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.02 }}
              className="skill-tag-missing"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}