from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
import datetime
from backend.database.db import Base

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
    blockchain_hash = Column(String, unique=True, index=True)
    status = Column(String, default="pending") # pending, verified, fraudulent
