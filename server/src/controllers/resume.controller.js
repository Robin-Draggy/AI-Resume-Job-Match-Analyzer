const { parsePDF } = require("../lib/pdfParser");
const { generateAISuggestions } = require("../services/ai.service");
const { analyzeMatch } = require("../services/match.service");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { AsyncHandler } = require("../utils/AsyncHandler");

const analyzeResume = AsyncHandler(async (req, res) => {
  const file = req.file;
  const { jobDescription } = req.body;

  if (!file || !jobDescription) {
    throw new ApiError(400, "Resume and Job Description are required");
  }

  const resumeText = await parsePDF(file.buffer);
  const result = await analyzeMatch(resumeText, jobDescription);

  const aiSuggestions = await generateAISuggestions({
    resumeText,
    jobText: jobDescription,
    analysis: result
  })

  return res.status(200).json(
    new ApiResponse(200, {
      ...result,
      aiSuggestions
    }, "Analyzed Resume Successfully")
  );
});

module.exports = { analyzeResume };