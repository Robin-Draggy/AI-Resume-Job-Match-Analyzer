import { parsePDF } from "../lib/pdfParser.js";
import { analyzeMatch } from "../services/match.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

export const analyzeResume = AsyncHandler(async (req, res) => {
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