import Annotation from "../models/Annotation.js";

export const AddAnnotation = async (req, res) => {
  try {
    const annotation = await Annotation.create(req.body);
    res.status(201).json(annotation);
  } catch (error) {
    res.status(500).json({ message: "Error adding annotation", error });
  }
};

export const GetAnnotations = async (req, res) => {
  try {
    const { documentId } = req.params;
    const annotations = await Annotation.find({ documentId });
    res.status(200).json(annotations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching annotations", error });
  }
};

export const DeleteAnnotation = async (req, res) => {
  try {
    const { annotationId } = req.params;
    const { user, role } = req.body; // userId and role sent from frontend

    // Find annotation first
    const annotation = await Annotation.findById(annotationId);
    if (!annotation) {
      return res.status(404).json({ message: "Annotation not found" });
    }

    // ✅ Only admin (A1) or owner can delete
    if (role !== "A1" && annotation.user !== user) {
      return res.status(403).json({
        message: "You are not authorized to delete this annotation",
      });
    }

    // Proceed to delete
    await Annotation.findByIdAndDelete(annotationId);
    res.status(200).json({ message: "Annotation deleted successfully" });
  } catch (error) {
    console.error("Error deleting annotation:", error);
    res.status(500).json({ message: "Error deleting annotation", error });
  }
};

