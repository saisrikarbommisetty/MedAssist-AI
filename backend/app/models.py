from sqlalchemy import Column, Integer, String, Float, DateTime
import datetime
from .database import Base

class Assessment(Base):
    __tablename__ = "assessments"

    id = Column(Integer, primary_key=True, index=True)
    age = Column(Integer, nullable=False)
    gender = Column(String, nullable=False)
    duration = Column(String, nullable=False)
    symptoms = Column(String, nullable=False)  # JSON-encoded array of symptoms
    medical_history = Column(String, nullable=True)
    predicted_disease = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    severity = Column(String, nullable=False)  # Green, Yellow, Red
    recommended_department = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
