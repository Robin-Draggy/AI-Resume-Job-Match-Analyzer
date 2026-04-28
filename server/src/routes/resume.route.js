const { Router } = require("express");
const { upload } = require("../middlewares/upload.middleware");
const { analyzeResume, tailorResume, compareResume } = require("../controllers/resume.controller");

const router = Router();

router.route("/analyze").post(upload.single("resume"), analyzeResume)
router.route("/tailor").post(upload.single("resume"), tailorResume)
router.post("/compare", upload.single("resume"), compareResume);

module.exports = { router };