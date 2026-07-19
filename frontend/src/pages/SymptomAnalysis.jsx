import React, { useState, useEffect } from "react";
import { Search, AlertCircle, Heart, ChevronRight, Activity, Clock, User, FileText, Trash2, Calendar, Eye } from "lucide-react";
import { translations } from "../translations";
import { fetchSymptoms, performTriage, fetchHistory, deleteHistoryItem } from "../api";
import VoiceInput from "../components/VoiceInput";

export default function SymptomAnalysis({ setTriageResult, setCurrentPage, language }) {
  const t = translations[language];

  const [availableSymptoms, setAvailableSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [age, setAge] = useState(30);
  const [gender, setGender] = useState("Male");
  const [duration, setDuration] = useState("1-3 days");
  const [medicalHistory, setMedicalHistory] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [history, setHistory] = useState([]);

  // Fetch supported symptoms and history from FastAPI backend on mount
  useEffect(() => {
    async function loadData() {
      try {
        const symptoms = await fetchSymptoms();
        setAvailableSymptoms(symptoms);
        await loadHistory();
      } catch (err) {
        console.error(err);
        setError("Failed to communicate with FastAPI triage server. Ensure backend is running.");
      }
    }
    loadData();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await fetchHistory();
      setHistory(data);
    } catch (err) {
      console.error("Failed to load triage history", err);
    }
  };

  const handleDeleteHistory = async (id, e) => {
    e.stopPropagation();
    try {
      await deleteHistoryItem(id);
      setHistory(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Failed to delete item", err);
      setError("Failed to delete history item.");
    }
  };

  const handleSelectHistory = (item) => {
    setTriageResult(item);
    setCurrentPage("results");
  };

  const handleSymptomToggle = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleVoiceTranscript = (text) => {
    // Identify words spoken that match known symptoms
    const textLower = text.toLowerCase();
    const matches = availableSymptoms.filter(symptom => 
      textLower.includes(symptom.toLowerCase())
    );

    if (matches.length > 0) {
      setSelectedSymptoms((prev) => {
        const newSet = new Set([...prev, ...matches]);
        return Array.from(newSet);
      });
      setSuccessMessage(`Detected and added: ${matches.join(", ")}`);
      setTimeout(() => setSuccessMessage(""), 4000);
    } else {
      setError(`Voice heard: "${text}". No matching symptom found in database. Try naming specific symptoms like 'chest pain'.`);
      setTimeout(() => setError(null), 5000);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom to run the AI triage analysis.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        age: parseInt(age),
        gender,
        duration,
        symptoms: selectedSymptoms,
        medical_history: medicalHistory.trim() || null
      };

      const result = await performTriage(payload);
      setTriageResult(result);
      setCurrentPage("results");
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred during symptom classification.");
    } finally {
      setLoading(false);
    }
  };

  const filteredSymptoms = availableSymptoms.filter((symptom) =>
    symptom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
          {t.symptomAnalysis}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Fill out the clinical intake checklist below to enable the Random Forest model classification.
        </p>
      </div>

      {error && (
        <div className="mb-6 flex items-start space-x-2 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:bg-rose-950/20 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/30">
          <AlertCircle className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-6 flex items-start space-x-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30">
          <Heart className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5 animate-pulse" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-6">
        {/* Step 1: Demographics */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800/50 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 dark:border-slate-800">
            <User className="h-5 w-5 text-primary-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Patient Demographics</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t.ageLabel}
              </label>
              <input
                type="number"
                min="1"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t.genderLabel}
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                <option value="Male">{t.male}</option>
                <option value="Female">{t.female}</option>
                <option value="Other">{t.other}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                {t.durationLabel}
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
              >
                <option value="Less than 24 hours">Less than 24 hours</option>
                <option value="1-3 days">1-3 days</option>
                <option value="4-7 days">4-7 days</option>
                <option value="More than a week">More than a week</option>
              </select>
            </div>
          </div>
        </div>

        {/* Step 2: Symptoms Selection */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800/50 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-3 dark:border-slate-800 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t.symptomsLabel}</h3>
            </div>
            
            {/* STT Dictation Tool */}
            <VoiceInput language={language} onTranscript={handleVoiceTranscript} />
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search symptoms (e.g. chest pain, breathing, cough)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:border-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            />
          </div>

          {/* Symptom Chips / Checkboxes */}
          <div className="max-h-60 overflow-y-auto border border-slate-100 rounded-xl p-3 dark:border-slate-800/40 grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSymptoms.length > 0 ? (
              filteredSymptoms.map((symptom) => {
                const isSelected = selectedSymptoms.includes(symptom);
                return (
                  <button
                    type="button"
                    key={symptom}
                    onClick={() => handleSymptomToggle(symptom)}
                    className={`flex items-center space-x-2 rounded-lg border p-2 text-left text-xs font-medium transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-950/40 dark:text-primary-300"
                        : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    <span
                      className={`h-3 w-3 rounded-full border ${
                        isSelected 
                          ? "border-primary-600 bg-primary-600" 
                          : "border-slate-300 dark:border-slate-600"
                      }`}
                    />
                    <span>{symptom}</span>
                  </button>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 col-span-full py-4 text-center">
                No matching symptoms found. Use speech input or modify your query.
              </p>
            )}
          </div>

          {/* Selected Summary */}
          {selectedSymptoms.length > 0 && (
            <div className="pt-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Selected Symptoms ({selectedSymptoms.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedSymptoms.map((symptom) => (
                  <span
                    key={symptom}
                    onClick={() => handleSymptomToggle(symptom)}
                    className="inline-flex items-center space-x-1 rounded-md bg-slate-100 hover:bg-rose-100 hover:text-rose-600 dark:bg-slate-800 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 px-2 py-1 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer transition-colors"
                  >
                    <span>{symptom}</span>
                    <span className="font-extrabold text-[10px]">×</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Step 3: Medical History */}
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800/50 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 dark:border-slate-800">
            <FileText className="h-5 w-5 text-primary-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Medical History</h3>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              {t.historyLabel}
            </label>
            <textarea
              rows="2"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              placeholder="Enter any medical conditions, allergies, or chronic diseases..."
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 outline-none focus:border-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
            />
          </div>
        </div>

        {/* Analyze Trigger Button */}
        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className={`inline-flex items-center space-x-2 rounded-xl bg-primary-600 hover:bg-primary-700 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                <span>Analyzing Symptom Patterns...</span>
              </>
            ) : (
              <>
                <span>{t.analyzeBtn}</span>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* History Dashboard */}
      <div className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800 space-y-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-primary-500" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {t.recentAssessments}
          </h3>
        </div>

        {history.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectHistory(item)}
                className="group relative flex flex-col justify-between rounded-2xl bg-white p-5 border border-slate-200 hover:border-primary-400 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-primary-500/60 cursor-pointer shadow-sm transition-all"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      item.severity.toLowerCase() === 'red' 
                        ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
                        : item.severity.toLowerCase() === 'yellow'
                        ? 'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
                        : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
                    }`}>
                      {item.severity} severity
                    </span>
                    <button
                      onClick={(e) => handleDeleteHistory(item.id, e)}
                      className="text-slate-400 hover:text-rose-500 rounded p-1 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      title="Delete assessment"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-2">
                    {item.predicted_disease}
                  </h4>
                  
                  <p className="text-xs text-slate-400 mt-1 font-semibold">
                    Confidence: {Math.round(item.confidence * 100)}%
                  </p>
                  
                  <div className="mt-3 flex items-center space-x-2 text-[10px] font-semibold text-slate-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(item.created_at).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{item.age}y/o {item.gender}</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-end text-xs font-bold text-primary-500 group-hover:text-primary-600 space-x-1">
                  <span>View Details</span>
                  <Eye className="h-3.5 w-3.5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
            <p className="text-xs text-slate-400 font-semibold">{t.noHistory}</p>
          </div>
        )}
      </div>
    </div>
  );
}
