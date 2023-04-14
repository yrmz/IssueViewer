import React from "react";
import { Route, Routes } from "react-router-dom";
import { Issues } from "./components/Issues";
import Repos from "./components/Repos";
import { InfiniteScrollProvider, SearchFormProvider } from "./contexts";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            // ここはルーティングをすることが責務の関数なので、コンポーネントの実装はReposに書いた方が良いです。
            <SearchFormProvider>
              <InfiniteScrollProvider>
                <Repos />
              </InfiniteScrollProvider>
            </SearchFormProvider>
          }
        />
        <Route path="/issues" element={<Issues />} />
        {/* パスに一致しない場合のページを用意してあげるといいかも */}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
};

export default App;
