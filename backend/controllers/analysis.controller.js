
import { extractCVText } from "../services/cv.service.js";
import { analyzeCV } from "../services/analysis.service.js";

export async function analyzeUploadedCV(req, res) {
  try {
    const jobDescription = req.body.jobDescription;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a CV."
      });
    }

    if (
      typeof jobDescription !== "string" ||
      !jobDescription.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a job description."
      });
    }

    const cvText = await extractCVText(req.file);

    if (!cvText) {
      return res.status(422).json({
        success: false,
        message: "No readable text found in the CV."
      });
    }

    const analysis = analyzeCV(cvText, jobDescription);

    return res.status(200).json({
      success: true,
      message: "CV analysis completed successfully.",
      filename: req.file.originalname,
      ...analysis
    });
  } catch (error) {
    console.error("CV analysis error:", error);

    return res.status(422).json({
      success: false,
      message: "Unable to analyze the uploaded CV."
    });
  }
}
