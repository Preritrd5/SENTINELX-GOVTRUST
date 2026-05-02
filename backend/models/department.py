from sqlalchemy import Column, Integer, String, Float
try:
    from backend.database.db import Base
except ImportError:
    from database.db import Base

class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(String, nullable=True)
    budget_allocated = Column(Float, default=0.0)
    budget_spent = Column(Float, default=0.0)
