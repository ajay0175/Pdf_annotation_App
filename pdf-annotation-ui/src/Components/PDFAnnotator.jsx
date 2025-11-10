import React, { useState, useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { highlightPlugin } from "@react-pdf-viewer/highlight";
import axios from "axios";
import { fetchAnnotations, addAnnotation } from "../Api/Api.js";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/highlight/lib/styles/index.css";

const PDFAnnotator = ({ fileUrl, pdfId, role }) => {
  const [annotations, setAnnotations] = useState([]);

  // Load annotations from backend
  useEffect(() => {
    loadAnnotation();
  }, [pdfId, role]);

  const loadAnnotation = async () => {
    try {
      const res = await fetchAnnotations(pdfId);
      const visibleAnnotations = res.filter((ann) =>
        ann.visibility.includes(role)
      );
      setAnnotations(visibleAnnotations);
    } catch (err) {
      console.error("Error fetching annotations:", err);
    }
  };

  // useEffect(() => {
  //   const fetchAnnotations = async () => {
  //     try {
  //       // const res = await .get(
  //       //   `http://localhost:5000/api/annotations/${pdfId}`
  //       // );
  //       const res = await fetchAnnotations(pdfId);
  //       const visibleAnnotations = res.data.filter((ann) =>
  //         ann.visibility.includes(role)
  //       );
  //       setAnnotations(visibleAnnotations);
  //     } catch (err) {
  //       console.error("Error fetching annotations:", err);
  //     }
  //   };

  //   fetchAnnotations();
  // }, [pdfId, role]);

  // Save annotation to backend

  const saveAnnotationHandle = async (newAnnotation) => {
    try {
      // const res = await axios.post(
      //   "http://localhost:5000/api/annotations/add",
      //   newAnnotation
      // );
      const res = await addAnnotation(newAnnotation);
      console.log("Saved annotation:", res);
      await loadAnnotation(); // refetch from backend
    } catch (err) {
      console.error("Error saving annotation:", err);
    }
  };

  // Delete annotation (only admin can do this)
  const deleteAnnotation = async (annotationId) => {
    try {
      await axios.delete(
        `https://pdf-annotation-app-izx1.onrender.com/api/annotations/${annotationId}`,
        {
          data: { user: role, role },
        }
      );
      setAnnotations((prev) => prev.filter((ann) => ann._id !== annotationId));
    } catch (err) {
      console.error("Error deleting annotation:", err);
    }
  };

  const highlightPluginInstance = highlightPlugin({
    renderHighlightTarget: ({
      selectionRegion,
      selectedText,
      highlightAreas,
      cancel,
    }) => {
      // Disable highlight for R1 users
      if (role === "R1") return null;

      return (
        <div
          className="absolute z-50"
          style={{
            left: `${selectionRegion.left}%`,
            top: `${selectionRegion.top + selectionRegion.height}%`,
            transform: "translateY(4px)",
          }}
        >
          <input
            type="text"
            placeholder="Add comment..."
            className="border border-gray-400 rounded px-2 py-1 text-sm bg-white text-black focus:outline-none focus:ring-1 focus:ring-blue-600"
            autoFocus
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                const comment = e.target.value.trim();
                if (comment) {
                  const newAnnotation = {
                    documentId: pdfId,
                    user: role,
                    type: "comment",
                    content: comment,
                    position: highlightAreas.map((area) => ({
                      x: area.left,
                      y: area.top,
                      width: area.width,
                      height: area.height,
                      page: area.pageIndex,
                    })),
                    visibility: ["A1", "D1", "D2", "R1"],
                  };
                  await saveAnnotationHandle(newAnnotation);
                }
                cancel();
              }
            }}
            onBlur={cancel}
          />
        </div>
      );
    },

    renderHighlights: ({ getCssProperties, pageIndex, rotation }) => (
      <div>
        {annotations
          ?.filter((ann) =>
            ann?.position?.some((pos) => pos?.page === pageIndex)
          )
          ?.map((ann, i) =>
            ann.position
              ?.filter((pos) => pos?.page === pageIndex)
              ?.map((pos, j) => (
                <div
                  key={`${i}-${j}`}
                  className="absolute group"
                  style={{
                    ...getCssProperties(
                      {
                        top: pos.y,
                        left: pos.x,
                        width: pos.width,
                        height: pos.height,
                      },
                      rotation
                    ),
                    backgroundColor: "rgba(255,235,59,0.5)",
                    borderRadius: "2px",
                    transition: "background-color 0.2s ease",
                  }}
                  title={ann.content}
                >
                  {/* Hover Tooltip */}
                  <div
                    className="absolute z-30 -top-14 left-1/4 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none 
                 bg-gray-800 text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap transition-opacity"
                  >
                    <span className="font-semibold">Created by {ann.user}</span>
                    <br />
                    <p>
                      {ann?.createdAt
                        ? new Date(ann.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "Unknown date"}
                    </p>
                  </div>

                  {/* Delete button */}
                  {(role === "A1" || ann.user === role) && (
                    <button
                      onClick={() => deleteAnnotation(ann._id)}
                      className="absolute -top-3 -right-3 w-6 h-6 text-xs text-white bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity z-20"
                      title="Delete Annotation"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))
          )}
      </div>
    ),
  });

  return (
    <div className="w-full h-full relative">
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
        <Viewer fileUrl={fileUrl} plugins={[highlightPluginInstance]} />
      </Worker>
    </div>
  );
};

export default PDFAnnotator;
