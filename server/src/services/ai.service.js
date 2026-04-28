// services/ai.service.js

const groq = require("../config/groq");

// ----------------------
// ADVANCED JSON EXTRACTOR
// ----------------------
const extractJSON = (text) => {
  if (!text || typeof text !== 'string') return null;
  
  try {
    // Remove markdown code blocks
    let cleaned = text
      .replace(/```json\s*/g, "")
      .replace(/```\s*/g, "")
      .replace(/`/g, "")
      .trim();

    // Try direct parse first
    return JSON.parse(cleaned);
  } catch (error) {
    // Continue to next method
  }

  try {
    // Extract JSON block using regex
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      let cleanedJson = jsonMatch[0]
        .replace(/```json\s*/g, "")
        .replace(/```\s*/g, "")
        .trim();
      return JSON.parse(cleanedJson);
    }
  } catch (error) {
    // Continue to next method
  }

  // Try balanced brace extraction
  try {
    let braceCount = 0;
    let start = -1;
    let end = -1;
    
    for (let i = 0; i < text.length; i++) {
      if (text[i] === '{') {
        if (braceCount === 0) start = i;
        braceCount++;
      } else if (text[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          end = i;
          break;
        }
      }
    }
    
    if (start !== -1 && end !== -1) {
      const jsonStr = text.substring(start, end + 1);
      return JSON.parse(jsonStr);
    }
  } catch (error) {
    // Failed all methods
  }

  return null;
};

// ----------------------
// SAFE PARSE WITH FALLBACK
// ----------------------
const safeParseJSON = (text, customFallback = null) => {
  const parsed = extractJSON(text);
  
  if (!parsed) {
    console.warn("Failed to parse JSON from LLM response");
    console.log("Raw response preview:", text?.substring(0, 200));
    
    return customFallback || {
      improvements: ["AI response parsing failed. Please try again."],
      skillSuggestions: [],
      bulletImprovements: [],
    };
  }
  
  return parsed;
};

// ----------------------
// GENERATE AI SUGGESTIONS
// ----------------------
const generateAISuggestions = async ({ resumeText, jobText, analysis }) => {
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
- Return ONLY valid JSON (no markdown, no backticks, no explanations)

Return JSON EXACTLY in this format:
{
  "improvements": ["improvement 1", "improvement 2", "improvement 3"],
  "skillSuggestions": ["suggestion 1", "suggestion 2"],
  "bulletImprovements": ["original bullet -> improved bullet", "original bullet 2 -> improved bullet 2"]
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { 
          role: "system", 
          content: "You are a JSON API. Return ONLY valid JSON objects. No markdown, no backticks, no explanations." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.5,
    });

    const content = completion.choices?.[0]?.message?.content || "";

    const fallback = {
      improvements: ["Add more specific achievements to your experience section"],
      skillSuggestions: ["Highlight your technical skills more prominently"],
      bulletImprovements: [],
    };

    return safeParseJSON(content, fallback);
  } catch (error) {
    console.error("AI SERVICE ERROR:", error.message);

    return {
      improvements: ["AI service temporarily unavailable. Please try again later."],
      skillSuggestions: [],
      bulletImprovements: [],
    };
  }
};

// ----------------------
// GENERATE TAILORED RESUME
// ----------------------
const generateTailoredResume = async ({ resumeText, jobText }) => {
  // Validate inputs
  if (!resumeText || !jobText) {
    console.error("Missing required parameters:", { 
      hasResumeText: !!resumeText, 
      hasJobText: !!jobText 
    });
    throw new Error("Resume text and job description are required");
  }

  const resumeString = typeof resumeText === 'string' ? resumeText : String(resumeText || "");
  const jobString = typeof jobText === 'string' ? jobText : String(jobText || "");

  if (resumeString.length === 0) {
    throw new Error("Resume text is empty");
  }

  const prompt = `
You are a senior resume writer optimizing for ATS and recruiter screening.

Rewrite the resume to match the job description.

RESUME:
${resumeText.slice(0, 2000)}

JOB DESCRIPTION:
${jobText.slice(0, 2000)}

STRICT RULES:
- DO NOT invent experience
- ONLY include skills that are clearly present or strongly implied in the resume
- DO NOT add technologies the candidate has never used
- Avoid generic statements like "worked in a team"
- Make every bullet specific and technical
- Prioritize job-relevant keywords
- Make the summary explicitly reflect the target role (Frontend Engineer - React/TypeScript)
- If a job keyword is not present in the resume, do NOT add it to skills, but you MAY reflect related concepts in experience wording
- Prefer precise phrasing over broad terms (e.g., "state management patterns" instead of naming a library not used)

GOALS:
1. Make the summary sharp and role-specific
2. Make experience bullets technical and impact-focused
3. Align skills with job requirements WITHOUT overclaiming

OUTPUT JSON ONLY:
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
  try {
    console.log("📝 Sending request to Groq for resume tailoring...");

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { 
          role: "system", 
          content: "You are a JSON API. Return ONLY valid JSON objects. No markdown, no backticks, no explanations." 
        },
        { role: "user", content: prompt }
      ],
      temperature: 0.5,
    });

    const content = completion.choices?.[0]?.message?.content || "";

    if (!content) {
      throw new Error("No response content from Groq");
    }

    console.log("✅ Received response from Groq (length:", content.length, "chars)");

    const fallback = {
      summary: "Unable to generate tailored resume. Please try again.",
      experience: [],
      skills: []
    };

    const parsed = safeParseJSON(content, fallback);
    
    return {
      success: true,
      ...parsed
    };
    
  } catch (error) {
    console.error("❌ Groq API error:", error.message);
    
    return {
      success: false,
      summary: "Unable to tailor resume at this time. Please try again later.",
      experience: [],
      skills: [],
      error: error.message
    };
  }
};

module.exports = { generateAISuggestions, generateTailoredResume };