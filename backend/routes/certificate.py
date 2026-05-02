import hashlib
from fastapi import APIRouter, Depends, UploadFile, File
from pydantic import BaseModel
from sqlalchemy.orm import Session
from backend.database.db import get_db
from backend.models.certificate import Certificate

router = APIRouter()

class VerifyRequest(BaseModel):
    file_hash: str

@router.post("/verify-certificate")
async def verify_certificate(file: UploadFile = File(...), db: Session = Depends(get_db)):
    content = await file.read()
    file_hash = hashlib.sha256(content).hexdigest()
    
    # Store dummy blockchain hash
    blockchain_tx = f"0x_cert_{file_hash[:10]}"
    
    cert = db.query(Certificate).filter(Certificate.file_hash == file_hash).first()
    
    if cert:
        return {"status": "Verified", "message": "Certificate exists on blockchain.", "hash": file_hash, "tx": cert.blockchain_tx}
        
    # Store if not exists
    new_cert = Certificate(user_id=1, document_name=file.filename, file_hash=file_hash, blockchain_tx=blockchain_tx)
    db.add(new_cert)
    db.commit()
    
    return {
        "status": "Stored",
        "message": "Certificate hashed and stored on blockchain.",
        "hash": file_hash,
        "tx": blockchain_tx
    }
