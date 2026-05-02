from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
try:
    from backend.database.db import get_db
    from backend.models.user import User
except ImportError:
    from database.db import get_db
    from models.user import User

router = APIRouter()

@router.get("/detect-fraud")
def detect_fraud(db: Session = Depends(get_db)):
    flagged_users = db.query(User).filter(User.is_flagged == True).all()
    
    results = []
    for u in flagged_users:
        # Simulate different fraud vectors
        patterns = []
        if u.transaction_frequency and u.transaction_frequency > 15:
            patterns.append("Velocity Attack (Smurfing)")
        if u.income and u.income < 10000 and u.transaction_frequency > 5:
            patterns.append("Income-to-Spend Disparity")
        if not patterns:
            patterns.append("Anomalous Risk Score")

        results.append({
            "user_id": u.id,
            "username": u.username,
            "risk_score": u.risk_score,
            "patterns": patterns,
            "threat_level": "CRITICAL" if len(patterns) > 1 else "ELEVATED",
            "action": "AUTO_FREEZE" if "Velocity" in str(patterns) else "MANUAL_AUDIT"
        })
        
    return {
        "analysis_mode": "NEURAL_CLUSTER_V4",
        "flagged_users": results,
        "network_health": "DEGRADED" if len(results) > 5 else "OPTIMAL"
    }
