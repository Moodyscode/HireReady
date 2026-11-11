
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cvRoutes from "./routes/cv.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

// Welcome endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to HireReady API"
  });
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    application: "HireReady",
    timestamp: new Date().toISOString()
  });
});

// CV upload endpoint
app.use("/api/cv", cvRoutes);

// CV analysis endpoint
app.use("/api/analyze", analysisRoutes);

// Handle unknown endpoints
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`HireReady API running on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});
