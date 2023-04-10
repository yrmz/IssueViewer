import React from "react";
import Repos from "./components/Repos";
import Issues from "./components/Issues";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SearchFormProvider } from "./contexts";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <SearchFormProvider>
              <Repos />
            </SearchFormProvider>
          }
        />
        <Route path="/issues" element={<Issues />} />
      </Routes>
    </div>
  );
};

export default App;
