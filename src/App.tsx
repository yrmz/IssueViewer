import React from "react";
import Repos from "./components/Repos";
import Issues from "./components/Issues";
import { BrowserRouter as Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Repos />} />
        <Route path="/issues" element={<Issues />} />
      </Routes>
    </div>
  );
};

export default App;
