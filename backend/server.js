import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import documentRoutes from "./routes/documentRoutes.js";
import annotationRoutes from "./routes/annotationRoutes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ To serve uploaded PDFs or files publicly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB 
mongoose
  .connect(MONGO_URI, {})
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection failed:", err));

//Routes
app.use("/api/documents", documentRoutes);
app.use("/api/annotations", annotationRoutes);

//Define routes
app.get("/", (req, res) => {
  res.send("PDF Annotation App Backend is running");
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
