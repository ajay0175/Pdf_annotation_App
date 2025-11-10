import express from "express";
import {
  AddAnnotation,
  GetAnnotations,
  DeleteAnnotation,
} from "../controllers/annotationController.js";

const router = express.Router();

//add annotation
router.post("/add", AddAnnotation);

//get all annotations for a document
router.get("/:documentId", GetAnnotations);

//delete annotation
router.delete("/:annotationId", DeleteAnnotation);


export default router;
