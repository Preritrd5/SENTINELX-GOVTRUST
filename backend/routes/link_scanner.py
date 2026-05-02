from fastapi import APIRouter
from pydantic import BaseModel
import re

router = APIRouter()

class LinkRequest(BaseModel):
    url: str

from langchain_google_genai import ChatGoogleGenerativeAI
import os

@router.post("/scan-link")
def scan_link(req: LinkRequest):
    url = req.url
    api_key = os.getenv("GEMINI_API_KEY")
    
    # basic checks
    suspicious_keywords = ['free-money', 'verify-account', 'secure-login', 'update-billing']
    is_suspicious = any(kw in url for kw in suspicious_keywords)
    has_ip = re.search(r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', url)
    
    status = "SAFE"
    explanation = "No malicious patterns detected."
    ai_analysis = None

    if has_ip or is_suspicious or ("gov" not in url and "https" not in url):
        status = "FRAUD" if (has_ip or is_suspicious) else "SUSPICIOUS"
        
        # Trigger AI Vector for Deep Analysis
        if api_key:
            try:
                llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=api_key)
                prompt = f"Analyze this URL for potential phishing or fraud: {url}. Explain the psychological tactics or technical risks involved in 2 sentences."
                response = llm.invoke(prompt)
                ai_analysis = response.content
            except:
                ai_analysis = "AI Analysis unavailable. URL exhibits classic phishing patterns."

    return {
        "url": url,
        "status": status,
        "explanation": explanation if not ai_analysis else ai_analysis,
        "vector": "NEURAL_LINK_SCAN" if ai_analysis else "HEURISTIC_SCAN",
        "threat_intel": {
            "is_phishing_likely": status == "FRAUD",
            "domain_trust": 10 if "gov" in url else 4
        }
    }
