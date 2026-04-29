"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Upload, Sparkles, TrendingUp, FileText, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Optimize Your Resume with{" "}
            <span className="gradient-text">AI Precision</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Instantly compare your resume with job descriptions, identify missing
            skills, and generate a tailored version that gets interviews.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/analyze" className="btn-primary inline-flex items-center gap-2">
              <Upload size={18} />
              Upload Resume
            </Link>
            <button className="btn-secondary inline-flex items-center gap-2">
              <FileText size={18} />
              See Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for{" "}
            <span className="gradient-text">Job Seekers</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to stand out in today's competitive job market
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It{" "}
            <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-600 text-lg">
            Three simple steps to a better resume
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card text-center relative"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {index + 1}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card text-center p-8"
            >
              <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card text-center py-16 bg-gradient-to-br from-cyan-50 to-purple-50"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Improving Your Resume Today
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Stop guessing. Let AI tell you exactly what to fix.
          </p>
          <Link href="/analyze" className="btn-primary inline-flex items-center gap-2">
            <Sparkles size={18} />
            Get Started For Free
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Smart Skill Matching",
    description: "Instantly see which skills match and what's missing from your resume.",
    icon: <Zap className="text-cyan-500" size={32} />
  },
  {
    title: "AI Resume Tailoring",
    description: "Generate a job-specific resume in seconds with AI-powered optimization.",
    icon: <Sparkles className="text-purple-500" size={32} />
  },
  {
    title: "Real Score Insights",
    description: "Understand exactly how strong your resume is with detailed analytics.",
    icon: <TrendingUp className="text-emerald-500" size={32} />
  }
];

const steps = [
  {
    title: "Upload Your Resume",
    description: "Upload your current resume in PDF format (max 2MB)"
  },
  {
    title: "Paste Job Description",
    description: "Copy and paste the job description you're targeting"
  },
  {
    title: "Get AI Analysis",
    description: "Receive instant feedback and a tailored resume version"
  }
];

const stats = [
  { value: "94%", label: "Interview Success Rate" },
  { value: "50K+", label: "Active Users" },
  { value: "4.9/5", label: "User Rating" }
];