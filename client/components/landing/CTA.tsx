import Link from "next/link";

export default function CTA() {
  return (
    <section className="text-center glass-card py-12">
      <h2 className="text-3xl font-bold">
        Start Improving Your Resume Today
      </h2>

      <p className="text-gray-300 mt-3">
        Stop guessing. Let AI tell you exactly what to fix.
      </p>

      <button className="mt-6 px-8 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-purple-500 hover:opacity-90 transition">
        <Link href="/analyze">Get started here</Link>
      </button>
    </section>
  );
}