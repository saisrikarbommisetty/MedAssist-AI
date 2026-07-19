import os
import json
import joblib
import numpy as np
import pandas as pd

# Load trained model and features
ML_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(ML_DIR, "model.joblib")
METADATA_PATH = os.path.join(ML_DIR, "metadata.json")

model = None
metadata = None

def load_model():
    global model, metadata
    if model is None or metadata is None:
        if not os.path.exists(MODEL_PATH) or not os.path.exists(METADATA_PATH):
            raise FileNotFoundError(
                "Trained model not found. Please run the model training script (train.py) first."
            )
        model = joblib.load(MODEL_PATH)
        with open(METADATA_PATH, "r") as f:
            metadata = json.load(f)

def predict_triage(age: int, gender: str, duration: str, symptoms: list):
    """
    Predict disease based on symptoms and demographics.
    gender: 'Male' or 'Female' (or others, mapped to binary)
    duration: e.g. 'Less than 24 hours', '1-3 days', '4-7 days', 'More than a week'
    symptoms: list of symptom names matching the features
    """
    load_model()
    
    # Map gender to binary
    gender_bin = 0 if gender.lower() == "male" else 1
    
    # Map duration string to numeric value
    duration_days = 0.5
    duration_lower = duration.lower()
    if "less than 24 hours" in duration_lower:
        duration_days = 0.5
    elif "1-3 days" in duration_lower:
        duration_days = 2.0
    elif "4-7 days" in duration_lower:
        duration_days = 5.5
    elif "more than a week" in duration_lower or "week" in duration_lower:
        duration_days = 10.0
        
    features = metadata["features"]
    symptoms_set = set(symptoms)
    
    # Construct input vector
    input_vector = []
    for col in features:
        if col == "age":
            input_vector.append(age)
        elif col == "gender":
            input_vector.append(gender_bin)
        elif col == "duration_days":
            input_vector.append(duration_days)
        else:
            # It's a symptom
            input_vector.append(1 if col in symptoms_set else 0)
            
    # Use a named Pandas DataFrame to maintain feature names and suppress warnings
    input_df = pd.DataFrame([input_vector], columns=features)
    
    # Predict probabilities
    probs = model.predict_proba(input_df)[0]
    classes = model.classes_
    
    # Get highest probability index
    max_idx = np.argmax(probs)
    predicted_disease = classes[max_idx]
    confidence = float(probs[max_idx])
    
    return predicted_disease, confidence
