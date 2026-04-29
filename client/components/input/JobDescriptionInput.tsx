"use client";

export default function JobDescriptionInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="glass-card">
      <h3 className="mb-3 text-lg">Job Description</h3>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste the job description here..."
        className="w-full h-40 p-3 rounded-xl bg-white/5 border border-white/10 outline-none"
      />
    </div>
  );
}