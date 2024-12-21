import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Repositories from "./pages/Repositories";
import SimilarUsers from "./pages/SimilarUsers";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repositories/:username" element={<Repositories />} />
        <Route path="/similar-users/:query" element={<SimilarUsers />} />
      </Routes>
    </Router>
  );
};

export default App;
