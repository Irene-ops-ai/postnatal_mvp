import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import Resources from "./pages/Resources";
import ThemePreview from "./Components/ThemePreview.jsx"; // ✅ import ThemePreview

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/theme" element={<ThemePreview />} /> {/* ✅ new route */}
      </Routes>
    </>
  );
}
