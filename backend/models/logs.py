from sqlalchemy import Column, Integer, String, DateTime, Boolean
import datetime
try:
    from backend.database.db import Base
except ImportError:
    from database.db import Base

class SystemLog(Base):
    __tablename__ = "system_logs"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String, index=True) # ATTACK, FRAUD, INFO
    endpoint = Column(String)
    ip_address = Column(String, nullable=True)
    details = Column(String)
    action_taken = Column(String) # BLOCKED, LOGGED
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
