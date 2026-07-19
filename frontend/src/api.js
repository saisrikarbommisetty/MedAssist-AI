// API service helper to communicate with the FastAPI backend.
// Defaults to localhost:8000 but can be overridden with VITE_API_URL for production (e.g. Render).
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function fetchSymptoms() {
  const response = await fetch(`${API_BASE_URL}/api/symptoms`);
  if (!response.ok) {
    throw new Error("Failed to fetch symptoms from backend.");
  }
  return response.json();
}

export async function performTriage(triageData) {
  const response = await fetch(`${API_BASE_URL}/api/triage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(triageData),
  });
  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || "Failed to perform triage analysis.");
  }
  return response.json();
}

export async function fetchHistory() {
  const response = await fetch(`${API_BASE_URL}/api/history`);
  if (!response.ok) {
    throw new Error("Failed to fetch triage history.");
  }
  return response.json();
}

export async function deleteHistoryItem(id) {
  const response = await fetch(`${API_BASE_URL}/api/history/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete history item.");
  }
  return response.json();
}
