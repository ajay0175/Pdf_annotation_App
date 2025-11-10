import { useEffect } from "react";
import { fetchDocuments } from "../Api/Api.js";

export default function TestAPI() {
  useEffect(() => {
    (async () => {
      try {
        const docs = await fetchDocuments();
        console.log("📂 Documents:", docs);
      } catch (err) {
        console.error("❌ API error:", err);
      }
    })();
  }, []);

  return <div className="p-6 text-blue-700">Testing backend connection...</div>;
}
