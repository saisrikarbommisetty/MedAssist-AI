from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
import json

from .database import engine, Base, get_db
from . import models, schemas, crud
from .disease_data import DISEASES_METADATA, SYMPTOMS_LIST
from .ml.predict import predict_triage

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="MedAssist AI API",
    description="Emergency Triage & First Aid Assistant AI Backend",
    version="1.0.0"
)

# CORS configurations
origins = [
    "http://localhost:5173",      # Vite React default
    "http://127.0.0.1:5173",
    "http://localhost:3000",      # Alternative frontend port
    "*"                           # For production deployment flexibility
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "MedAssist AI API",
        "description": "Intelligent Emergency Triage & First Aid Assistant"
    }

@app.get("/api/symptoms", response_model=List[str])
def get_symptoms():
    """Get list of symptoms supported by the AI model."""
    return SYMPTOMS_LIST

@app.post("/api/triage", response_model=schemas.TriageResponse)
def perform_triage(request: schemas.TriageRequest, db: Session = Depends(get_db)):
    """
    Perform symptom triage using the trained Random Forest classifier.
    Predicts the condition, assesses severity, logs history, and appends first aid.
    """
    if not request.symptoms:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="At least one symptom must be provided for assessment."
        )
        
    try:
        # Run ML prediction
        disease, confidence = predict_triage(
            age=request.age,
            gender=request.gender,
            duration=request.duration,
            symptoms=request.symptoms
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Prediction engine error: {str(e)}"
        )
        
    # Retrieve metadata for the predicted disease
    meta = DISEASES_METADATA.get(disease)
    if not meta:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Clinical data not found for predicted disease: {disease}"
        )
        
    # Build complete response object
    response_data = schemas.TriageResponse(
        age=request.age,
        gender=request.gender,
        duration=request.duration,
        symptoms=request.symptoms,
        medical_history=request.medical_history,
        predicted_disease=disease,
        confidence=round(confidence, 4),
        severity=meta["severity"],
        recommended_department=meta["department"],
        first_aid=meta["first_aid"],
        possible_causes=meta["possible_causes"],
        suggested_next_action=meta["suggested_next_action"],
        emergency_warning=meta["emergency_warning"]
    )
    
    # Save assessment to SQLite database
    db_assessment = crud.create_assessment(db, response_data)
    response_data.id = db_assessment.id
    response_data.created_at = db_assessment.created_at
    
    return response_data

@app.get("/api/history", response_model=List[schemas.TriageResponse])
def get_history(db: Session = Depends(get_db)):
    """Fetch the recent assessment history."""
    db_history = crud.get_assessments(db)
    history = []
    
    for item in db_history:
        # Parse symptoms JSON array
        try:
            symptoms_list = json.loads(item.symptoms)
        except Exception:
            symptoms_list = []
            
        # Hydrate dynamic metadata
        meta = DISEASES_METADATA.get(item.predicted_disease, {
            "first_aid": ["Seek general medical guidance."],
            "possible_causes": ["Unknown / Undefined"],
            "suggested_next_action": "Consult a healthcare professional.",
            "emergency_warning": False
        })
        
        history.append(
            schemas.TriageResponse(
                id=item.id,
                age=item.age,
                gender=item.gender,
                duration=item.duration,
                symptoms=symptoms_list,
                medical_history=item.medical_history,
                predicted_disease=item.predicted_disease,
                confidence=item.confidence,
                severity=item.severity,
                recommended_department=item.recommended_department,
                first_aid=meta["first_aid"],
                possible_causes=meta["possible_causes"],
                suggested_next_action=meta["suggested_next_action"],
                emergency_warning=meta["emergency_warning"],
                created_at=item.created_at
            )
        )
        
    return history

@app.delete("/api/history/{id}")
def delete_history_item(id: int, db: Session = Depends(get_db)):
    """Delete a specific assessment from history."""
    success = crud.delete_assessment(db, id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Assessment history item with id {id} not found."
        )
    return {"message": "Assessment deleted successfully."}
