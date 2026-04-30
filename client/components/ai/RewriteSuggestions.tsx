import { PenLine } from "lucide-react";
import Section from "./Section";
import SuggestionItem from "./SuggestionItem";

export default function RewriteSuggestions() {
  return (
    <Section icon={<PenLine className="text-purple-400" />} title="Rewrite Suggestions">
      <SuggestionItem
        title="Improve bullet points"
        description="Your experience bullets are generic."
        action="Use: Action verb + Tech + Impact (e.g. Improved load time by 30%)"
      />

      <SuggestionItem
        title="Add measurable impact"
        description="Recruiters prioritize results."
        action="Include metrics like %, time saved, performance boost."
      />
    </Section>
  );
}