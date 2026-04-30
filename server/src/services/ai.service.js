const groq = require("../config/groq");

// ----------------------
// SIMPLE JSON EXTRACTOR
// ----------------------
const extractJSON = (text) => {
  if (!text) return null;

  try {
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch {
    return null;
  }
};

// ----------------------
// VALIDATORS
// ----------------------
const validateAISuggestions = (data) => {
  return (
    data &&
    Array.isArray(data.improvements) &&
    Array.isArray(data.skillSuggestions) &&
    Array.isArray(data.bulletImprovements)
  );
};

const validateTailoredResume = (data) => {
  return (
    data &&
    typeof data.summary === "string" &&
    Array.isArray(data.experience) &&
    Array.isArray(data.skills)
  );
};

// ----------------------
// SAFE PARSERS
// ----------------------
const safeParseAISuggestions = (text, fallback) => {
  const parsed = extractJSON(text);
  if (!validateAISuggestions(parsed)) {
    console.warn("Invalid AI Suggestions JSON");
    return fallback;
  }
  return parsed;
};

const safeParseTailoredResume = (text, fallback) => {
  const parsed = extractJSON(text);
  if (!validateTailoredResume(parsed)) {
    console.warn("Invalid Tailored Resume JSON");
    return fallback;
  }
  return parsed;
};

// ----------------------
// AI SUGGESTIONS
// ----------------------
const generateAISuggestions = async ({
  resumeText,
  jobText,
  matchedSkills,
  missingSkills
}) => {
  try {
    const prompt = `
You are an expert resume optimizer for ALL professions (tech, medical, research, business, etc).

RESUME:
${resumeText.slice(0, 1500)}

JOB DESCRIPTION:
${jobText.slice(0, 1500)}

MATCH CONTEXT:
Matched: ${matchedSkills.join(", ")}
Missing: ${missingSkills.join(", ")}

TASKS:
1. Suggest 3-5 improvements to better align with the job
2. Show how missing skills/keywords can be integrated into EXISTING experience
3. Rewrite 2 bullet points with stronger impact

RULES:
- Do NOT invent fake experience
- Adapt to ANY profession
- Keep language natural and realistic
- No generic advice like "improve formatting"

RETURN JSON:
{
  "improvements": [],
  "skillSuggestions": [],
  "bulletImprovements": []
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "Return ONLY valid JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.4,
    });

    const content = completion.choices?.[0]?.message?.content || "";

    return safeParseAISuggestions(content, {
      improvements: ["Improve alignment with job description"],
      skillSuggestions: [],
      bulletImprovements: [],
    });

  } catch (err) {
    console.error(err);
    return {
      improvements: ["AI unavailable"],
      skillSuggestions: [],
      bulletImprovements: [],
    };
  }
};

// ----------------------
// TAILORED RESUME
// ----------------------
const generateTailoredResume = async ({
  resumeText,
  jobText,
  matchedSkills,
  missingSkills
}) => {
  try {
    const prompt = `
You are a professional resume writer for ALL industries.

RESUME:
${resumeText.slice(0, 2000)}

JOB DESCRIPTION:
${jobText.slice(0, 2000)}

CONTEXT:
Matched: ${matchedSkills.join(", ")}
Missing: ${missingSkills.join(", ")}

GOAL:
Rewrite the resume to better match the job.

RULES:
- Do NOT invent experience
- Adapt language to the profession automatically
- Improve clarity, impact, and keyword relevance
- Integrate missing skills ONLY if realistically implied
- Preserve strong existing skills

OUTPUT JSON:
{
  "summary": "",
  "experience": [
    {
      "title": "",
      "company": "",
      "dates": "",
      "achievements": []
    }
  ],
  "skills": []
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "Return ONLY valid JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.4,
    });

    const content = completion.choices?.[0]?.message?.content || "";

    return {
      success: true,
      ...safeParseTailoredResume(content, {
        summary: "Failed to generate",
        experience: [],
        skills: []
      })
    };

  } catch (err) {
    console.error(err);
    return {
      success: false,
      summary: "",
      experience: [],
      skills: []
    };
  }
};

module.exports = { generateAISuggestions, generateTailoredResume };