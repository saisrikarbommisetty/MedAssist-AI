from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class TriageRequest(BaseModel):
    age: int
    gender: str
    duration: str
    symptoms: List[str]
    medical_history: Optional[str] = None

class TriageResponse(BaseModel):
    id: Optional[int] = None
    age: int
    gender: str
    duration: str
    symptoms: List[str]
    medical_history: Optional[str] = None
    predicted_disease: str
    confidence: float
    severity: str
    recommended_department: str
    first_aid: List[str]
    possible_causes: List[str]
    suggested_next_action: str
    emergency_warning: bool
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
