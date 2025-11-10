import express from "express";
import multer from "multer";
import fs from "fs";
import Document from "../models/Document.js";
import { getDocuments } from "../controllers/documentController.js";

const router = express.Router();

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// ✅ Admin upload route
router.post("/upload", upload.array("files"), async (req, res) => {
  try {
    const { uploader } = req.body;

    if (uploader !== "A1") {
      return res.status(403).json({ message: "❌ Only Admin A1 can upload files" });
    }

    const filesData = req.files.map((file) => ({
      title: file.originalname,
      uploader,
      filePath: file.path,
    }));

    await Document.insertMany(filesData);
    res.status(201).json({ message: "✅ Files uploaded successfully", filesData });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ message: "❌ Server error during upload" });
  }
});

//Get all documents
router.get("/", getDocuments);

export default router;
