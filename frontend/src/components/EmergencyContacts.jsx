import React, { useState } from "react";
import { Phone, Globe } from "lucide-react";
import { translations } from "../translations";

export default function EmergencyContacts({ language }) {
  const t = translations[language];
  const [selectedRegion, setSelectedRegion] = useState("all");

  const contacts = [
    { region: "us", name: "United States Emergency", number: "911", desc: "All emergencies" },
    { region: "us", name: "Poison Control Center", number: "1-800-222-1222", desc: "Chemicals/poisoning advice" },
    { region: "us", name: "National Suicide & Crisis Lifeline", number: "988", desc: "Mental health crisis support" },
    
    { region: "in", name: "India National Emergency", number: "112", desc: "Unified emergency number" },
    { region: "in", name: "India Ambulance Service", number: "102", desc: "Medical transit services" },
    { region: "in", name: "India Police Response", number: "100", desc: "Security and police dispatch" },
    
    { region: "uk", name: "United Kingdom Emergency Services", number: "999", desc: "Police, Fire, Ambulance" },
    { region: "uk", name: "United Kingdom NHS Health Advice", number: "111", desc: "Non-emergency medical advisory" },
    
    { region: "eu", name: "European Union Emergency Line", number: "112", desc: "Unified European emergency number" }
  ];

  const filteredContacts = selectedRegion === "all"
    ? contacts
    : contacts.filter(c => c.region === selectedRegion);

  const regionLabels = {
    all: "All Regions",
    us: "United States",
    in: "India",
    uk: "United Kingdom",
    eu: "European Union"
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800/50">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-4 dark:border-slate-800 mb-4">
        <div className="flex items-center space-x-2">
          <Phone className="h-5 w-5 text-rose-500" />
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">
            {t.emergencyContacts}
          </h3>
        </div>
        
        {/* Region Filter */}
        <div className="mt-2 sm:mt-0 flex items-center space-x-1.5">
          <Globe className="h-4 w-4 text-slate-400" />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 outline-none focus:border-primary-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            {Object.entries(regionLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {filteredContacts.map((contact, index) => (
          <div 
            key={index}
            className="flex items-center justify-between rounded-xl bg-slate-50 p-4 hover:bg-slate-100 transition-colors border border-slate-100 dark:bg-slate-950 dark:border-slate-800/40 dark:hover:bg-slate-900/60"
          >
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{regionLabels[contact.region]}</p>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">{contact.name}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{contact.desc}</p>
            </div>
            
            <a 
              href={`tel:${contact.number}`}
              className="flex items-center space-x-1 rounded-lg bg-rose-500 hover:bg-rose-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition-colors duration-200"
            >
              <Phone className="h-3 w-3 fill-current" />
              <span>{contact.number}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
