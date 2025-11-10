import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

//  DOCUMENT APIs

// Fetch all PDFs
export const fetchDocuments = async () => {
  const res = await API.get("/documents");
  return res.data;
};

// Upload PDFs (Admin only)
export const uploadDocuments = async (files, uploader) => {
  const formData = new FormData();
  for (const file of files) {
    formData.append("files", file);
  }
  formData.append("uploader", uploader);
  const res = await API.post("/documents/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

//  ANNOTATION APIs (later) 
export const fetchAnnotations = async (docId) => {
  const res = await API.get(`/annotations/${docId}`);
  return res.data;
};

export const addAnnotation = async (data) => {
  const res = await API.post(`/annotations`, data);
  return res.data;
};
