const { Router } = require("express");
const { upload } = require("../middlewares/upload.middleware");
const { analyzeResume } = require("../controllers/resume.controller");

const router = Router();

router.route("/analyze").post(upload.single("resume"), analyzeResume);

module.exports = { router };