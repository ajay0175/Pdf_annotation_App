import { Upload, FileText, Settings, Users, Edit3, Eye } from "lucide-react"

const Sidebar = ({ role, setRole }) => {
  const roles = [
    { code: "A1", label: "Admin (A1)" },
    { code: "D1", label: "Default User 1 (D1)" },
    { code: "D2", label: "Default User 2 (D2)" },
    { code: "R1", label: "Read-only User (R1)" },
  ];
  return (
    <div className="w-64 h-screen p-5 bg-white/20 backdrop-blur-lg border-r border-white/30 flex flex-col justify-between shadow-lg">
      <div>
        <h1 className="">📄 PDF Annotator</h1>

        <div className="my-6">
          <label className="text-gray-700 text-md mb-2 block">
            Select Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full bg-white/30 backdrop-blur-sm p-2 rounded-lg border border-white/40 text-sm focus:outline-none text-gray-700"
          >
            {roles.map((r) => (
              <option key={r.code} value={r.code}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {/* <ul className="space-y-3">
          {role === "A1" && (
            <>
              {/* <li className="flex items-center gap-3 text-blue-700 cursor-pointer hover:text-blue-900 transition">
                <Upload size={18} /> Upload Files
              </li> 
              <li className="flex items-center gap-3 text-blue-700 cursor-pointer hover:text-blue-900 transition">
                <Users size={18} /> Manage Users
              </li>
            </>
          )}

          {(role === "D1" || role === "D2") && (
            <li className="flex items-center gap-3 text-blue-700 cursor-pointer hover:text-blue-900 transition">
              <Edit3 size={18} /> Annotate PDFs
            </li>
          )}

          <li className="flex items-center gap-3 text-blue-700 cursor-pointer hover:text-blue-900 transition">
            <Eye size={18} /> View PDFs
          </li>

          <li className="flex items-center gap-3 text-blue-700 cursor-pointer hover:text-blue-900 transition">
            <Settings size={18} /> Settings
          </li>
        </ul> */}
      </div>
      <div className="text-xs text-gray-600 text-center">
        PDF Annotation App © 2025
      </div>
    </div>
  );
};

export default Sidebar;
