import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    uploader: { type: String, required: true },
    filePath: { type: String, required: true },
  },
  { timestamps: true }  
);
export default mongoose.model("Document", DocumentSchema);
