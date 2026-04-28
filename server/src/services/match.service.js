// match.service.js (CommonJS - Production Ready)

const { getWeight } = require("../config/skillWeights");
const { normalizeSkill } = require("../utils/skillMap");

// ----------------------
// STOPWORDS
// ----------------------
const STOPWORDS = new Set([
  "the",
  "is",
  "are",
  "a",
  "an",
  "and",
  "or",
  "we",
  "you",
  "they",
  "to",
  "of",
  "in",
  "for",
  "on",
  "with",
  "as",
  "by",
  "at",
  "from",
  "this",
  "that",
  "it",
  "be",
  "was",
  "were",
  "will",
  "can",
  "has",
  "have",
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
  "next.js": ["nextjs", "next.js"],
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
  const resumeSkills = extractSkills(resumeText);
  const jobSkills = extractSkills(jobText);

  const resumeSkillList = Object.keys(resumeSkills);
  const jobSkillList = Object.keys(jobSkills);

  const normalizedResume = resumeSkillList.map(normalizeSkill);
  const normalizedJob = jobSkillList.map(normalizeSkill);

  const matchedSkills = [...new Set(
  normalizedJob.filter(skill => normalizedResume.includes(skill))
)];

const missingSkills = [...new Set(
  normalizedJob.filter(skill => !normalizedResume.includes(skill))
)];

  // 👉 weighted scoring
  let totalWeight = 0;
  let matchedWeight = 0;

  normalizedJob.forEach((skill) => {
    const weight = getWeight(skill);
    totalWeight += weight;

    if (normalizedResume.includes(skill)) {
      matchedWeight += weight;
    }
  });

  const matchScore = totalWeight === 0 
    ? 0 
    : Math.round((matchedWeight / totalWeight) * 100);

  return {
    matchScore,
    matchedSkills,
    missingSkills,
    stats: {
      totalMatched: matchedSkills.length,
      totalRequired: normalizedJob.length,
      weightedMatched: matchedWeight,
      weightedTotal: totalWeight,
    },
  };
};

module.exports = { analyzeMatch };
