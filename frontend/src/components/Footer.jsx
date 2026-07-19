import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { translations } from "../translations";

export default function Footer({ language }) {
  const t = translations[language];

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Medical Disclaimer Banner */}
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50/50 p-4 dark:border-amber-900/30 dark:bg-amber-950/10">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
              {t.disclaimer}
            </p>
          </div>
        </div>

        {/* Footer Details */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center space-x-1.5 mb-4 md:mb-0">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>© {new Date().getFullYear()} MedAssist AI Triage Platform. HIPAA Compliant Interface Mock.</span>
          </div>
          <div className="flex space-x-6">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span className="hover:underline cursor-pointer">Clinical Documentation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
