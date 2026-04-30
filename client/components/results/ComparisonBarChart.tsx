"use client";

import { BarChart, Bar, XAxis, Tooltip } from "recharts";

interface Props {
  original: number;
  tailored: number;
}

export default function ComparisonBarChart({ original, tailored }: Props) {
  const data = [
    { name: "Original", score: original },
    { name: "Tailored", score: tailored },
  ];

  return (
    <div className="glass-card">
      <h3 className="mb-4">Score Comparison</h3>

      <BarChart width={300} height={200} data={data}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="score" radius={[6, 6, 0, 0]} />
      </BarChart>
    </div>
  );
}