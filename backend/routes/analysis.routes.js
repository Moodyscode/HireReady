
import { Router } from "express";
import multer from "multer";
import { analyzeUploadedCV } from "../controllers/analysis.controller.js";

const router = Router();

const allowedTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter(req, file, cb) {
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only PDF and DOCX files are allowed."));
    }

    cb(null, true);
  }
});

router.post("/", (req, res, next) => {
  upload.single("cv")(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message:
          error.code === "LIMIT_FILE_SIZE"
            ? "CV must be smaller than 5MB."
            : error.message
      });
    }

    next();
  });
}, analyzeUploadedCV);

export default router;
