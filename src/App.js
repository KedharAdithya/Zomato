import HomePage from "./components/home/HomePage";
import Restaurant from "./components/restaurnat/Restaurant";
import SearchPage from "./components/search/SearchPage";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quick-search" element={<SearchPage />} />
        <Route path="/restaurant/:id" element={<Restaurant />} />
      </Routes>
    </>
  );
}

export default App;
