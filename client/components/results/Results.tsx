"use client";

import { motion } from "framer-motion";
import ResumeSection from "../resume/ResumeSection";
import SkillsBreakdown from "./SkillsBreakdown";
import ImprovementCard from "./ImprovementCard";
import ScoreChart from "./ScoreChart";

export default function Results({ data }: { data: any }) {
  return (
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
    </motion.div>
  );
}