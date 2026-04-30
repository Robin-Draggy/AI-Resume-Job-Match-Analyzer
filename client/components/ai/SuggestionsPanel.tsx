"use client";

import CriticalFixes from "./CriticalFixes";
import QuickWins from "./QuickWins";
import SkillGapActions from "./SkillGapActions";
import RewriteSuggestions from "./RewriteSuggestions";
import { CompareResponse } from "@/types/compare";

interface SuggestionsPanelProps {
  data: CompareResponse;
}

export default function SuggestionsPanel({ data }: SuggestionsPanelProps) {
  const { original, tailored, improvement } = data;

  const scoreDrop = improvement.scoreIncrease < 0;

  return (
    <div className="glass-card space-y-6">
      <h2 className="text-xl font-semibold">AI Suggestions</h2>

      {scoreDrop && (
        <CriticalFixes original={original} tailored={tailored} />
      )}

      <QuickWins original={original} />
      <SkillGapActions missing={original.missingSkills} />
      <RewriteSuggestions />
    </div>
  );
}