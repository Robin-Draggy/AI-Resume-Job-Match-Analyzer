"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function ScoreChart({
  original,
  tailored,
}: {
  original: number;
  tailored: number;
}) {
  const data = [
    { name: "Original", score: original, color: "#94A3B8" },
    { name: "Tailored", score: tailored, color: "#8B5CF6" },
  ];

  return (
    <div className="glass-card">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Comparison</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#64748B" />
            <YAxis stroke="#64748B" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "12px",
                padding: "8px 12px"
              }}
            />
            <Bar dataKey="score" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}