import { motion } from "framer-motion";

interface SuggestionItemProps {
  title: string;
  description: string;
  action: string;
}

export default function SuggestionItem({ title, description, action }: SuggestionItemProps) {
  return (
    <motion.div
      className="p-4 rounded-xl bg-white/5 border border-white/10"
      whileHover={{ scale: 1.02 }}
    >
      <h4 className="font-medium">{title}</h4>
      <p className="text-sm text-gray-300">{description}</p>
      <p className="text-sm text-cyan-400 mt-1">👉 {action}</p>
    </motion.div>
  );
}