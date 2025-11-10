import { Document, Page, pdfjs } from "react-pdf";
import { useState, useRef, useEffect } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFViewer = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);
  const [highlights, setHighlights] = useState([]); // {pageNumber, x, y, width, height}
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState(null);
  const containerRef = useRef(null);

  // 🧹 Reset highlights when new PDF is loaded
  useEffect(() => {
    setHighlights([]);
  }, [fileUrl]);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setError(null);
  };

  const onLoadError = (err) => {
    console.error("PDF load error:", err);
    setError("Failed to load PDF file.");
  };

  // 🟡 Check if two boxes overlap
  const isOverlapping = (box1, box2) => {
    return !(
      box2.x > box1.x + box1.width ||
      box2.x + box2.width < box1.x ||
      box2.y > box1.y + box1.height ||
      box2.y + box2.height < box1.y
    );
  };

  // 🟡 Handle mouse events for highlighting
  const handleMouseDown = (e) => {
    if (!containerRef.current) return;
    setIsSelecting(true);

    const rect = containerRef.current.getBoundingClientRect();
    setStartPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseUp = (e) => {
    if (!isSelecting || !startPos) return;

    setIsSelecting(false);
    const rect = containerRef.current.getBoundingClientRect();
    const endX = e.clientX - rect.left;
    const endY = e.clientY - rect.top;

    const x = Math.min(startPos.x, endX);
    const y = Math.min(startPos.y, endY);
    const width = Math.abs(endX - startPos.x);
    const height = Math.abs(endY - startPos.y);

    if (width < 5 || height < 5) return; // ignore small drags

    const newBox = { pageNumber: 1, x, y, width, height };

    // 🚫 Prevent overlapping highlights
    const overlap = highlights.some(
      (h) => h.pageNumber === newBox.pageNumber && isOverlapping(h, newBox)
    );
    if (overlap) return;

    setHighlights((prev) => [...prev, newBox]);
  };

  return (
    <div
      ref={containerRef}
      className="relative p-4 bg-white/30 backdrop-blur-lg rounded-2xl border border-white/40 shadow-md w-full h-[90vh] overflow-auto"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <Document
          file={fileUrl}
          onLoadSuccess={onLoadSuccess}
          onLoadError={onLoadError}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <div key={index} className="relative">
              <Page pageNumber={index + 1} />
              {highlights
                .filter((h) => h.pageNumber === index + 1)
                .map((h, i) => (
                  <div
                    key={i}
                    className="absolute bg-yellow-300/30 bg-opacity-60 border border-yellow-500 rounded-sm pointer-events-none"
                    style={{
                      top: `${h.y}px`,
                      left: `${h.x}px`,
                      width: `${h.width}px`,
                      height: `${h.height}px`,
                    }}
                  />
                ))}
            </div>
          ))}
        </Document>
      )}
    </div>
  );
};

export default PDFViewer;
