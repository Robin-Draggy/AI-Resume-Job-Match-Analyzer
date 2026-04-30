"use client";

import { motion } from "framer-motion";
import ResumeSection from "../resume/ResumeSection";
import SkillsBreakdown from "./SkillsBreakdown";
import ImprovementCard from "./ImprovementCard";
import ScoreChart from "./ScoreChart";
import SuggestionsPanel from "../ai/SuggestionsPanel";
import DonutSkillChart from "./DonutSkillChart";
import ComparisonBarChart from "./ComparisonBarChart";
import SkillsRadar from "./SkillsRadar";

export default function Results({ data }: { data: any }) {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center bg-linear-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
        Results Dashboard
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10"
      >
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <ScoreChart
            original={data.original.matchScore}
            tailored={data.tailored.analysis.matchScore}
          />

          <ComparisonBarChart
            original={data.original.matchScore}
            tailored={data.tailored.analysis.matchScore}
          />

          <SkillsBreakdown
            matched={data.original.matchedSkills}
            missing={data.original.missingSkills}
          />

          <SuggestionsPanel data={data} />
        </div>

        {/* Right */}
        <div className="space-y-6">
          <ImprovementCard improvement={data.improvement} />

          <DonutSkillChart data={data.original.stats} />

          <SkillsRadar matched={data.original.matchedSkills} />
        </div>
      </motion.div>

      {/* Resume */}
      <div className="mt-8">
        <ResumeSection resume={data.tailored.resume} />
      </div>
    </div>
  );
}