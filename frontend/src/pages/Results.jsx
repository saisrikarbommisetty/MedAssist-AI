import React, { useEffect } from "react";
import { Download, Volume2, ShieldAlert, HeartPulse, RefreshCw, ChevronLeft, ArrowRight, Hospital, ListChecks, HelpCircle } from "lucide-react";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { translations } from "../translations";
import SeverityBadge from "../components/SeverityBadge";
import HospitalFinder from "../components/HospitalFinder";

export default function Results({ triageResult, setCurrentPage, language }) {
  const t = translations[language];

  // Stop any ongoing speech if user leaves the page
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!triageResult) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">No triage result found. Please start a new assessment.</p>
        <button
          onClick={() => setCurrentPage("symptoms")}
          className="mt-4 inline-flex items-center space-x-2 rounded-xl bg-primary-600 px-4 py-2 text-sm font-bold text-white shadow-sm"
        >
          <span>Start Assessment</span>
        </button>
      </div>
    );
  }

  const confidencePct = Math.round(triageResult.confidence * 100);

  const handleDownloadPDF = () => {
    if (!triageResult) return;

    // Create portrait, millimeter-unit, letter-size jsPDF document
    const doc = new jsPDF("p", "mm", "letter");

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Format assessment datetime and report filename
    const assessmentDate = triageResult.created_at ? new Date(triageResult.created_at) : new Date();
    const yyyy = assessmentDate.getFullYear();
    const mm = String(assessmentDate.getMonth() + 1).padStart(2, "0");
    const dd = String(assessmentDate.getDate()).padStart(2, "0");
    const formattedDate = `${yyyy}-${mm}-${dd}`;
    const formattedDateTime = assessmentDate.toLocaleString();

    // 1. Branding Header Banner (Deep Slate Theme)
    doc.setFillColor(30, 41, 59); // Slate 800
    doc.rect(0, 0, pageWidth, 40, "F");

    // Title text
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("MedAssist AI", 15, 18);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(203, 213, 225); // Slate 300
    doc.text("Clinical Assessment & Triage Report", 15, 25);

    // Right-aligned header metadata
    doc.setFontSize(9);
    doc.setTextColor(241, 245, 249); // Slate 100
    doc.text(`Assessment Date: ${formattedDateTime}`, pageWidth - 15, 18, { align: "right" });
    doc.text("System: Random Forest AI Classification Engine", pageWidth - 15, 24, { align: "right" });

    // Section 1: Patient Intake Parameters
    let currentY = 50;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text("1. Patient Intake Parameters", 15, currentY);

    doc.setDrawColor(226, 232, 240); // Slate 200
    doc.setLineWidth(0.5);
    doc.line(15, currentY + 2, pageWidth - 15, currentY + 2);
    currentY += 6;

    // Intake Details Table
    autoTable(doc, {
      startY: currentY,
      theme: "plain",
      styles: { fontSize: 9.5, cellPadding: 3 },
      columnStyles: {
        0: { fontStyle: "bold", textColor: [100, 116, 139], width: 35 },
        1: { textColor: [30, 41, 59], width: 55 },
        2: { fontStyle: "bold", textColor: [100, 116, 139], width: 35 },
        3: { textColor: [30, 41, 59] }
      },
      body: [
        [
          "Age:", `${triageResult.age || "N/A"} years`, 
          "Gender:", triageResult.gender || "N/A"
        ],
        [
          "Symptom Duration:", triageResult.duration || "N/A", 
          "Medical History:", triageResult.medical_history || "None reported"
        ]
      ]
    });

    currentY = doc.lastAutoTable.finalY + 8;

    // Optional Emergency Warning Banner (High Acuity)
    if (triageResult.emergency_warning) {
      autoTable(doc, {
        startY: currentY,
        theme: "plain",
        styles: { cellPadding: 4, fontSize: 10 },
        body: [
          [
            {
              content: "EMERGENCY WARNING TRIGGERED\nThe clinical indicators suggest a high-acuity crisis. Activate emergency services immediately.",
              styles: {
                fillColor: [254, 242, 242], // Light red
                textColor: [220, 38, 38], // Red
                fontStyle: "bold",
                lineWidth: 0.5,
                drawColor: [254, 202, 202] // Red border
              }
            }
          ]
        ]
      });
      currentY = doc.lastAutoTable.finalY + 8;
    }

    // Section 2: Clinical Findings & AI Classification
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text("2. Clinical Findings & AI Classification", 15, currentY);

    doc.line(15, currentY + 2, pageWidth - 15, currentY + 2);
    currentY += 6;

    // Severity coloring setup
    const severityLower = (triageResult.severity || "").toLowerCase();
    const severityColor = severityLower === "high" 
      ? [225, 29, 72] // Rose
      : severityLower === "medium"
        ? [217, 119, 6] // Amber
        : [5, 150, 105]; // Emerald

    const severityBgColor = severityLower === "high" 
      ? [254, 242, 242] 
      : severityLower === "medium" 
        ? [255, 251, 235] 
        : [240, 253, 250];

    autoTable(doc, {
      startY: currentY,
      theme: "striped",
      styles: { fontSize: 9.5, cellPadding: 4 },
      headStyles: { fillColor: [13, 148, 136], textColor: [255, 255, 255], fontStyle: "bold" },
      columnStyles: {
        0: { fontStyle: "bold", width: 50 },
        1: { textColor: [30, 41, 59] }
      },
      head: [["Assessment Metric", "AI Model Outcome"]],
      body: [
        ["Predicted Condition", triageResult.predicted_disease || "Unknown"],
        ["Confidence Score", `${confidencePct}% Probability`],
        [
          "Urgency Severity Level", 
          { 
            content: (triageResult.severity || "Low").toUpperCase(), 
            styles: { 
              textColor: severityColor, 
              fontStyle: "bold",
              fillColor: severityBgColor
            } 
          }
        ],
        ["Recommended Department", triageResult.recommended_department || "General Practice"]
      ]
    });

    currentY = doc.lastAutoTable.finalY + 8;

    // Section 3: Evaluated Symptoms & Possible Causes
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text("3. Evaluated Symptoms & Possible Causes", 15, currentY);

    doc.line(15, currentY + 2, pageWidth - 15, currentY + 2);
    currentY += 6;

    const symptomsString = (triageResult.symptoms || []).join(", ");
    const causesList = (triageResult.possible_causes || []).join("\n");

    autoTable(doc, {
      startY: currentY,
      theme: "grid",
      styles: { fontSize: 9, cellPadding: 4, valign: "top" },
      headStyles: { fillColor: [71, 85, 105], textColor: [255, 255, 255], fontStyle: "bold" },
      columnStyles: {
        0: { width: (pageWidth - 30) / 2 },
        1: { width: (pageWidth - 30) / 2 }
      },
      head: [["Symptoms Evaluated", "Possible Clinical Causes"]],
      body: [[symptomsString || "None selected", causesList || "No possible causes listed"]]
    });

    currentY = doc.lastAutoTable.finalY + 8;

    // Section 4: Recommended Actions & First Aid
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(30, 41, 59);
    doc.text("4. Recommended Actions & First Aid", 15, currentY);

    doc.line(15, currentY + 2, pageWidth - 15, currentY + 2);
    currentY += 6;

    const firstAidRows = (triageResult.first_aid || []).map((step, idx) => [`${idx + 1}.`, step]);

    autoTable(doc, {
      startY: currentY,
      theme: "plain",
      styles: { fontSize: 9, cellPadding: 2.5, valign: "top" },
      columnStyles: {
        0: { fontStyle: "bold", width: 8, textColor: [225, 29, 72] }, // Red numbers
        1: { textColor: [30, 41, 59] }
      },
      body: firstAidRows.length > 0 ? firstAidRows : [["-", "No first aid instructions available."]]
    });

    currentY = doc.lastAutoTable.finalY + 6;

    // Suggested Next Action Box
    autoTable(doc, {
      startY: currentY,
      theme: "plain",
      styles: { cellPadding: 4, fontSize: 9.5 },
      body: [
        [
          {
            content: `SUGGESTED NEXT ACTION:\n${triageResult.suggested_next_action || "Consult a healthcare professional."}`,
            styles: {
              fillColor: [240, 253, 250], // Light teal
              textColor: [13, 148, 136], // Teal
              fontStyle: "bold",
              lineWidth: 0.5,
              drawColor: [153, 246, 228] // Teal border
            }
          }
        ]
      ]
    });

    // 5. Apply Headers & Footers to all generated pages dynamically
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Footer divider line
      doc.setDrawColor(226, 232, 240); // Slate 200
      doc.setLineWidth(0.5);
      doc.line(15, pageHeight - 20, pageWidth - 15, pageHeight - 20);

      // Disclaimer Text
      doc.setFont("helvetica", "italic");
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184); // Slate 400
      
      const disclaimer1 = "Disclaimer: MedAssist AI is for educational and guidance purposes only.";
      const disclaimer2 = "In case of a serious life-threatening medical situation, immediately call emergency services.";
      
      doc.text(disclaimer1, 15, pageHeight - 15);
      doc.text(disclaimer2, 15, pageHeight - 11);

      // Page Number
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - 15, pageHeight - 13, { align: "right" });
    }

    const filename = `MedAssist_Report_${formattedDate}.pdf`;
    doc.save(filename);
  };

  const handleTextToSpeech = () => {
    if (!window.speechSynthesis) return;

    // Cancel current active speech
    window.speechSynthesis.cancel();

    // Compile report speech text
    const textSpeech = `
      MedAssist AI Assessment Results. 
      Predicted Condition: ${triageResult.predicted_disease}. 
      Confidence level: ${confidencePct} percent. 
      Emergency Severity level: ${triageResult.severity}. 
      Recommended hospital department: ${triageResult.recommended_department}. 
      Suggested next action: ${triageResult.suggested_next_action}. 
      First Aid Instructions: ${triageResult.first_aid.join(". ")}
    `;

    const utterance = new SpeechSynthesisUtterance(textSpeech);
    if (language === "es") {
      utterance.lang = "es-ES";
    } else if (language === "hi") {
      utterance.lang = "hi-IN";
    } else {
      utterance.lang = "en-US";
    }

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Back navigation buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage("symptoms")}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>New Assessment</span>
        </button>

        <div className="flex space-x-2">
          {/* Read Aloud Button */}
          <button
            onClick={handleTextToSpeech}
            className="inline-flex items-center space-x-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/80 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-sm transition-colors cursor-pointer"
          >
            <Volume2 className="h-4 w-4 text-primary-500 animate-bounce" />
            <span>{t.readReport}</span>
          </button>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center space-x-1.5 rounded-xl bg-primary-600 hover:bg-primary-700 px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:shadow transition-colors cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>{t.downloadPdf}</span>
          </button>
        </div>
      </div>

      {/* Grid containing results and actions */}
      <div className="grid gap-8 lg:grid-cols-12">
        
        {/* LEFT COLUMN: Report body (for pdf export, styled cleanly) */}
        <div id="triage-report" className="lg:col-span-7 bg-white rounded-2xl p-6 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800/50 space-y-6">
          
          {/* Report branding header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <HeartPulse className="h-6 w-6 text-rose-500" />
              <span className="text-md font-bold tracking-tight text-slate-900 dark:text-white">
                MedAssist<span className="text-primary-500">AI</span> Clinical Assessment
              </span>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              Logged: {triageResult.created_at ? new Date(triageResult.created_at).toLocaleString() : new Date().toLocaleString()}
            </span>
          </div>

          {/* Warning Banner */}
          {triageResult.emergency_warning && (
            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 dark:border-rose-950/20 dark:bg-rose-950/10">
              <div className="flex items-start space-x-3">
                <ShieldAlert className="h-5 w-5 text-rose-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-rose-800 dark:text-rose-400">Emergency Warning Triggered</h4>
                  <p className="text-xs text-rose-700 dark:text-rose-300 mt-0.5 font-semibold">
                    The clinical indicators suggest a high-acuity crisis. Activate emergency services immediately.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Condition & Confidence Dashboard */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-950 dark:border-slate-800/40">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.predictedCondition}</p>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                {triageResult.predicted_disease}
              </h3>
            </div>
            
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-950 dark:border-slate-800/40">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.confidenceScore}</p>
              <div className="flex items-baseline space-x-1.5 mt-1">
                <span className="text-2xl font-extrabold text-primary-600 dark:text-primary-400">{confidencePct}%</span>
                <span className="text-xs text-slate-400">probability score</span>
              </div>
            </div>
          </div>

          {/* Severity & Referrals */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.severityLevel}</p>
              <div className="mt-1"><SeverityBadge severity={triageResult.severity} /></div>
            </div>
            
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{t.recommendedDept}</p>
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-2 flex items-center">
                <Hospital className="h-4 w-4 text-primary-500 mr-1.5 flex-shrink-0" />
                <span>{triageResult.recommended_department}</span>
              </div>
            </div>
          </div>

          {/* Patient Details Summary */}
          <div className="rounded-xl border border-slate-100 p-4 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Patient Intake Parameters
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
              <div>
                <span className="block text-slate-400">Age:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{triageResult.age} years</span>
              </div>
              <div>
                <span className="block text-slate-400">Gender:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{triageResult.gender}</span>
              </div>
              <div>
                <span className="block text-slate-400">Duration:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{triageResult.duration}</span>
              </div>
              {triageResult.medical_history && (
                <div className="col-span-full">
                  <span className="block text-slate-400">Medical History:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 italic">"{triageResult.medical_history}"</span>
                </div>
              )}
              <div className="col-span-full">
                <span className="block text-slate-400 mb-1">Symptoms Evaluated:</span>
                <div className="flex flex-wrap gap-1">
                  {triageResult.symptoms.map((s, i) => (
                    <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded text-[10px] font-semibold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Possible Causes */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 border-b border-slate-50 pb-2 dark:border-slate-800/60">
              <HelpCircle className="h-4 w-4 text-slate-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t.possibleCauses}
              </h4>
            </div>
            <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-400 space-y-1">
              {triageResult.possible_causes.map((cause, idx) => (
                <li key={idx} className="leading-relaxed font-medium">{cause}</li>
              ))}
            </ul>
          </div>

          {/* Suggested Next Action */}
          <div className="rounded-xl bg-primary-50/40 p-4 border border-primary-100/50 dark:bg-primary-950/10 dark:border-primary-900/20">
            <h4 className="text-xs font-bold text-primary-700 dark:text-primary-400 uppercase tracking-wider">
              {t.nextAction}
            </h4>
            <p className="text-xs sm:text-sm text-primary-900 dark:text-primary-300 mt-1.5 font-bold leading-relaxed">
              {triageResult.suggested_next_action}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: First aid steps & nearby hospital detector */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* First Aid Box */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800/50 space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3 dark:border-slate-800">
              <ListChecks className="h-5 w-5 text-rose-500 animate-pulse" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.firstAidInst}
              </h3>
            </div>
            
            <div className="space-y-3">
              {triageResult.first_aid.map((instruction, idx) => (
                <div key={idx} className="flex items-start space-x-2.5">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 text-[10px] font-bold text-rose-700 dark:bg-rose-950/50 dark:text-rose-400">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hospital Locator */}
          <HospitalFinder language={language} />
        </div>
      </div>
    </div>
  );
}
