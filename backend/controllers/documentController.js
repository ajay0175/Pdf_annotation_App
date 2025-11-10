import Document from "../models/Document.js";

export const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: "Error fetching documents", error });
  }
};
