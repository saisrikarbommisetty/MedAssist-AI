import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SymptomAnalysis from "./pages/SymptomAnalysis";
import Results from "./pages/Results";
import FirstAid from "./pages/FirstAid";
import About from "./pages/About";
import { translations } from "./translations";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [triageResult, setTriageResult] = useState(null);
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(false);

  // Initialize theme from localStorage on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home setCurrentPage={setCurrentPage} language={language} />;
      case "symptoms":
        return (
          <SymptomAnalysis
            setTriageResult={setTriageResult}
            setCurrentPage={setCurrentPage}
            language={language}
          />
        );
      case "results":
        return (
          <Results
            triageResult={triageResult}
            setCurrentPage={setCurrentPage}
            language={language}
          />
        );
      case "first-aid":
        return <FirstAid language={language} />;
      case "about":
        return <About language={language} />;
      default:
        return <Home setCurrentPage={setCurrentPage} language={language} />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Navigation Header */}
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer Banner */}
      <Footer language={language} />
    </div>
  );
}
