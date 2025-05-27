import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchResults from "@/pages/SearchResults";
import "./App.css";

const DARK_MODE_KEY = "wremotely-dark-mode";

const getInitialDarkMode = () => {
  const stored = localStorage.getItem(DARK_MODE_KEY);
  if (stored !== null) return stored === "true";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, String(darkMode));
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div className="mt-16">
          {" "}
          {/* Add this wrapper */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
