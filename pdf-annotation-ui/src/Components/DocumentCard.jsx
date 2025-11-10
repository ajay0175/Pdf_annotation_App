const DocumentCard = ({ title, uploader, date }) => {
  return (
    <div className="p-4 bg-white/30 backdrop-blur-md rounded-2xl shadow-md border border-white/40 transition hover:scale-[1.02]">
      <h3 className="font-semibold text-blue-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600">Uploaded by: {uploader}</p>
      <p className="text-xs text-gray-500 mt-1">{date}</p>
    </div>
  );
};

export default DocumentCard;
