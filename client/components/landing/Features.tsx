export default function Features() {
  const items = [
    {
      title: "Smart Skill Matching",
      desc: "Instantly see which skills match and what's missing.",
    },
    {
      title: "AI Resume Tailoring",
      desc: "Generate a job-specific resume in seconds.",
    },
    {
      title: "Real Score Insights",
      desc: "Understand exactly how strong your resume is.",
    },
  ];

  return (
    <section className="grid md:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.title} className="glass-card">
          <h3 className="text-xl font-semibold">{item.title}</h3>
          <p className="text-gray-300 mt-2">{item.desc}</p>
        </div>
      ))}
    </section>
  );
}