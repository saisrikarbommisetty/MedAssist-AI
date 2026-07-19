from sqlalchemy.orm import Session
from . import models, schemas
import json

def get_assessments(db: Session, limit: int = 50):
    return db.query(models.Assessment).order_by(models.Assessment.created_at.desc()).limit(limit).all()

def create_assessment(db: Session, item: schemas.TriageResponse):
    db_item = models.Assessment(
        age=item.age,
        gender=item.gender,
        duration=item.duration,
        symptoms=json.dumps(item.symptoms),
        medical_history=item.medical_history,
        predicted_disease=item.predicted_disease,
        confidence=item.confidence,
        severity=item.severity,
        recommended_department=item.recommended_department
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_assessment(db: Session, assessment_id: int):
    db_item = db.query(models.Assessment).filter(models.Assessment.id == assessment_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
        return True
    return False
