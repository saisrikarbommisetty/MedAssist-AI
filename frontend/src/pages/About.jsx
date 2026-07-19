import React from "react";
import { Brain, HeartPulse, Cpu, CalendarRange, Rocket } from "lucide-react";
import { translations } from "../translations";

export default function About({ language }) {
  const t = translations[language];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-10">
      
      {/* Page Title */}
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
          {t.about} Project
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Technical specifications, architecture mappings, and clinical design overview.
        </p>
      </div>

      {/* Grid sections */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Problem Statement */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div className="flex items-center space-x-2">
            <HeartPulse className="h-6 w-6 text-rose-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Problem Statement</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
            During medical crises, general users often struggle to gauge symptom severity, resulting in either unnecessary emergency room visits or, conversely, delayed care for critical conditions (like stroke or cardiac distress). Access to clear, immediate, and actionable triage steps remains a key bottleneck.
          </p>
        </div>

        {/* Project Goal */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <div className="flex items-center space-x-2">
            <CalendarRange className="h-6 w-6 text-primary-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Project Goal</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-semibold">
            To build a robust clinical decision helper that analyzes symptom logs, predicts possible conditions using high-accuracy AI classification, refer users to correct hospital specialties, outlines first aid guidelines, and maps local emergency hotlines and physical hospital centers dynamically.
          </p>
        </div>
      </div>

      {/* How the AI Engine Works */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-primary-500" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">How the AI Engine Works</h3>
        </div>
        
        <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed font-semibold">
          <p>
            At the core of the system sits a **Scikit-Learn Random Forest Classifier** trained on patient profiles spanning 15 diagnostic clinical conditions. 
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 dark:bg-slate-950 dark:border-slate-800/40">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Technical Inference Pipeline</h4>
            <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
              <li>**Symptom Vectorization**: User inputs and speech transcripts are parsed into binary symptom indicators (0 or 1).</li>
              <li>**Demographic Weighting**: Patient Age, Gender, and symptom duration are appended as model features.</li>
              <li>**Random Forest Decision Trees**: The ensemble model processes decision path weights to output category probabilities.</li>
              <li>**Confidence Score & Metadata Mapping**: The highest probability condition is retrieved along with clinical metadata (first-aid checklists, department routes, warning triggers).</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Tech Stack Details */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center space-x-2">
          <Cpu className="h-6 w-6 text-emerald-500" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Technology Stack</h3>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-3 text-xs">
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60">
            <h4 className="font-bold text-slate-900 dark:text-white">Frontend Client</h4>
            <ul className="list-disc pl-4 mt-2 text-slate-500 space-y-1 font-semibold">
              <li>React + Vite</li>
              <li>Tailwind CSS</li>
              <li>Lucide Icons</li>
              <li>Web Speech APIs</li>
            </ul>
          </div>
          
          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60">
            <h4 className="font-bold text-slate-900 dark:text-white">Backend Server</h4>
            <ul className="list-disc pl-4 mt-2 text-slate-500 space-y-1 font-semibold">
              <li>FastAPI (Python)</li>
              <li>Uvicorn Web Server</li>
              <li>SQLAlchemy ORM</li>
              <li>SQLite Database</li>
            </ul>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60">
            <h4 className="font-bold text-slate-900 dark:text-white">AI & Geodata</h4>
            <ul className="list-disc pl-4 mt-2 text-slate-500 space-y-1 font-semibold">
              <li>Scikit-Learn (ML)</li>
              <li>Pandas & Numpy</li>
              <li>OpenStreetMap API</li>
              <li>HTML2PDF Report</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Future Scope */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
        <div className="flex items-center space-x-2">
          <Rocket className="h-6 w-6 text-amber-500 animate-pulse" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Future Scope</h3>
        </div>
        <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2 leading-relaxed font-semibold">
          <li>**Computer Vision Wound Assessment**: Allow patients to upload photos of cuts, burns, or rashes for immediate classification.</li>
          <li>**Telemedicine Linkage**: Direct route to video call instantly with an available medical consultant based on predicted severity.</li>
          <li>**Wearable Device Integration**: Read real-time biometric inputs (blood pressure, heart rate, oxygen levels) to increase diagnostic accuracy.</li>
          <li>**Expanded Regional Language Speech Systems**: Offer native Speech Synthesis and Recognition for a wider array of local dialects.</li>
        </ul>
      </div>
    </div>
  );
}
