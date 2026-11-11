
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

export async function extractCVText(file) {
  if (!file || !file.buffer) {
    throw new Error("No CV file provided");
  }

  const isPDF = file.mimetype === "application/pdf";
  const isDOCX =
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

  let text = "";

  if (isPDF) {
    const parser = new PDFParse({ data: file.buffer });

    try {
      const result = await parser.getText();
      text = result.text || "";
    } finally {
      await parser.destroy();
    }
  } else if (isDOCX) {
    const result = await mammoth.extractRawText({
      buffer: file.buffer
    });

    text = result.value || "";
  } else {
    throw new Error("Unsupported file type");
  }

  return text.trim();
}
