"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis } from "recharts";

export default function SkillsRadar({ matched }: { matched: string[] }) {
  const data = matched.slice(0, 6).map((skill) => ({
    skill,
    value: 80, // static for now (later dynamic)
  }));

  return (
    <div className="glass-card">
      <h3 className="mb-4">Skill Strength</h3>

      <RadarChart outerRadius={80} width={300} height={250} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="skill" />
        <Radar dataKey="value" />
      </RadarChart>
    </div>
  );
}