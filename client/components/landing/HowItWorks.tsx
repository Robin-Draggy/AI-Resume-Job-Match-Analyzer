export default function HowItWorks() {
  const steps = [
    "Upload your resume",
    "Paste job description",
    "Get AI analysis & tailored resume",
  ];

  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold mb-8">How It Works</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <div key={i} className="glass-card">
            <p className="text-4xl font-bold text-cyan-400">{i + 1}</p>
            <p className="mt-2 text-gray-300">{step}</p>
          </div>
        ))}
      </div>
    </section>
  );
}