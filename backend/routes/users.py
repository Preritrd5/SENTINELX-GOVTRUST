from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
try:
    from backend.database.db import get_db
    from backend.models.user import User
except ImportError:
    from database.db import get_db
    from models.user import User

router = APIRouter()

@router.get("/")
def get_all_users(db: Session = Depends(get_db)):
    users = db.query(User).all()
    results = []
    for u in users:
        results.append({
            "id": u.id,
            "username": u.username,
            "role": u.role,
            "status": "Active",
            "trust_score": u.trust_score
        })
    return {"users": results}
