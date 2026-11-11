
import { Router } from "express";
import multer from "multer";
import { uploadCV } from "../controllers/cv.controller.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only PDF and DOCX files are allowed"));
    }

    cb(null, true);
  }
});

router.post("/upload", (req, res, next) => {
  upload.single("cv")(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message:
          error.code === "LIMIT_FILE_SIZE"
            ? "File exceeds the 5MB limit"
            : error.message
      });
    }

    next();
  });
}, uploadCV);

export default router;
