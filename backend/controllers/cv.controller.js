
import { extractCVText } from "../services/cv.service.js";

export async function uploadCV(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a CV"
      });
    }

    const text = await extractCVText(req.file);

    if (!text) {
      return res.status(422).json({
        success: false,
        message: "No readable text found in the CV"
      });
    }

    return res.status(200).json({
      success: true,
      message: "CV processed successfully",
      filename: req.file.originalname,
      characters: text.length,
      text
    });
  } catch (error) {
    console.error("CV processing error:", error);

    return res.status(422).json({
      success: false,
      message: "Unable to extract text from the CV"
    });
  }
}
