"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface Props {
  data: {
    totalMatched: number;
    totalRequired: number;
  };
}

export default function DonutSkillChart({ data }: Props) {
  const chartData = [
    { name: "Matched", value: data.totalMatched },
    { name: "Missing", value: data.totalRequired - data.totalMatched },
  ];

  return (
    <div className="glass-card flex flex-col items-center">
      <h3 className="mb-4 text-lg">Skill Coverage</h3>

      <PieChart width={200} height={200}>
        <Pie
          data={chartData}
          dataKey="value"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={3}
        >
          {chartData.map((_, index) => (
            <Cell key={index} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}