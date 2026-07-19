# MedAssist AI – Intelligent Emergency Triage & First Aid Assistant

MedAssist AI is a production-ready, full-stack medical decision support system designed for crisis management, healthtech, and emergency response. At its core, the application uses a **Machine Learning Symptom Classifier** to analyze patient demographics and clinical symptoms. It estimates emergency severity (Green, Yellow, Red), refers the patient to the correct hospital department, outlines immediate first-aid instructions, and locates actual nearby physical hospitals in real-time.

---

## 🌟 Key Features

1. **AI Triage Engine**: A Random Forest Classifier trained on patient symptom profiles across 15 diagnostic clinical conditions. It reports the predicted disease and a clinical confidence percentage.
2. **Immediate First Aid**: Generates a sequential emergency stabilization checklist customized to the patient's predicted condition (e.g. CPR steps for Heart Attack, recovery posture for Stroke).
3. **Dynamic Nearby Hospital Locator**: Requests the user's geolocation coordinates and queries the **OpenStreetMap Overpass API** (free, no API key required) to calculate real distances using the Haversine formula and sort local hospitals by proximity.
4. **Speech-to-Text Voice Input**: Integrates the browser's Web Speech API (`SpeechRecognition`) to transcribe spoken patient symptoms and auto-select them in the checklists (aids elderly or hand-impaired users).
5. **Text-to-Speech Speech Output**: Reads the generated triage report, referrals, and critical first-aid instructions aloud for hands-free convenience.
6. **Multi-Region Emergency Directory**: Displays clickable regional hotline numbers (US, India, UK, EU) with automatic dialing actions.
7. **Regional Language Support**: Integrated instant interface translation structure for English, Spanish, and Hindi.
8. **PDF Report Downloader**: Compiles the clinical triage details into a clean, printable vector PDF file using `html2pdf.js`.
9. **Modern Glassmorphic Dark Mode**: Fully responsive, high-performance styling using Tailwind CSS v4 with system theme persistence.
10. **Assessment History Log**: Uses SQLite and SQLAlchemy to log all triage sessions, creating an interactive history dashboard.

---

## 🛠️ Technology Stack

### Frontend Client
* **React + Vite**: High-performance SPA compilation.
* **Tailwind CSS v4 + PostCSS**: Modern glassmorphic styling system.
* **Lucide Icons**: Clinical icon sets.
* **HTML2PDF.js**: Client-side vector PDF report layout generation.

### Backend Server
* **FastAPI (Python 3.12)**: Asynchronous REST API framework.
* **SQLAlchemy ORM + SQLite**: Persistent local assessment history logs.
* **Scikit-Learn**: Machine Learning model training, evaluation, and inference.
* **Joblib & Pandas**: Dataset compilation and model serialization.

---

## 📂 Folder Structure

```text
MedAssist AI - Full Stack Project/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py             # FastAPI entrypoint, routes, database init, CORS
│   │   ├── database.py         # SQLAlchemy connection & session setup
│   │   ├── models.py           # SQLite SQLAlchemy tables (Assessment logs)
│   │   ├── schemas.py          # Pydantic validation schemas
│   │   ├── disease_data.py     # 15 conditions clinical metadata & symptom list
│   │   └── ml/
│   │       ├── __init__.py
│   │       ├── train.py        # Synthetic dataset generator & RF trainer
│   │       ├── predict.py      # Random Forest inference engine
│   │       ├── model.joblib    # Serialized Random Forest model
│   │       └── metadata.json   # Model features mapping list & accuracy stats
│   │
│   ├── requirements.txt        # Backend python dependencies
│   └── medassist.db            # SQLite database file (auto-generated)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx              # Navigation bar, translation select, dark mode toggle
│   │   │   ├── Footer.jsx              # Footer containing medical disclaimer banner
│   │   │   ├── SeverityBadge.jsx       # Diagnostic urgency priority badges
│   │   │   ├── EmergencyContacts.jsx   # Multi-region contact hotlines card
│   │   │   ├── HospitalFinder.jsx      # Overpass API browser hospital locator
│   │   │   └── VoiceInput.jsx          # Speech-to-Text browser input component
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx                # Landing hero page, how-it-works stepper
│   │   │   ├── SymptomAnalysis.jsx     # Intake checklist, demographic forms, assessment history
│   │   │   ├── Results.jsx             # Results dashboard, TTS, PDF exporter
│   │   │   ├── FirstAid.jsx            # Dynamic first aid clinical index page
│   │   │   └── About.jsx               # Technology stack, problem context, future roadmap
│   │   │
│   │   ├── App.jsx             # Root layout controller, routing, local states
│   │   ├── main.jsx            # Vite DOM renderer
│   │   ├── index.css           # Tailwind v4 import directives
│   │   ├── api.js              # Fetch requests to FastAPI backend
│   │   └── translations.js     # Multilingual dictionaries (EN, ES, HI)
│   │
│   ├── index.html              # SEO metadata, titles, responsive viewport
│   ├── postcss.config.js       # CSS compile routing
│   ├── tailwind.config.js      # Styling extension configurations
│   ├── vite.config.js          # Vite build options
│   └── package.json            # Node dev packages list
│
└── README.md                   # This project manual
```

---

## 🚀 Local Installation & Execution

Ensure you have **Python 3.10+** and **Node.js 18+** installed on your system.

### 1. Set Up and Train the Backend AI Engine
Navigate to the `backend/` directory, create a virtual environment, install packages, and train the Random Forest model:

```bash
# Move to backend folder
cd backend

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the training pipeline to generate model.joblib and metadata.json
python app/ml/train.py

# Start the FastAPI server using Uvicorn
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```
The FastAPI documentation will be available at `http://127.0.0.1:8000/docs`.

### 2. Set Up and Run the Frontend Client
Open a new terminal window, navigate to the `frontend/` directory, install Node modules, and launch the Vite development server:

```bash
# Move to frontend folder
cd frontend

# Install Node modules
npm install

# Start Vite dev server
npm run dev
```
The client website will load at `http://localhost:5173/`.

---

## ☁️ Deployment Guide

### Backend on Render.com
1. Register a free account at [Render](https://render.com/).
2. Click **New +** and select **Web Service**.
3. Link your GitHub repository.
4. Set the following environment configurations:
   * **Runtime**: `Python`
   * **Build Command**: `pip install -r requirements.txt && python app/ml/train.py`
   * **Start Command**: `python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Render will automatically build, train the Random Forest classifier, and host the live endpoints.

### Frontend on Vercel
1. Register a free account at [Vercel](https://vercel.com/).
2. Link your GitHub repository.
3. Select the `frontend` folder as the root directory.
4. In the **Environment Variables** section, add:
   * `VITE_API_URL`: `https://your-backend-render-url.onrender.com` (replace with your active Render web service URL).
5. Click **Deploy**. Vercel will bundle the static React files and route queries to your Render API instance.

---

## 🔮 Future Improvements Roadmap
* **Computer Vision Diagnostics**: Use convolutional neural networks to classify burns, rashes, or cuts from image uploads.
* **Telehealth Hotlinks**: Connect critical-acuity cases directly to instant video consultations with telemedicine providers.
* **IoT Telemetry**: Read telemetry data (oxygen saturations, blood pressure, heart rates) from smartwatches to improve symptom triage accuracy.
* **Expanded Dialects Support**: Integrate speech-recognition dictionary support for additional regional and local dialects.
