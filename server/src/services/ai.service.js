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
const generateAISuggestions = async ({ resumeText, jobText, matchedSkills, missingSkills }) => {
  try {
    const prompt = `
You are an expert resume reviewer and ATS optimization system.

RESUME:
${resumeText.slice(0, 1500)}

JOB DESCRIPTION:
${jobText.slice(0, 1500)}

MATCH CONTEXT:
- Matched Skills: ${matchedSkills.join(", ")}
- Missing Skills: ${missingSkills.join(", ")}

TASKS:
1. Give 3-5 actionable resume improvements
2. Show how missing skills can be integrated into EXISTING bullets
3. Rewrite 1-2 bullets with stronger impact

IMPORTANT:
- Only improve resume content
- No external advice
- No fake metrics

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
      temperature: 0.5,
    });

    const content = completion.choices?.[0]?.message?.content || "";

    return safeParseAISuggestions(content, {
      improvements: ["Improve bullet clarity"],
      skillSuggestions: [],
      bulletImprovements: [],
    });

  } catch (error) {
    console.error("AI Suggestions Error:", error.message);

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
const generateTailoredResume = async ({ resumeText, jobText, matchedSkills = [], missingSkills = [] }) => {
  try {
    const prompt = `
You are a senior resume writer optimizing for ATS.

RESUME:
${resumeText.slice(0, 2000)}

JOB DESCRIPTION:
${jobText.slice(0, 2000)}

MATCH CONTEXT USAGE:
- You MUST preserve all matched skills: ${matchedSkills.join(", ")}
- You MUST try to naturally incorporate missing skills where realistic: ${missingSkills.join(", ")}

RULES:
- Do NOT invent experience
- Use only real or strongly implied skills
- Improve wording for ATS keywords
- Keep it realistic

OPTIMIZATION GOAL:
- The rewritten resume MUST NOT reduce alignment with the job description
- Preserve ALL strong matched skills (e.g., React, Redux, Tailwind)
- Do NOT remove or weaken existing relevant technologies
- Strengthen presence of matched skills in experience and summary

PRIORITY ORDER:
1. Preserve matched skills
2. Improve keyword coverage
3. Improve clarity and impact

IMPORTANT:
- Ensure important skills (React, Redux, Tailwind, etc.) appear in BOTH:
  - skills section
  - experience bullet points



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
      temperature: 0.5,
    });

    const content = completion.choices?.[0]?.message?.content || "";

    return {
      success: true,
      ...safeParseTailoredResume(content, {
        summary: "Unable to generate tailored resume",
        experience: [],
        skills: []
      })
    };

  } catch (error) {
    console.error("Tailor Error:", error.message);

    return {
      success: false,
      summary: "Failed to generate resume",
      experience: [],
      skills: [],
    };
  }
};

module.exports = { generateAISuggestions, generateTailoredResume };