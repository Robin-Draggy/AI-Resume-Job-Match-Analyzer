"use client";

import { TrendingUp, TrendingDown, Award } from "lucide-react";

export default function ImprovementCard({ improvement }: { improvement: any }) {
  const isPositive = improvement.scoreIncrease > 0;

  return (
    <div className="glass-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Overall Improvement</h3>
        {isPositive ? (
          <TrendingUp className="text-emerald-500" size={24} />
        ) : (
          <TrendingDown className="text-red-500" size={24} />
        )}
      </div>

      <div className="text-center mb-4">
        <p className="text-5xl font-bold mb-2">
          {isPositive ? "+" : ""}{improvement.scoreIncrease}%
        </p>
        <p className={`text-sm ${isPositive ? "text-emerald-600" : "text-red-600"} font-medium`}>
          {isPositive ? "Improvement Detected" : "Needs Improvement"}
        </p>
      </div>

      {improvement.newlyMatchedSkills.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Award size={18} className="text-cyan-500" />
            <p className="text-sm font-medium text-gray-700">
              Newly Matched Skills
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {improvement.newlyMatchedSkills.map((s: string) => (
              <span
                key={s}
                className="skill-tag-matched"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}