from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from datetime import datetime, timedelta
from jose import JWTError, jwt
import bcrypt
from sqlalchemy.orm import Session
try:
    from backend.database.db import get_db
    from backend.models.logs import SystemLog
    from backend.models.user import User
except ImportError:
    from database.db import get_db
    from models.logs import SystemLog
    from models.user import User
import os

router = APIRouter()

SECRET_KEY = os.getenv("SECRET_KEY", "sentinelx_secret_key_govtrust")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Passlib removed due to bcrypt wrap bug

from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    organization: Optional[str] = None
    role: str = "Citizen"

class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    user_id: int
    username: str
    full_name: Optional[str] = None

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register", response_model=Token)
def register(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
        
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    new_user = User(
        username=user.username, 
        hashed_password=hashed_password, 
        role=user.role,
        email=user.email,
        full_name=user.full_name,
        organization=user.organization
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token = create_access_token(data={"sub": new_user.username, "role": new_user.role})
    return {"access_token": access_token, "token_type": "bearer", "role": new_user.role, "user_id": new_user.id, "username": new_user.username, "full_name": new_user.full_name}

@router.post("/login", response_model=Token)
def login(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not bcrypt.checkpw(user.password.encode('utf-8'), db_user.hashed_password.encode('utf-8')):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
        
    access_token = create_access_token(data={"sub": db_user.username, "role": db_user.role})
    return {"access_token": access_token, "token_type": "bearer", "role": db_user.role, "user_id": db_user.id, "username": db_user.username, "full_name": db_user.full_name}
