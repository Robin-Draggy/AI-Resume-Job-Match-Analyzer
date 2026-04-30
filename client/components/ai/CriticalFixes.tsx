import { AlertTriangle } from "lucide-react";
import Section from "./Section";
import SuggestionItem from "./SuggestionItem";
import { CompareResponse } from "@/types/compare";

interface CriticalFixesProps {
  original: CompareResponse["original"];
  tailored: CompareResponse["tailored"];
}

export default function CriticalFixes({ original, tailored }: CriticalFixesProps) {
  const droppedSkills = original.matchedSkills.filter(
    (skill) => !tailored.analysis.matchedSkills.includes(skill)
  );

  return (
    <Section
      icon={<AlertTriangle className="text-red-400" />}
      title="Critical Fixes"
    >
      {droppedSkills.map((skill) => (
        <SuggestionItem
          key={skill}
          title={`You lost "${skill}" in tailored resume`}
          description={`Your tailored resume removed or weakened "${skill}". Reintroduce it in your experience section.`}
          action={`Add "${skill}" in a real project bullet with context.`}
        />
      ))}
    </Section>
  );
}