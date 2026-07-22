import React, { useState } from "react";
import { Navigation, MapPin, Eye, AlertCircle } from "lucide-react";
import { translations } from "../translations";

// Haversine formula to compute distance in km
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function HospitalFinder({ language }) {
  const t = translations[language];
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const fallbackHospitals = [
    { name: "City General Hospital", address: "Central Health Avenue 42, Metro City", distance: 1.2 },
    { name: "St. Jude Emergency Center", address: "Northside Crossroad 109, Metro City", distance: 2.8 },
    { name: "County Medical Plaza", address: "East Boulevard Road 50, Metro City", distance: 4.1 }
  ];

  const fetchHospitals = async (latitude, longitude) => {
    const maxRetries = 3;
    let attempt = 0;
    
    // Query OSM Overpass API for hospitals (nodes, ways, and relations) within an 8km (8000m) radius
    const query = `[out:json][timeout:25];(node["amenity"="hospital"](around:8000,${latitude},${longitude});way["amenity"="hospital"](around:8000,${latitude},${longitude});relation["amenity"="hospital"](around:8000,${latitude},${longitude}););out center;`;
    const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

    while (attempt < maxRetries) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`OSM HTTP error: ${response.status}`);
        }
        
        const data = await response.json();
        if (data && data.elements) {
          const results = data.elements
            .map(el => {
              const tags = el.tags || {};
              const name = tags.name || tags["name:en"] || "Unnamed Hospital";
              const street = tags["addr:street"] || "";
              const housenumber = tags["addr:housenumber"] || "";
              const city = tags["addr:city"] || "";
              
              const address = [housenumber, street, city].filter(Boolean).join(", ") || "Location details not indexed";
              
              // Extract lat/lon from center for ways/relations, or direct lat/lon for nodes
              const lat = el.lat || (el.center && el.center.lat);
              const lon = el.lon || (el.center && el.center.lon);
              
              if (lat === undefined || lon === undefined) return null;
              
              const dist = calculateDistance(latitude, longitude, lat, lon);
              
              return {
                name,
                address,
                distance: parseFloat(dist.toFixed(1)),
                lat,
                lon
              };
            })
            .filter(Boolean); // Filter out any null nodes
          
          if (results.length > 0) {
            // Sort by nearest
            results.sort((a, b) => a.distance - b.distance);
            setHospitals(results.slice(0, 4));
            setError(null);
          } else {
            setError("No nearby hospitals found within 8km of your location.");
            setHospitals([]); // Clear hospitals, do not show default/fallback list
          }
          setLoading(false);
          return;
        } else {
          throw new Error("Invalid response format received from Overpass API.");
        }
      } catch (err) {
        attempt++;
        console.warn(`OSM fetch attempt ${attempt} failed:`, err);
        if (attempt >= maxRetries) {
          setError("Failed to fetch nearby hospitals after retries. Showing default centers.");
          setHospitals(fallbackHospitals); // Show fallback hospitals because API query failed after retries
          setLoading(false);
          return;
        }
        // Wait 1.5 seconds before retrying
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
    }
  };

  const detectLocationAndSearch = () => {
    setLoading(true);
    setError(null);
    setSearched(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser. Showing default centers.");
      setHospitals(fallbackHospitals);
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchHospitals(latitude, longitude);
      },
      (geoErr) => {
        console.error("Geo location detection error:", geoErr);
        if (geoErr.code === geoErr.PERMISSION_DENIED) {
          setError("Location permission denied. Showing default centers.");
        } else {
          setError("Could not retrieve your location. Showing default centers.");
        }
        setHospitals(fallbackHospitals);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800/50">
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-4 dark:border-slate-800 mb-4">
        <Navigation className="h-5 w-5 text-emerald-500" />
        <h3 className="text-lg font-bold text-slate-950 dark:text-white">
          {t.findHospitals}
        </h3>
      </div>

      {!searched ? (
        <div className="text-center py-6">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Request location access to view actual emergency medical departments in your immediate vicinity.
          </p>
          <button
            onClick={detectLocationAndSearch}
            className="inline-flex items-center space-x-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors cursor-pointer"
          >
            <MapPin className="h-4 w-4" />
            <span>{t.showHospitalsBtn}</span>
          </button>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500"></div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-semibold">
            {t.loadingHospitals}
          </p>
        </div>
      ) : (
        <div>
          {error && (
            <div className="mb-4 flex items-center space-x-2 rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:bg-amber-950/20 dark:text-amber-400">
              <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            {t.hospitalsFound}
          </h4>

          <div className="space-y-3">
            {hospitals.map((hospital, idx) => (
              <div 
                key={idx}
                className="flex items-start justify-between rounded-xl bg-slate-50 p-4 border border-slate-100 dark:bg-slate-950 dark:border-slate-800/40"
              >
                <div className="pr-4">
                  <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">{hospital.name}</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-1 text-slate-400 flex-shrink-0" />
                    <span>{hospital.address}</span>
                  </p>
                </div>
                
                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-600/10">
                    {hospital.distance} km
                  </span>
                  {hospital.lat && (
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${hospital.lat}&mlon=${hospital.lon}#map=16/${hospital.lat}/${hospital.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-primary-500 hover:text-primary-600 mt-2 flex items-center space-x-0.5 hover:underline"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Map</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={detectLocationAndSearch}
            className="text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 font-semibold text-center w-full mt-4 block hover:underline"
          >
            Refresh search location
          </button>
        </div>
      )}
    </div>
  );
}
