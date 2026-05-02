from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
try:
    from backend.database.db import get_db
    from backend.models.user import User
except ImportError:
    from database.db import get_db
    from models.user import User

router = APIRouter()

@router.get("/")
def get_beneficiaries(db: Session = Depends(get_db)):
    users = db.query(User).filter(User.role == "Citizen").all()
    results = []
    for u in users:
        results.append({
            "id": f"BEN-{u.id:03d}",
            "name": u.full_name or u.username,
            "type": "General Welfare",
            "status": "Flagged" if u.is_flagged else "Active",
            "risk": u.risk_level or "Low"
        })
    return {"beneficiaries": results}

@router.post("/")
def add_beneficiary(name: str, db: Session = Depends(get_db)):
    # Placeholder for adding beneficiary
    return {"message": "Beneficiary added successfully"}
