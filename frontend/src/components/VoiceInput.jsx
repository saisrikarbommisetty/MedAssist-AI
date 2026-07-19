import React, { useState, useEffect } from "react";
import { Mic, MicOff, AlertCircle } from "lucide-react";
import { translations } from "../translations";

export default function VoiceInput({ language, onTranscript }) {
  const t = translations[language];
  const [recognizing, setRecognizing] = useState(false);
  const [supported, setSupported] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSupported(false);
    }
  }, []);

  const startSpeechRecognition = () => {
    setError("");
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    
    // Set language settings matching selected locale
    if (language === "es") {
      recognition.lang = "es-ES";
    } else if (language === "hi") {
      recognition.lang = "hi-IN";
    } else {
      recognition.lang = "en-US";
    }
    
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setRecognizing(true);
    };

    recognition.onerror = (event) => {
      console.error("Speech error:", event.error);
      if (event.error === "not-allowed") {
        setError("Microphone permission denied.");
      } else {
        setError("Could not capture speech. Try again.");
      }
      setRecognizing(false);
    };

    recognition.onend = () => {
      setRecognizing(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (transcript) {
        onTranscript(transcript);
      }
    };

    recognition.start();
  };

  if (!supported) return null;

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={startSpeechRecognition}
        disabled={recognizing}
        className={`flex items-center space-x-2 rounded-xl border px-4 py-2.5 text-xs font-semibold shadow-sm transition-all duration-200 cursor-pointer ${
          recognizing
            ? "border-rose-500 bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400 animate-pulse"
            : "border-slate-300 bg-white hover:bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/80"
        }`}
      >
        {recognizing ? (
          <>
            <Mic className="h-4 w-4 text-rose-500 animate-bounce" />
            <span>{t.voiceActive}</span>
          </>
        ) : (
          <>
            <Mic className="h-4 w-4 text-slate-500 dark:text-slate-400" />
            <span>{t.voiceStart}</span>
          </>
        )}
      </button>

      {error && (
        <p className="text-[10px] text-rose-500 mt-1 flex items-center space-x-0.5">
          <AlertCircle className="h-3 w-3 flex-shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
