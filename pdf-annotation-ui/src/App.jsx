import React from "react";
import { useState } from "react";
import Sidebar from "./Components/Sidebar.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import TestAPI from "./Components/TestApi.jsx";

const App = () => {
  const [role, setRole] = useState("A1");
  return (
    <div className="flex min-h-screen bg-linear-to-br from-blue-100 to-blue-300">
      <Sidebar role={role} setRole={setRole} />
      <Dashboard role={role} />
      {/* <TestAPI /> */}
    </div>
  );
};

export default App;
