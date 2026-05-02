from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import sys
import os
from dotenv import load_dotenv

# Ensure backend package can be imported from parent directory
current_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(current_dir)
if parent_dir not in sys.path:
    sys.path.append(parent_dir)

# Load .env file
load_dotenv(os.path.join(current_dir, ".env"))

try:
    from backend.database.db import engine, Base
    from backend.models import user, transaction, certificate, logs, department, complaint
except ImportError:
    # Fallback for when running directly from backend dir
    from database.db import engine, Base
    from models import user, transaction, certificate, logs, department, complaint

# Initialize DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="SentinelX SecureChain GovTrust API")

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "SentinelX API is running", "version": "1.0.0"}

try:
    from backend.routes import auth, verification, fraud, link_scanner, fuzz, blockchain, certificate, ai_agent, beneficiaries, departments, complaints, monitoring, users
except ImportError:
    from routes import auth, verification, fraud, link_scanner, fuzz, blockchain, certificate, ai_agent, beneficiaries, departments, complaints, monitoring, users

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(verification.router, prefix="/api/verification", tags=["Verification"])
app.include_router(fraud.router, prefix="/api/fraud", tags=["Fraud"])
app.include_router(link_scanner.router, prefix="/api/link", tags=["Link Scanner"])
app.include_router(fuzz.router, prefix="/api/fuzz", tags=["Cyber Defense"])
app.include_router(blockchain.router, prefix="/api/blockchain", tags=["Blockchain"])
app.include_router(certificate.router, prefix="/api/certificate", tags=["Certificate"])
app.include_router(ai_agent.router, prefix="/api/ai", tags=["AI Insights"])
app.include_router(beneficiaries.router, prefix="/api/beneficiaries", tags=["Beneficiaries"])
app.include_router(departments.router, prefix="/api/departments", tags=["Departments"])
app.include_router(complaints.router, prefix="/api/complaints", tags=["Complaints"])
app.include_router(monitoring.router, prefix="/api/system", tags=["System Monitoring"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
