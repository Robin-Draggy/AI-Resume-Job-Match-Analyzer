import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { analyzeResume } from "../controllers/resume.controller.js";

export const router = Router();

router.route("/analyze").post(upload.single("resume"), analyzeResume)