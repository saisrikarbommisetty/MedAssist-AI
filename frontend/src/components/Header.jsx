import React from "react";
import { HeartPulse, Sun, Moon, Languages } from "lucide-react";
import { translations } from "../translations";

export default function Header({ currentPage, setCurrentPage, language, setLanguage, darkMode, setDarkMode }) {
  const t = translations[language];

  const navItems = [
    { id: "home", label: t.home },
    { id: "symptoms", label: t.symptomAnalysis },
    { id: "first-aid", label: t.firstAid },
    { id: "about", label: t.about },
  ];

  const toggleDarkMode = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 dark:border-slate-800/80 dark:bg-slate-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div 
          className="flex cursor-pointer items-center space-x-2 text-primary-600 dark:text-primary-400"
          onClick={() => setCurrentPage("home")}
        >
          <HeartPulse className="h-8 w-8 animate-pulse text-rose-500" />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            MedAssist<span className="text-primary-500 font-extrabold">AI</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                currentPage === item.id || (item.id === "symptoms" && currentPage === "results")
                  ? "text-primary-600 dark:text-primary-400 border-b-2 border-primary-500 px-0.5 py-1"
                  : "text-slate-600 dark:text-slate-400 py-1"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Controls */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="relative flex items-center space-x-1">
            <Languages className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 outline-none focus:border-primary-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              <option value="en">English (EN)</option>
              <option value="es">Español (ES)</option>
              <option value="hi">हिन्दी (HI)</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900 transition-colors"
            aria-label="Toggle Theme"
          >
            {darkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-slate-600" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="flex md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950 px-4 py-2 justify-around">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`text-xs font-semibold px-2 py-1 rounded-md ${
              currentPage === item.id || (item.id === "symptoms" && currentPage === "results")
                ? "bg-primary-50 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400"
                : "text-slate-600 dark:text-slate-400"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
