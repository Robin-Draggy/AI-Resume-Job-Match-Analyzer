// services/ai.service.js

const groq = require("../config/groq");

// ----------------------
// CLEAN JSON (IMPORTANT)
// ----------------------
const cleanJSON = (text) => {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

// ----------------------
// SAFE PARSE
// ----------------------
const safeParseJSON = (text) => {
  try {
    return JSON.parse(cleanJSON(text));
  } catch (error) {
    return {
      improvements: ["AI response parsing failed"],
      skillSuggestions: [],
      bulletImprovements: []
    };
  }
};

// ----------------------
// MAIN AI FUNCTION
// ----------------------
const generateAISuggestions = async ({
  resumeText,
  jobText,
  analysis
}) => {
  try {
    const prompt = `
You are an expert resume reviewer and ATS optimization system.

Analyze:

RESUME:
${resumeText.slice(0, 1500)}

JOB DESCRIPTION:
${jobText.slice(0, 1500)}

MATCH DATA:
- Match Score: ${analysis.matchScore}
- Matched Skills: ${analysis.matchedSkills.join(", ")}
- Missing Skills: ${analysis.missingSkills.join(", ")}

Your tasks:

1. Give 3-5 SPECIFIC, actionable improvements tailored to THIS job
2. Suggest how to naturally incorporate missing skills into existing projects (not just "add skill")
3. Rewrite 1-2 resume bullet points to be stronger and more impact-focused

STRICT RULES:
- Do NOT invent metrics or fake achievements
- Do NOT suggest skills already clearly present
- Focus on REAL improvements, not generic advice
- Be concise and practical

Return ONLY valid JSON:
{
  "improvements": [],
  "skillSuggestions": [],
  "bulletImprovements": []
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: 0.5
    });

    const content =
      completion.choices?.[0]?.message?.content || "";

    return safeParseJSON(content);

  } catch (error) {
    console.error("AI SERVICE ERROR:", error.message);

    return {
      improvements: ["AI service temporarily unavailable"],
      skillSuggestions: [],
      bulletImprovements: []
    };
  }
};

module.exports = { generateAISuggestions };