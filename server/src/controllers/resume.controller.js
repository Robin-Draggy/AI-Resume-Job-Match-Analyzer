const { parsePDF } = require("../lib/pdfParser");
const { generateAISuggestions, generateTailoredResume } = require("../services/ai.service");
const { analyzeMatch } = require("../services/match.service");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { AsyncHandler } = require("../utils/AsyncHandler");

const analyzeResume = AsyncHandler(async (req, res) => {
  const file = req.file;
  const { jobDescription } = req.body;

  console.log("FILE INFO:", {
    name: req.file?.originalname,
    size: req.file?.size,
    mimetype: req.file?.mimetype
  });

  if (!file || !jobDescription) {
    throw new ApiError(400, "Resume and Job Description are required");
  }

  const resumeText = await parsePDF(file.buffer);
  const result = await analyzeMatch(resumeText, jobDescription);

  const aiSuggestions = await generateAISuggestions({
    resumeText,
    jobText: jobDescription,
    matchedSkills: result.matchedSkills,
    missingSkills: result.missingSkills,
  });

  return res.status(200).json(
    new ApiResponse(200, {
      ...result,
      aiSuggestions
    }, "Analyzed Resume Successfully")
  );
});

const tailorResume = AsyncHandler(async (req, res) => {
  const file = req.file;
  const { jobDescription } = req.body;

  if (!file || !jobDescription) {
    throw new ApiError(400, "Resume PDF and Job Description are required");
  }

  const resumeText = await parsePDF(file.buffer);

  const analysis = await analyzeMatch(resumeText, jobDescription);

  const result = await generateTailoredResume({
    resumeText,
    jobText: jobDescription,
    matchedSkills: analysis.matchedSkills,
    missingSkills: analysis.missingSkills,
  });

  return res.status(200).json(
    new ApiResponse(200, result, "Tailored Resume Generated Successfully")
  );
});

const compareResume = AsyncHandler(async (req, res) => {
  const file = req.file;
  const { jobDescription } = req.body;

  if (!file || !jobDescription) {
    throw new ApiError(400, "Resume and Job Description are required");
  }

  const resumeText = await parsePDF(file.buffer);

  // 1️⃣ Analyze original
  const originalAnalysis = await analyzeMatch(resumeText, jobDescription);

  // 2️⃣ Tailor resume
  const tailored = await generateTailoredResume({
    resumeText,
    jobText: jobDescription,
    matchedSkills: originalAnalysis.matchedSkills,
    missingSkills: originalAnalysis.missingSkills,
  });

  // Convert tailored JSON → text (important for re-analysis)
  const tailoredText = `
${tailored.summary}

${tailored.experience
  .map(e => `${e.title} ${e.company} ${e.dates}\n${e.achievements.join("\n")}`)
  .join("\n")}

${tailored.skills.join(", ")}
`;

  // 3️⃣ Re-analyze tailored
  const improvedAnalysis = await analyzeMatch(tailoredText, jobDescription);

  return res.status(200).json(
    new ApiResponse(200, {
      original: originalAnalysis,
      tailored: {
        resume: tailored,
        analysis: improvedAnalysis
      },
      improvement: {
        scoreIncrease:
          improvedAnalysis.matchScore - originalAnalysis.matchScore,
        newlyMatchedSkills: improvedAnalysis.matchedSkills.filter(
          s => !originalAnalysis.matchedSkills.includes(s)
        )
      }
    }, "Comparison generated successfully")
  );
});

module.exports = { analyzeResume, tailorResume, compareResume };