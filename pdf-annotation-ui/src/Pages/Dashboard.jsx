import { useState, useEffect } from "react";
import { uploadDocuments, fetchDocuments } from "../Api/Api.js";
import { Upload, FileText } from "lucide-react";
import PDFAnnotator from "../Components/PDFAnnotator.jsx";
import axios from "axios";

const Dashboard = ({ role }) => {
  const [documents, setDocuments] = useState([]);
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    const data = await fetchDocuments();
    setDocuments(data);
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!files.length) return alert("Please select at least one file");
    try {
      await uploadDocuments(files, role);
      alert("✅ Files uploaded successfully!");
      setFiles([]);
      loadDocs();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Only Admin (A1) can upload files");
    }
  };

  const handleSelectPDF = (doc) => {
    setSelectedFile({
      url: `https://pdf-annotation-app-izx1.onrender.com/${doc.filePath}`,
      id: doc._id,
      title: doc.title,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-linear-to-br from-blue-100 to-indigo-200 p-6 gap-6">
      {/* ✅ LEFT SECTION */}
      <div className="lg:w-1/3 w-full bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">Dashboard</h2>

        {/* Upload Section (Admin only) */}
        {role === "A1" && (
          <div className="mb-6 p-4 bg-white/30 backdrop-blur-md rounded-2xl shadow-md border border-white/40">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">
              Upload New PDFs
            </h3>

            <input
              id="fileUpload"
              type="file"
              multiple
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <button
              onClick={() => document.getElementById("fileUpload").click()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Upload size={16} /> Upload Files
            </button>

            {files.length > 0 && (
              <div className="mt-3 text-sm text-gray-700">
                <p className="font-medium">Selected Files:</p>
                <ul className="list-disc ml-5">
                  {files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
                <button
                  onClick={handleUpload}
                  className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
                >
                  Upload Now
                </button>
              </div>
            )}
          </div>
        )}

        {/* PDF List Section */}
        <div className="flex-1 overflow-y-auto">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">
            Uploaded Documents
          </h3>

          {documents.length > 0 ? (
            <ul className="space-y-3">
              {documents.map((doc) => (
                <li
                  key={doc._id}
                  onClick={() => handleSelectPDF(doc)}
                  className="p-4 bg-white/40 backdrop-blur-lg border border-white/50 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition flex justify-between items-center"
                >
                  <div>
                    <h4 className="text-blue-800 font-medium truncate w-48">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {new Date(doc.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <FileText size={20} className="text-blue-600" />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm mt-3">
              No documents uploaded yet.
            </p>
          )}
        </div>
      </div>

      {/* RIGHT PANEL (PDF Viewer & Annotator) */}
      <div className="flex-1 bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-lg p-4 flex items-center justify-center">
        {selectedFile ? (
          <PDFAnnotator
            fileUrl={selectedFile.url}
            pdfId={selectedFile.id}
            role={role} // highlights are per user
          />
        ) : (
          <div className="text-gray-500 text-center">
            Select a PDF to view & annotate
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
