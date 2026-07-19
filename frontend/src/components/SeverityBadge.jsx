import React from "react";
import { AlertCircle, AlertTriangle, ShieldCheck } from "lucide-react";

export default function SeverityBadge({ severity }) {
  const sev = (severity || "").toLowerCase();

  if (sev === "red" || sev === "critical") {
    return (
      <span className="inline-flex items-center space-x-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-600/10 dark:bg-rose-950/30 dark:text-rose-400 dark:ring-rose-500/20">
        <AlertCircle className="h-4 w-4 text-rose-500" />
        <span>Critical (Emergency)</span>
      </span>
    );
  }

  if (sev === "yellow" || sev === "moderate") {
    return (
      <span className="inline-flex items-center space-x-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800 ring-1 ring-inset ring-amber-600/10 dark:bg-amber-950/30 dark:text-amber-400 dark:ring-amber-500/20">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <span>Moderate (Urgent Care)</span>
      </span>
    );
  }

  // Green / Low
  return (
    <span className="inline-flex items-center space-x-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/10 dark:bg-emerald-950/30 dark:text-emerald-400 dark:ring-emerald-500/20">
      <ShieldCheck className="h-4 w-4 text-emerald-500" />
      <span>Low (General Medicine)</span>
    </span>
  );
}
