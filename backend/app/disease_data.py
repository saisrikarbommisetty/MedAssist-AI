DISEASES_METADATA = {
    "Heart Attack": {
        "severity": "Red",
        "department": "Cardiology / Emergency Department",
        "first_aid": [
            "Sit the person down and keep them calm.",
            "Loosen any tight clothing.",
            "Call emergency services (e.g., 911 / 112) immediately.",
            "If the person is fully conscious and not allergic, have them chew an aspirin (325mg) if available.",
            "Do not let them walk, eat, or drink.",
            "Be prepared to start CPR if they become unconscious and stop breathing."
        ],
        "possible_causes": [
            "Coronary artery disease (blockage of blood flow to the heart muscle).",
            "Severe coronary spasm.",
            "Spontaneous coronary artery dissection."
        ],
        "suggested_next_action": "Call local emergency services immediately. Do not attempt to drive to the hospital yourself.",
        "emergency_warning": True,
        "typical_symptoms": ["Chest pain", "Shortness of breath", "Left arm pain", "Jaw pain", "Sweating", "Nausea"]
    },
    "Stroke": {
        "severity": "Red",
        "department": "Neurology / Emergency Department",
        "first_aid": [
            "Call emergency services (911 / 112) immediately.",
            "Note the exact time symptoms first started.",
            "Keep the patient calm and lying down on their side (recovery position) if they feel sick.",
            "Do not give them anything to eat or drink (they may choke).",
            "Monitor their breathing and consciousness constantly."
        ],
        "possible_causes": [
            "Ischemic stroke (blood clot blocking blood flow to the brain).",
            "Hemorrhagic stroke (ruptured blood vessel in the brain).",
            "Transient Ischemic Attack (TIA - temporary blockage)."
        ],
        "suggested_next_action": "Seek immediate emergency medical care. Time is critical (remember FAST: Face, Arm, Speech, Time).",
        "emergency_warning": True,
        "typical_symptoms": ["Facial droop", "Arm weakness", "Speech difficulty", "Sudden numbness", "Confusion", "Vision loss"]
    },
    "Severe Anaphylaxis": {
        "severity": "Red",
        "department": "Emergency Department / Allergy & Immunology",
        "first_aid": [
            "Administer an epinephrine auto-injector (EpiPen) into the outer thigh immediately if available.",
            "Call emergency services immediately.",
            "Have the person lie flat on their back. If they are having trouble breathing, sit them up.",
            "Loosen tight clothing and cover them with a blanket.",
            "Do not give them anything by mouth if they have swallowing difficulties."
        ],
        "possible_causes": [
            "Severe allergic reaction to foods (nuts, shellfish, etc.), medications, insect stings, or latex."
        ],
        "suggested_next_action": "Administer epinephrine if available and call emergency services immediately, even if symptoms seem to improve.",
        "emergency_warning": True,
        "typical_symptoms": ["Difficulty breathing", "Swelling of throat/tongue", "Hives", "Dizziness", "Weak pulse", "Vomiting"]
    },
    "Asthma Attack": {
        "severity": "Yellow",  # Can escalate to Red
        "department": "Pulmonology / Emergency Department",
        "first_aid": [
            "Sit the person upright. Do not let them lie down.",
            "Help them take 2-6 puffs of their rescue inhaler (usually blue, e.g., Albuterol).",
            "Encourage slow, deep breathing.",
            "If symptoms do not improve after 5-10 minutes, repeat the inhaler and call emergency services if severe."
        ],
        "possible_causes": [
            "Exposure to asthma triggers (pollen, dust mites, smoke, cold air).",
            "Respiratory infections.",
            "Physical exertion."
        ],
        "suggested_next_action": "Use rescue inhaler. If breathing does not ease, or if speaking is difficult, seek immediate emergency care.",
        "emergency_warning": True,
        "typical_symptoms": ["Wheezing", "Coughing", "Shortness of breath", "Chest tightness", "Difficulty breathing"]
    },
    "Appendicitis": {
        "severity": "Yellow",  # Can escalate to Red
        "department": "General Surgery / Emergency Department",
        "first_aid": [
            "Do not eat, drink, or use laxatives/painkillers (they can mask symptoms or cause rupture).",
            "Do not apply heating pads to the abdomen.",
            "Rest quietly in a comfortable position.",
            "Seek immediate medical attention at an emergency clinic or hospital."
        ],
        "possible_causes": [
            "Obstruction of the appendix lumen (by stool, foreign bodies, or infection).",
            "Bacterial or viral infection in the digestive tract leading to swollen lymph nodes."
        ],
        "suggested_next_action": "Go to the nearest emergency department for evaluation and possible surgical removal.",
        "emergency_warning": True,
        "typical_symptoms": ["Right lower quadrant abdominal pain", "Fever", "Nausea", "Vomiting", "Loss of appetite"]
    },
    "Severe Dehydration": {
        "severity": "Yellow",
        "department": "General Medicine / Internal Medicine",
        "first_aid": [
            "Sip small amounts of water, clear broths, or Oral Rehydration Salts (ORS) slowly.",
            "Rest in a cool, shaded environment.",
            "Avoid caffeinated or sugary beverages.",
            "If the person is confused, lethargic, or unable to drink, seek immediate medical care for IV fluids."
        ],
        "possible_causes": [
            "Prolonged vomiting or diarrhea.",
            "Excessive sweating due to heat exposure or high fever.",
            "Inadequate fluid intake."
        ],
        "suggested_next_action": "Rehydrate slowly with ORS. Visit an urgent care clinic if oral rehydration fails or vomiting persists.",
        "emergency_warning": False,
        "typical_symptoms": ["Extreme thirst", "Dry mouth", "Little to no urination", "Dark urine", "Dizziness", "Confusion"]
    },
    "Migraine": {
        "severity": "Yellow",
        "department": "Neurology / Primary Care",
        "first_aid": [
            "Rest in a dark, quiet, well-ventilated room.",
            "Apply a cold compress or ice pack to the forehead or back of the neck.",
            "Drink plenty of water.",
            "Take prescribed migraine abortive medication or over-the-counter pain relievers."
        ],
        "possible_causes": [
            "Neurological disruptions (changes in the brainstem, trigeminal nerve).",
            "Triggers like stress, specific foods, weather shifts, or hormonal changes."
        ],
        "suggested_next_action": "Rest and take medication. Consult a doctor if this is your first severe headache or if symptoms differ from normal.",
        "emergency_warning": False,
        "typical_symptoms": ["Throbbing headache", "Sensitivity to light/sound", "Nausea", "Visual aura", "Dizziness"]
    },
    "Common Cold": {
        "severity": "Green",
        "department": "General Medicine / Family Medicine",
        "first_aid": [
            "Get plenty of rest.",
            "Stay hydrated by drinking water, warm tea, or clear broths.",
            "Gargle with warm salt water for throat relief.",
            "Use over-the-counter saline nasal sprays or decongestants if needed."
        ],
        "possible_causes": [
            "Rhinovirus or other mild viral upper respiratory infections."
        ],
        "suggested_next_action": "Rest at home. Symptoms should resolve in 7-10 days. Consult a GP if fever persists or symptoms worsen.",
        "emergency_warning": False,
        "typical_symptoms": ["Runny nose", "Sneezing", "Mild cough", "Sore throat", "Low-grade fever"]
    },
    "Gastroenteritis": {
        "severity": "Green",  # Can escalate to Yellow
        "department": "General Medicine / Gastroenterology",
        "first_aid": [
            "Avoid solid food for a few hours to let the stomach settle.",
            "Sip water, diluted juice, or ORS to prevent dehydration.",
            "Gradually introduce bland foods (toast, rice, bananas, applesauce).",
            "Avoid dairy, caffeine, alcohol, and fatty foods."
        ],
        "possible_causes": [
            "Viral infection (e.g., Norovirus, Rotavirus).",
            "Bacterial infection (food poisoning).",
            "Parasitic infection."
        ],
        "suggested_next_action": "Monitor hydration. See a doctor if you cannot keep fluids down for 24 hours, see blood in stool, or have a high fever.",
        "emergency_warning": False,
        "typical_symptoms": ["Watery diarrhea", "Stomach cramps", "Nausea", "Vomiting", "Fever"]
    },
    "Diabetic Ketoacidosis": {
        "severity": "Red",
        "department": "Endocrinology / Emergency Department",
        "first_aid": [
            "Check blood sugar levels immediately using a glucometer.",
            "Check for urine ketones if test strips are available.",
            "Call emergency services immediately.",
            "If conscious and able to swallow, drink water. Do NOT give insulin without medical advice unless familiar with correction doses.",
            "Keep the patient warm and monitor breathing."
        ],
        "possible_causes": [
            "Lack of adequate insulin in diabetic patients (often type 1).",
            "Infection, illness, or missed insulin doses triggering stress hormones."
        ],
        "suggested_next_action": "Seek immediate emergency hospital care. This is a life-threatening complication of diabetes.",
        "emergency_warning": True,
        "typical_symptoms": ["Fruity breath", "Extreme thirst", "Frequent urination", "Nausea", "Vomiting", "Confusion", "High blood sugar"]
    },
    "Pneumonia": {
        "severity": "Yellow",
        "department": "Pulmonology / Internal Medicine",
        "first_aid": [
            "Rest in bed and stay well hydrated.",
            "Take fever reducers (like Acetaminophen or Ibuprofen) as directed.",
            "Use a humidifier or inhale steam to loosen chest congestion.",
            "Avoid smoking and exposure to secondhand smoke.",
            "Consult a physician for prescription antibiotic or antiviral treatment."
        ],
        "possible_causes": [
            "Bacterial infection (e.g., Streptococcus pneumoniae).",
            "Viral infection (Influenza, COVID-19).",
            "Fungal infection (less common)."
        ],
        "suggested_next_action": "Schedule an urgent doctor's visit. Antibiotics or other medications are usually required to resolve the infection.",
        "emergency_warning": False,
        "typical_symptoms": ["Productive cough (mucus)", "Fever", "Chills", "Chest pain", "Shortness of breath"]
    },
    "Urinary Tract Infection": {
        "severity": "Green",  # Can escalate to Yellow
        "department": "General Medicine / Urology",
        "first_aid": [
            "Drink plenty of water to help flush out bacteria.",
            "Avoid caffeine, alcohol, and spicy foods which can irritate the bladder.",
            "Apply a warm heating pad to the lower abdomen for comfort.",
            "Seek medical attention for urine tests and antibiotic prescription."
        ],
        "possible_causes": [
            "Bacterial entry into the urinary tract (most commonly Escherichia coli)."
        ],
        "suggested_next_action": "Visit a clinic for a simple urine test. UTIs require antibiotics to prevent kidney complications.",
        "emergency_warning": False,
        "typical_symptoms": ["Burning sensation during urination", "Frequent urination", "Cloudy/bloody urine", "Pelvic pain"]
    },
    "Food Poisoning": {
        "severity": "Green",
        "department": "General Medicine / Family Medicine",
        "first_aid": [
            "Drink clear fluids (water, ORS, clear broths) in small, frequent sips.",
            "Avoid eating until vomiting stops, then start with bland foods.",
            "Do not take anti-diarrheal medications without a doctor's advice (they can prolong infection).",
            "Rest."
        ],
        "possible_causes": [
            "Ingestion of food contaminated with bacteria (Salmonella, E. coli), viruses, or toxins."
        ],
        "suggested_next_action": "Monitor hydration at home. Consult a physician if vomiting lasts >24 hours, diarrhea lasts >3 days, or high fever occurs.",
        "emergency_warning": False,
        "typical_symptoms": ["Vomiting", "Watery diarrhea", "Stomach cramps", "Fever", "Nausea"]
    },
    "Influenza": {
        "severity": "Green",  # Can be Yellow for vulnerable groups
        "department": "General Medicine / Family Medicine",
        "first_aid": [
            "Rest at home and isolate to protect others.",
            "Drink water, broth, or electrolyte drinks.",
            "Take over-the-counter pain and fever reducers (Acetaminophen/Ibuprofen).",
            "Wash hands frequently and use tissues when coughing or sneezing."
        ],
        "possible_causes": [
            "Infection with Influenza viruses (A or B)."
        ],
        "suggested_next_action": "Rest at home. High-risk individuals (elderly, infants, pregnant) should consult a doctor within 48 hours for antiviral options.",
        "emergency_warning": False,
        "typical_symptoms": ["High fever", "Muscle aches", "Headache", "Fatigue", "Dry cough", "Sore throat"]
    },
    "Heat Stroke": {
        "severity": "Red",
        "department": "Emergency Department",
        "first_aid": [
            "Call emergency services (911 / 112) immediately.",
            "Move the person to a cool, shaded, or air-conditioned area.",
            "Cool the person rapidly: spray with cool water, fan them, or apply ice packs to the neck, armpits, and groin.",
            "Do NOT give them anything to drink if they are confused or unconscious."
        ],
        "possible_causes": [
            "Prolonged exposure to high temperatures and humidity combined with physical exertion.",
            "Failure of the body's heat-regulating systems."
        ],
        "suggested_next_action": "Treat as a medical emergency. Heat stroke can cause permanent organ damage or death if untreated.",
        "emergency_warning": True,
        "typical_symptoms": ["High body temperature (>103°F)", "Hot/dry skin (no sweating)", "Rapid pulse", "Headache", "Dizziness", "Confusion"]
    }
}

# Compile unique symptoms list dynamically
SYMPTOMS_LIST = sorted(list(set([
    symptom for data in DISEASES_METADATA.values() for symptom in data["typical_symptoms"]
])))
