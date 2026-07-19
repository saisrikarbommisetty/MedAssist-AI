import React, { useState } from "react";
import { Search, HeartPulse, ShieldAlert, Thermometer, Info, PlusCircle, CheckCircle } from "lucide-react";
import { translations } from "../translations";

export default function FirstAid({ language }) {
  const t = translations[language];
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const guides = [
    {
      id: "heart-attack",
      title: "Chest Pain / Heart Attack",
      icon: HeartPulse,
      color: "text-rose-500 bg-rose-50 dark:bg-rose-950/20",
      summary: "Potential cardiac emergency. Act rapidly to preserve oxygen flow to the heart muscle.",
      steps: [
        "Call emergency services (911 / 112) immediately.",
        "Have the person sit down, rest, and try to keep calm. Do not let them walk.",
        "Loosen any tight clothing around the neck and chest.",
        "Ask if they have prescribed nitroglycerin, and help them take it.",
        "If they are fully awake and not allergic, have them chew one adult aspirin (325mg).",
        "Be prepared to start CPR if they become unconscious and stop breathing."
      ]
    },
    {
      id: "stroke",
      title: "Stroke / Numbness",
      icon: ShieldAlert,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/20",
      summary: "Cerebrovascular blockage or bleeding. Every minute determines brain cell survival.",
      steps: [
        "Call emergency services immediately.",
        "Use the FAST test to check: Face drooping, Arm weakness, Speech difficulty, Time to call.",
        "Note the exact time symptoms first appeared to help clinicians administer tPA.",
        "Do not allow the patient to walk, eat, or drink.",
        "Keep them lying on their side (recovery position) if they vomit or feel nauseous."
      ]
    },
    {
      id: "anaphylaxis",
      title: "Severe Allergic Reaction",
      icon: PlusCircle,
      color: "text-purple-500 bg-purple-50 dark:bg-purple-950/20",
      summary: "Severe throat/tongue swelling and low blood pressure. Immediate intervention required.",
      steps: [
        "Call emergency services immediately.",
        "Administer epinephrine auto-injector (EpiPen) into the outer thigh if available.",
        "Have the person lie flat with legs raised (improves blood pressure).",
        "If breathing is labored, sit them upright.",
        "Loosen clothing and cover them with a blanket to treat shock."
      ]
    },
    {
      id: "asthma",
      title: "Asthma Attack / Wheezing",
      icon: CheckCircle,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
      summary: "Severe bronchial constriction. Focus on posture and rescue inhalation.",
      steps: [
        "Sit the person upright. Do not let them lie down.",
        "Help them locate and administer 2-6 puffs of their rescue inhaler (Albuterol).",
        "Encourage them to take slow, steady, controlled breaths.",
        "Repeat inhaler puffs after 5-10 minutes if symptoms persist.",
        "Call emergency services if they cannot talk, are blue around the lips, or fail to improve."
      ]
    },
    {
      id: "heatstroke",
      title: "Heat Stroke",
      icon: Thermometer,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/20",
      summary: "Critical body core temperature spike (>103°F) with no sweating. High risk of organ failure.",
      steps: [
        "Call emergency services immediately.",
        "Move the person to a cool, shaded, or air-conditioned area.",
        "Cool the body rapidly: sponge or spray with cool water, fan them, or place ice packs in the armpits, neck, and groin.",
        "Do NOT give fluids by mouth if they are confused or unconscious."
      ]
    },
    {
      id: "bleeding",
      title: "Severe Bleeding",
      icon: Info,
      color: "text-red-500 bg-red-50 dark:bg-red-950/20",
      summary: "Significant arterial or venous blood loss. Focus on compression.",
      steps: [
        "Wear protective gloves if available.",
        "Apply direct pressure to the wound with a clean cloth or sterile bandage.",
        "Maintain continuous pressure. Do not lift the bandage to check the wound.",
        "Elevate the injured limb above the level of the heart if possible.",
        "If bleeding does not stop, apply a tourniquet above the wound if trained, and call emergency services."
      ]
    }
  ];

  const filteredGuides = guides.filter(g =>
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
          {t.firstAid}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Quick-access clinical index for medical stabilization. Click any category to view sequential steps.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative mb-8 max-w-lg mx-auto">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search first aid conditions (e.g. pain, bleeding, stroke)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm text-slate-800 outline-none focus:border-primary-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
        />
      </div>

      {/* Guides Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredGuides.map((guide) => {
          const Icon = guide.icon;
          const isExpanded = expandedId === guide.id;

          return (
            <div
              key={guide.id}
              className={`rounded-2xl border bg-white p-5 transition-all dark:bg-slate-900 ${
                isExpanded
                  ? "border-primary-500 ring-1 ring-primary-500 col-span-full shadow-md"
                  : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700 shadow-sm"
              }`}
            >
              <div 
                className="flex items-center space-x-3.5 cursor-pointer"
                onClick={() => setExpandedId(isExpanded ? null : guide.id)}
              >
                <div className={`rounded-xl p-2.5 ${guide.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-md font-bold text-slate-800 dark:text-slate-200">
                    {guide.title}
                  </h3>
                  {!isExpanded && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {guide.summary}
                    </p>
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                    {guide.summary}
                  </p>

                  <div className="space-y-2.5">
                    {guide.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5">
                        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-700 dark:bg-slate-950/40 dark:text-slate-300">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setExpandedId(null)}
                    className="text-xs font-semibold text-primary-500 hover:text-primary-600 block hover:underline"
                  >
                    Collapse Guide
                  </button>
                </div>
              )}
            </div>
          );
        })}
        {filteredGuides.length === 0 && (
          <p className="text-xs text-slate-400 py-6 text-center col-span-full">
            No first-aid guides match your search criteria.
          </p>
        )}
      </div>
    </div>
  );
}
