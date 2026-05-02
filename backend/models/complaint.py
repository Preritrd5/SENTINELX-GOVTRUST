from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from datetime import datetime
try:
    from backend.database.db import Base
except ImportError:
    from database.db import Base

class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, index=True)
    description = Column(Text)
    status = Column(String, default="Pending") # Pending, In Progress, Resolved
    category = Column(String, default="General")
    created_at = Column(DateTime, default=datetime.utcnow)
