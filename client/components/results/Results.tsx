"use client";

import { motion } from "framer-motion";
import ResumeSection from "../resume/ResumeSection";
import SkillsBreakdown from "./SkillsBreakdown";
import ImprovementCard from "./ImprovementCard";
import ScoreChart from "./ScoreChart";
import SuggestionsPanel from "../ai/SuggestionsPanel";

export default function Results({ data }: { data: any }) {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
        Results
      </h1>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8 mt-10"
      >
        {/* Scores */}
        <ScoreChart
          original={data.original.matchScore}
          tailored={data.tailored.analysis.matchScore}
        />

        {/* Skills */}
        <SkillsBreakdown
          matched={data.original.matchedSkills}
          missing={data.original.missingSkills}
        />

        {/* Improvement */}
        <ImprovementCard improvement={data.improvement} />

        {/* Tailored Resume */}
        <ResumeSection resume={data.tailored.resume} />

        <SuggestionsPanel data={data} />
      </motion.div>
    </div>
  );
}
