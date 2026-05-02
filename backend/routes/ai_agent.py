import os
from fastapi import APIRouter
from pydantic import BaseModel
import google.generativeai as genai

router = APIRouter()

class AIQuery(BaseModel):
    query_type: str # "fraud", "link", "general"
    context_data: str

@router.post("/ai-explain")
def ai_explain(req: AIQuery):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return {
            "explanation": "Gemini API Key is missing. Simulated AI response: Based on the data, the activity is considered anomalous due to deviations from typical citizen behavior patterns. Recommendation: Flag user and monitor transactions.",
            "recommendation": "Flag for manual review."
        }
        
    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel("gemini-pro")
        
        prompt = f"""
        You are SentinelX AI, a cybersecurity and digital trust agent for a government platform.
        Analyze the following context regarding a {req.query_type} and provide an explanation and recommended actions.
        
        Context: {req.context_data}
        
        Please format the output clearly in markdown.
        """
        
        response = model.generate_content(prompt)
        
        return {
            "explanation": response.text,
            "recommendation": "Follow AI guidelines presented above."
        }
    except Exception as e:
        return {
            "explanation": f"Gemini Engine error: {str(e)}. Simulated: Activity is suspicious.",
            "recommendation": "Review logs."
        }

