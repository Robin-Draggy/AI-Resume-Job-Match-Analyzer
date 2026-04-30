import { Brain } from "lucide-react";
import Section from "./Section";
import SuggestionItem from "./SuggestionItem";

interface SkillGapActionsProps {
  missing: string[];
}

export default function SkillGapActions({ missing }: SkillGapActionsProps) {
  return (
    <Section icon={<Brain className="text-cyan-400" />} title="Skill Gap Actions">
      {missing.map((skill) => (
        <SuggestionItem
          key={skill}
          title={`Learn & Show "${skill}"`}
          description={`Recruiters expect practical usage, not just listing.`}
          action={`Build a mini project using ${skill} and mention it.`}
        />
      ))}
    </Section>
  );
}