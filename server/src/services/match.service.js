const normalizeText = (text) =>
  text.toLowerCase().replace(/[^\w\s]/g, "");

const extractKeywords = (text) => {
  return new Set(normalizeText(text).split(/\s+/));
};

export const analyzeMatch = (resumeText, jobText) => {
  const resumeKeywords = extractKeywords(resumeText);
  const jobKeywords = extractKeywords(jobText);

  let matchCount = 0;

  jobKeywords.forEach((word) => {
    if (resumeKeywords.has(word)) {
      matchCount++;
    }
  });

  const matchScore = Math.round(
    (matchCount / jobKeywords.size) * 100
  );

  const missingSkills = [...jobKeywords].filter(
    (word) => !resumeKeywords.has(word)
  );

  return {
    matchScore,
    missingSkills: missingSkills.slice(0, 20), // limit
    suggestions: [
      "Add more relevant keywords from the job description",
      "Highlight measurable achievements",
      "Align your experience with required skills"
    ]
  };
};