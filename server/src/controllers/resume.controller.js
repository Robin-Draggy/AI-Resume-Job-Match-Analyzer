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
    analysis: result
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

  console.log("FILE INFO:", {
    name: req.file?.originalname,
    size: req.file?.size,
    mimetype: req.file?.mimetype
  });

  if (!file || !jobDescription) {
    throw new ApiError(400, "Resume PDF and Job Description are required");
  }

  // Extract text from the uploaded PDF
  const resumeText = await parsePDF(file.buffer);
  
  if (!resumeText || resumeText.length < 50) {
    throw new ApiError(400, "Could not extract sufficient text from resume PDF");
  }

  const result = await generateTailoredResume({
    resumeText,
    jobText: jobDescription
  });

  return res.status(200).json(
    new ApiResponse(200, result, "Tailored Resume Generated Successfully")
  );
});

module.exports = { analyzeResume, tailorResume };