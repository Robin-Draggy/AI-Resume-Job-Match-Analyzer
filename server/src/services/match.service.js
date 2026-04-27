// match.service.js (CommonJS - Production Ready)

// ----------------------
// STOPWORDS
// ----------------------
const STOPWORDS = new Set([
  "the","is","are","a","an","and","or","we","you","they",
  "to","of","in","for","on","with","as","by","at","from",
  "this","that","it","be","was","were","will","can","has","have"
]);

// ----------------------
// NORMALIZE TEXT
// ----------------------
const normalizeText = (text) => {
  if (!text || typeof text !== "string") return "";

  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

// ----------------------
// SKILL DICTIONARY + ALIASES
// ----------------------
const SKILL_KEYWORDS = {
  javascript: ["javascript", "js"],
  typescript: ["typescript", "ts"],
  react: ["react", "reactjs", "react.js"],
  redux: ["redux"],
  zustand: ["zustand"],
  "context api": ["context api"],
  node: ["node", "nodejs", "node.js"],
  express: ["express"],
  mongodb: ["mongodb"],
  html: ["html"],
  css: ["css"],
  tailwind: ["tailwind", "tailwindcss"],
  "rest api": ["rest api", "restful api"],
  api: ["api", "apis"],
  git: ["git"],
  "next.js": ["nextjs", "next.js"]
};

// ----------------------
// SECTION DETECTION
// ----------------------
const extractSkillSection = (text) => {
  const lower = text.toLowerCase();
  const keywords = ["skill", "skills", "expertise", "tech stack"];

  let sectionText = "";

  for (const key of keywords) {
    const index = lower.indexOf(key);
    if (index !== -1) {
      sectionText += text.slice(index, index + 1200);
    }
  }

  return sectionText;
};

// ----------------------
// SKILL EXTRACTION
// ----------------------
const extractSkills = (text) => {
  const normalized = normalizeText(text);
  const sectionText = normalizeText(extractSkillSection(text));

  const skillMap = {};

  for (const [skill, aliases] of Object.entries(SKILL_KEYWORDS)) {
    let total = 0;
    let section = 0;

    for (const alias of aliases) {
      const pattern = alias.replace(".", "\\.");
      const regex = new RegExp(`\\b${pattern}\\b`, "gi");

      total += (normalized.match(regex) || []).length;
      section += (sectionText.match(regex) || []).length;
    }

    if (total > 0) {
      skillMap[skill] = { total, section };
    }
  }

  return skillMap;
};

// ----------------------
// KEYWORDS
// ----------------------
const extractKeywords = (text) => {
  const words = normalizeText(text).split(" ");
  const set = new Set();

  for (const word of words) {
    if (word.length > 2 && !STOPWORDS.has(word) && isNaN(word)) {
      set.add(word);
    }
  }

  return set;
};

// ----------------------
// MAIN ANALYSIS
// ----------------------
const analyzeMatch = (resumeText, jobText) => {
  if (!resumeText || resumeText.length < 50) {
    return {
      matchScore: 0,
      matchedSkills: [],
      missingSkills: [],
      suggestions: ["Invalid or unreadable resume"]
    };
  }

  const resumeSkillsMap = extractSkills(resumeText);
  const jobSkillsMap = extractSkills(jobText);

  const resumeKeywords = extractKeywords(resumeText);
  const jobKeywords = extractKeywords(jobText);

  const matchedSkills = [];
  const missingSkills = [];

  // ----------------------
  // SMART CLASSIFICATION
  // ----------------------
  for (const skill of Object.keys(jobSkillsMap)) {
    const data = resumeSkillsMap[skill];

    if (!data) {
      missingSkills.push(skill);
      continue;
    }

    // HIGH CONFIDENCE
    if (data.section > 0 || data.total >= 2) {
      matchedSkills.push(skill);
    }
    // MEDIUM CONFIDENCE (still acceptable match)
    else if (data.total === 1) {
      matchedSkills.push(skill);
    }
    // otherwise ignore (no weak bucket anymore)
  }

  // ----------------------
  // KEYWORD SCORE
  // ----------------------
  let keywordMatchCount = 0;

  jobKeywords.forEach((word) => {
    if (resumeKeywords.has(word)) keywordMatchCount++;
  });

  const keywordScore =
    jobKeywords.size === 0
      ? 0
      : (keywordMatchCount / jobKeywords.size) * 100;

  // ----------------------
  // SKILL SCORE
  // ----------------------
  const skillScore =
    Object.keys(jobSkillsMap).length === 0
      ? 0
      : (matchedSkills.length / Object.keys(jobSkillsMap).length) * 100;

  // ----------------------
  // FINAL SCORE
  // ----------------------
  const matchScore = Math.round(
    keywordScore * 0.3 + skillScore * 0.7
  );

  // ----------------------
  // SUGGESTIONS
  // ----------------------
  const suggestions = [];

  if (matchScore >= 80) {
    suggestions.push("Excellent match!");
  } else if (matchScore >= 60) {
    suggestions.push("Good match. Fine-tune your resume.");
  } else if (matchScore >= 40) {
    suggestions.push("Moderate match. Improve skill alignment.");
  } else {
    suggestions.push("Low match. Needs optimization.");
  }

  if (missingSkills.length > 0) {
    suggestions.push(
      `Add relevant skills: ${missingSkills.slice(0, 5).join(", ")}`
    );
  }

  suggestions.push("Use exact job keywords for ATS optimization.");

  return {
    matchScore,
    matchedSkills,
    missingSkills,
    stats: {
      totalMatched: matchedSkills.length,
      totalRequired: Object.keys(jobSkillsMap).length,
      keywordOverlap: keywordMatchCount,
      totalKeywords: jobKeywords.size
    },
    suggestions
  };
};

module.exports = { analyzeMatch };