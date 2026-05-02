from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
try:
    from backend.database.db import get_db
    from backend.models.department import Department
except ImportError:
    from database.db import get_db
    from models.department import Department

router = APIRouter()

class DeptCreate(BaseModel):
    name: str
    description: str
    budget: float

@router.get("/")
def get_departments(db: Session = Depends(get_db)):
    depts = db.query(Department).all()
    return {"departments": [{"id": d.id, "name": d.name, "description": d.description, "budget": d.budget_allocated} for d in depts]}

@router.post("/")
def create_department(dept: DeptCreate, db: Session = Depends(get_db)):
    new_dept = Department(name=dept.name, description=dept.description, budget_allocated=dept.budget)
    db.add(new_dept)
    db.commit()
    db.refresh(new_dept)
    return {"status": "success", "department": {"id": new_dept.id, "name": new_dept.name}}
