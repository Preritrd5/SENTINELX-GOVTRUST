from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
try:
    from backend.database.db import get_db
    from backend.models.complaint import Complaint
except ImportError:
    from database.db import get_db
    from models.complaint import Complaint

router = APIRouter()

class ComplaintCreate(BaseModel):
    user_id: int
    title: str
    description: str
    category: str

@router.get("/{user_id}")
def get_complaints(user_id: int, db: Session = Depends(get_db)):
    comps = db.query(Complaint).filter(Complaint.user_id == user_id).all()
    return {"complaints": [{"id": c.id, "title": c.title, "status": c.status, "date": c.created_at.strftime("%Y-%m-%d")} for c in comps]}

@router.post("/")
def create_complaint(comp: ComplaintCreate, db: Session = Depends(get_db)):
    new_comp = Complaint(user_id=comp.user_id, title=comp.title, description=comp.description, category=comp.category)
    db.add(new_comp)
    db.commit()
    db.refresh(new_comp)
    return {"status": "success", "complaint": {"id": new_comp.id, "title": new_comp.title}}
