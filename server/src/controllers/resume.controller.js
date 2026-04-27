const { parsePDF } = require("../lib/pdfParser");
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

  return res.status(200).json(
    new ApiResponse(200, result, "Analyzed Resume Successfully")
  );
});

module.exports = { analyzeResume };