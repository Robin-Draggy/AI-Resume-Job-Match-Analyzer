const groq = require("../config/groq");

// ----------------------
// TEXT NORMALIZATION
// ----------------------
const normalize = (arr = []) =>
  arr.map(s => s.toLowerCase().trim());

// ----------------------
// AI-BASED EXTRACTION
// ----------------------
const extractEntitiesAI = async (text) => {
  try {
    const prompt = `
Extract important professional keywords from this text.

TEXT:
${text.slice(0, 2000)}

Return JSON:
{
  "skills": [],
  "tools": [],
  "keywords": []
}

Rules:
- Skills = abilities (e.g., surgery, data analysis, leadership)
- Tools = software/technologies (e.g., Python, SPSS, MRI)
- Keywords = domain terms (e.g., oncology, fintech, education)
- Keep them short (1-3 words max)
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "Return ONLY JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.3,
    });

    const raw = completion.choices?.[0]?.message?.content || "";

    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return {
      skills: normalize(parsed.skills || []),
      tools: normalize(parsed.tools || []),
      keywords: normalize(parsed.keywords || [])
    };

  } catch (err) {
    console.error("AI extraction failed:", err.message);
    return { skills: [], tools: [], keywords: [] };
  }
};

// ----------------------
// MATCH ENGINE
// ----------------------
const analyzeMatch = async (resumeText, jobText) => {
  const resumeData = await extractEntitiesAI(resumeText);
  const jobData = await extractEntitiesAI(jobText);

  const resumeSet = new Set([
    ...resumeData.skills,
    ...resumeData.tools,
    ...resumeData.keywords
  ]);

  const jobSet = new Set([
    ...jobData.skills,
    ...jobData.tools,
    ...jobData.keywords
  ]);

  const matched = [...jobSet].filter(x => resumeSet.has(x));
  const missing = [...jobSet].filter(x => !resumeSet.has(x));

  const matchScore = jobSet.size === 0
    ? 0
    : Math.round((matched.length / jobSet.size) * 100);

  return {
    matchScore,
    matchedSkills: matched,
    missingSkills: missing,
    stats: {
      totalMatched: matched.length,
      totalRequired: jobSet.size
    }
  };
};

module.exports = { analyzeMatch };