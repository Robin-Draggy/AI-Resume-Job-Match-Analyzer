import { Zap } from "lucide-react";
import Section from "./Section";
import SuggestionItem from "./SuggestionItem";
import { Analysis } from "@/types/compare";

interface QuickWinsProps {
  original: Analysis;
}

export default function QuickWins({ original }: QuickWinsProps) {
  return (
    <Section icon={<Zap className="text-yellow-400" />} title="Quick Wins">
      {original.missingSkills.slice(0, 3).map((skill) => (
        <SuggestionItem
          key={skill}
          title={`Add "${skill}"`}
          description={`This skill appears in the job but not your resume.`}
          action={`Mention "${skill}" in skills or projects section.`}
        />
      ))}
    </Section>
  );
}