import os
import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib

# Import diseases metadata to know symptoms
import sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from disease_data import DISEASES_METADATA, SYMPTOMS_LIST

def generate_synthetic_data(num_samples_per_disease=250):
    data = []
    
    # Random seed for reproducibility
    np.random.seed(42)
    
    for disease, meta in DISEASES_METADATA.items():
        typical = meta["typical_symptoms"]
        severity = meta["severity"]
        
        for _ in range(num_samples_per_disease):
            patient = {}
            
            # Age distributions depending on disease
            if disease in ["Heart Attack", "Stroke"]:
                patient["age"] = int(np.clip(np.random.normal(63, 11), 35, 95))
            elif disease in ["Diabetic Ketoacidosis"]:
                patient["age"] = int(np.clip(np.random.normal(26, 12), 5, 80))
            elif disease in ["Common Cold", "Influenza", "Food Poisoning", "Gastroenteritis"]:
                patient["age"] = int(np.clip(np.random.normal(32, 18), 1, 90))
            elif disease in ["Severe Anaphylaxis"]:
                patient["age"] = int(np.clip(np.random.normal(25, 14), 1, 75))
            else:
                patient["age"] = int(np.clip(np.random.normal(45, 15), 10, 85))
                
            # Gender distribution (0: Male, 1: Female)
            patient["gender"] = np.random.choice([0, 1])
            
            # Duration (in days)
            if severity == "Red":
                patient["duration_days"] = round(np.random.uniform(0.05, 1.0), 2)  # very sudden
            elif severity == "Yellow":
                patient["duration_days"] = round(np.random.uniform(0.5, 4.0), 2)
            else:  # Green
                patient["duration_days"] = round(np.random.uniform(1.0, 7.0), 2)
                
            # Set symptoms
            for symptom in SYMPTOMS_LIST:
                if symptom in typical:
                    # High probability (75% - 95%) of showing typical symptoms
                    patient[symptom] = 1 if np.random.rand() < np.random.uniform(0.75, 0.95) else 0
                else:
                    # Low probability (1% - 5%) of showing unrelated symptoms
                    patient[symptom] = 1 if np.random.rand() < np.random.uniform(0.01, 0.05) else 0
                    
            patient["disease"] = disease
            data.append(patient)
            
    return pd.DataFrame(data)

def main():
    print("Generating synthetic patient triage records...")
    df = generate_synthetic_data()
    print(f"Generated dataset with {df.shape[0]} samples and {df.shape[1] - 1} features.")
    
    # Feature columns (age, gender, duration, + all binary symptoms)
    feature_cols = ["age", "gender", "duration_days"] + SYMPTOMS_LIST
    
    X = df[feature_cols]
    y = df["disease"]
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest Classifier...")
    # Initialize Random Forest
    rf = RandomForestClassifier(n_estimators=100, max_depth=12, random_state=42)
    rf.fit(X_train, y_train)
    
    # Evaluate
    y_pred = rf.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    print(f"Model Training complete. Validation Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Ensure save directory exists
    save_dir = os.path.dirname(os.path.abspath(__file__))
    os.makedirs(save_dir, exist_ok=True)
    
    model_path = os.path.join(save_dir, "model.joblib")
    metadata_path = os.path.join(save_dir, "metadata.json")
    
    print(f"Saving model to {model_path}...")
    joblib.dump(rf, model_path)
    
    metadata = {
        "features": feature_cols,
        "symptoms": SYMPTOMS_LIST,
        "accuracy": float(accuracy),
        "classes": list(rf.classes_)
    }
    
    print(f"Saving metadata to {metadata_path}...")
    with open(metadata_path, "w") as f:
        json.dump(metadata, f, indent=4)
        
    print("ML training pipeline complete!")

if __name__ == "__main__":
    main()
