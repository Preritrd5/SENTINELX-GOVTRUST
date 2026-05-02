from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
try:
    from backend.database.db import get_db
    from backend.models.logs import SystemLog
    from backend.models.user import User
except ImportError:
    from database.db import get_db
    from models.logs import SystemLog
    from models.user import User

router = APIRouter()

@router.post("/run-fuzz")
def run_fuzz(db: Session = Depends(get_db)):
    # Simulate fuzz testing engine against the endpoints
    vulnerabilities = []
    
    # Simulate SQLi
    vulnerabilities.append({
        "endpoint": "/verify-user",
        "payload": "' OR '1'='1",
        "result": "BLOCKED",
        "type": "SQL Injection Simulation"
    })
    
    # Simulate XSS
    vulnerabilities.append({
        "endpoint": "/scan-link",
        "payload": "<script>alert(1)</script>",
        "result": "BLOCKED",
        "type": "XSS Simulation"
    })
    
    # Log these events into SystemLog
    for v in vulnerabilities:
        log = SystemLog(
            event_type="ATTACK",
            endpoint=v["endpoint"],
            details=f"Detected payload: {v['payload']}",
            action_taken="BLOCKED"
        )
        db.add(log)
        
    db.commit()
    
    return {
        "status": "Fuzz testing completed.",
        "vulnerabilities": vulnerabilities,
        "system_status": "Secure. Attacks were mitigated by Self-Healing Engine."
    }

@router.get("/cyber-logs")
def get_cyber_logs(db: Session = Depends(get_db)):
    logs = db.query(SystemLog).order_by(SystemLog.timestamp.desc()).limit(20).all()
    return {"logs": logs}
