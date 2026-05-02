"use client";

import { useState } from "react";
import ResumeUpload from "@/components/upload/ResumeUpload";
import JobDescriptionInput from "@/components/input/JobDescriptionInput";
import Results from "@/components/results/Results";
import { resumeService } from "@/services/resumeService";
import { CompareResponse } from "@/types/compare";

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [jd, setJd] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CompareResponse | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!file || !jd) {
      setError('Please provide both resume and job description');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await resumeService.compare(file, jd);
      setData(result.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analyzing your resume...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
          <button
            onClick={() => setError('')}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // Results state
  if (data) {
    return <Results data={data} />;
  }

  // Initial form state
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
        Analyze Your Resume
      </h1>
      
      <p className="text-center text-gray-600">
        Upload your resume and paste the job description to get AI-powered insights
      </p>

      <ResumeUpload onFileSelect={setFile} />
      
      <JobDescriptionInput value={jd} onChange={setJd} />

      <button
        onClick={handleAnalyze}
        disabled={!file || !jd || loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>
    </div>
  );
}