from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
try:
    from backend.database.db import get_db
    from backend.services.ml_model import get_risk_score
    from backend.models.user import User
    from backend.routes.blockchain import allocate_fund, AllocationRequest
except ImportError:
    from database.db import get_db
    from services.ml_model import get_risk_score
    from models.user import User
    from routes.blockchain import allocate_fund, AllocationRequest

router = APIRouter()

class VerificationRequest(BaseModel):
    user_id: int
    income: float
    location: str
    transaction_frequency: int

@router.post("/verify-user")
def verify_user(req: VerificationRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == req.user_id).first()
    if not user:
        # For demo purposes, we will just create the user on the fly if not exists
        user = User(id=req.user_id, username=f"user_{req.user_id}")
        db.add(user)
        db.commit()
        db.refresh(user)

    result = get_risk_score(req.income, req.location, req.transaction_frequency)
    
    user.income = req.income
    user.location = req.location
    user.transaction_frequency = req.transaction_frequency
    user.risk_score = result["risk_score"]
    user.risk_level = result["risk_level"]
    
    # Adjust trust score
    if result["risk_level"] == "HIGH":
        user.trust_score = max(0, user.trust_score - 30)
        user.is_flagged = True
    elif result["risk_level"] == "LOW":
        user.trust_score = min(100, user.trust_score + 10)
        
    db.commit()

    # If risk is LOW, auto-allocate a small verification grant on the blockchain
    blockchain_hash = None
    if result["risk_level"] == "LOW":
        try:
            # We use a dummy address for demo if user doesn't have one
            beneficiary_addr = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" # Hardhat Account #1
            alloc_req = AllocationRequest(
                beneficiary=beneficiary_addr,
                amount=req.income / 1000, # Grant is 0.1% of income
                department="Social Welfare"
            )
            # Call the allocate_fund logic (directly calling the function we exported)
            # Wait, I need to import it properly. 
            res = allocate_fund(alloc_req, db)
            blockchain_hash = res.get("hash")
        except Exception as e:
            print("Blockchain auto-allocation failed:", e)

    # Simulate Neural Liveness Vector
    liveness_status = "VERIFIED" if req.transaction_frequency < 50 else "FAILED"
    liveness_confidence = 0.98 if liveness_status == "VERIFIED" else 0.42

    return {
        "user_id": user.id,
        "risk_score": result["risk_score"],
        "risk_level": result["risk_level"],
        "trust_score": user.trust_score,
        "is_flagged": user.is_flagged,
        "blockchain_hash": blockchain_hash,
        "verification_vectors": {
            "financial_risk": result["risk_level"],
            "biometric_liveness": liveness_status,
            "liveness_confidence": liveness_confidence
        },
        "system_decision": "APPROVED" if result["risk_level"] == "LOW" and liveness_status == "VERIFIED" else "REJECTED"
    }
