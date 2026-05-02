from sqlalchemy import Column, Integer, String, DateTime
import datetime
from backend.database.db import Base

class Certificate(Base):
    __tablename__ = "certificates"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, index=True)
    document_name = Column(String)
    file_hash = Column(String, unique=True, index=True)
    blockchain_tx = Column(String, nullable=True)
    issued_at = Column(DateTime, default=datetime.datetime.utcnow)
