import React from "react";
import { ArrowRight, Activity, Brain, ShieldAlert, Sparkles, Navigation } from "lucide-react";
import { translations } from "../translations";

export default function Home({ setCurrentPage, language }) {
  const t = translations[language];

  return (
    <div className="relative isolate overflow-hidden">
      {/* Background Glows */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-400 to-health-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary-700 ring-1 ring-inset ring-primary-700/10 dark:bg-primary-950/30 dark:text-primary-400 dark:ring-primary-500/20">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-spin" />
              <span>AI-Powered Medical Assistance Engine</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white leading-none">
              {t.heroTitle.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="bg-gradient-to-r from-primary-500 to-health-500 bg-clip-text text-transparent">
                {t.heroTitle.split(" ").slice(-1)}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t.heroDesc}
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
              <button
                onClick={() => setCurrentPage("symptoms")}
                className="inline-flex items-center justify-center space-x-2 rounded-xl bg-primary-600 hover:bg-primary-700 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                <span>{t.startTriage}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              
              <button
                onClick={() => setCurrentPage("first-aid")}
                className="inline-flex items-center justify-center space-x-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 shadow-sm transition-colors cursor-pointer"
              >
                <span>{t.firstAid}</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-200/60 dark:border-slate-800/60 max-w-lg">
              <div>
                <p className="text-2xl font-extrabold text-primary-600 dark:text-primary-400">15</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Classified Conditions</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-health-600 dark:text-health-400">92%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Model Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-rose-500">24/7</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">Emergency Support</p>
              </div>
            </div>
          </div>

          {/* Hero Right Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm rounded-3xl bg-slate-900/5 p-2 ring-1 ring-slate-900/10 dark:bg-white/5 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="rounded-2xl bg-white p-6 shadow-xl dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-rose-500 animate-pulse" />
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">Active Triage Board</span>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                </div>
                
                <div className="space-y-4 py-4">
                  {/* Dynamic Mock Assessment 1 */}
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 dark:bg-slate-950 dark:border-slate-800/50">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">Patient 402 - Heart Attack</span>
                      <span className="rounded bg-rose-50 px-1.5 py-0.5 font-bold text-rose-700 dark:bg-rose-950/40 dark:text-rose-400">Critical (Red)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Symptoms: Chest pain, Sweating, Left arm pain</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1.5 font-bold">First Aid: Loosen clothing, Call ambulance</p>
                  </div>
                  
                  {/* Dynamic Mock Assessment 2 */}
                  <div className="rounded-xl bg-slate-50 p-3 border border-slate-100 dark:bg-slate-950 dark:border-slate-800/50">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200">Patient 403 - Common Cold</span>
                      <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">Low (Green)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Symptoms: Sneezing, Sore throat, Mild cough</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-1.5 font-bold">First Aid: Rest, Hydrate, Warm saline gargle</p>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[10px] text-slate-400">MedAssist AI uses a secure SQLite record tracking mechanism.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Stepper */}
      <div className="bg-slate-100/50 dark:bg-slate-950/40 py-16 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            {t.howItWorks}
          </h2>
          <div className="grid gap-8 sm:grid-cols-3 mt-10">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800/50 text-center">
              <Brain className="h-10 w-10 text-primary-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">{t.step1}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{t.step1Desc}</p>
            </div>
            
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800/50 text-center">
              <Activity className="h-10 w-10 text-primary-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">{t.step2}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{t.step2Desc}</p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800/50 text-center">
              <ShieldAlert className="h-10 w-10 text-primary-500 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-4">{t.step3}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">{t.step3Desc}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          {t.featuresTitle}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mt-10">
          <div className="space-y-2">
            <Brain className="h-8 w-8 text-primary-500" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">{t.feature1Title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.feature1Desc}</p>
          </div>
          <div className="space-y-2">
            <ShieldAlert className="h-8 w-8 text-rose-500" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">{t.feature2Title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.feature2Desc}</p>
          </div>
          <div className="space-y-2">
            <Navigation className="h-8 w-8 text-emerald-500" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">{t.feature3Title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.feature3Desc}</p>
          </div>
          <div className="space-y-2">
            <Sparkles className="h-8 w-8 text-amber-500" />
            <h4 className="text-base font-bold text-slate-900 dark:text-white">{t.feature4Title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.feature4Desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
