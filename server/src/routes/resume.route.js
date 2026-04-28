const { Router } = require("express");
const { upload } = require("../middlewares/upload.middleware");
const { analyzeResume, tailorResume } = require("../controllers/resume.controller");

const router = Router();

router.route("/analyze").post(upload.single("resume"), analyzeResume)
router.route("/tailor").post(upload.single("resume"), tailorResume)

module.exports = { router };