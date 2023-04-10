import React from "react";
import Repos from "./components/Repos";
import Issues from "./components/Issues";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { InfiniteScrollProvider, SearchFormProvider } from "./contexts";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <SearchFormProvider>
              <InfiniteScrollProvider>
                <Repos />
              </InfiniteScrollProvider>
            </SearchFormProvider>
          }
        />
        <Route path="/issues" element={<Issues />} />
      </Routes>
    </div>
  );
};

export default App;
