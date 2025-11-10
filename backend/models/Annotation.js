import mongoose from "mongoose";

const annotationSchema = new mongoose.Schema(
  {
    documentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["highlight", "comment", "drawing"],
      default: "comment",
    },
    content: {
      type: String,
      required: true,
    },
    position: [
      {
        x: Number,
        y: Number,
        width: Number,
        height: Number,
        page: Number,
      },
    ],
    visibility: {
      type: [String], // e.g. ["A1", "D1", "D2"]
      default: ["A1", "D1", "D2", "R1"],
    },
  },
  { timestamps: true }
);

const Annotation = mongoose.model("Annotation", annotationSchema);

export default Annotation;
