from sqlalchemy import Column, Integer, String, Float, Boolean
try:
    from backend.database.db import Base
except ImportError:
    from database.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String, default="Citizen") # Gov, Admin, Citizen
    trust_score = Column(Float, default=100.0)
    is_flagged = Column(Boolean, default=False)
    
    # Registration fields
    email = Column(String, nullable=True)
    full_name = Column(String, nullable=True)
    organization = Column(String, nullable=True)
    
    # ML features for beneficiary verification
    income = Column(Float, nullable=True)
    location = Column(String, nullable=True)
    transaction_frequency = Column(Integer, default=0)
    
    risk_score = Column(Float, nullable=True)
    risk_level = Column(String, nullable=True)
