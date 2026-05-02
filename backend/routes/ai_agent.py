import os
from fastapi import APIRouter
from pydantic import BaseModel
try:
    from langchain_google_genai import ChatGoogleGenerativeAI
except ImportError:
    # We will use a mock or fallback if the library isn't installed
    ChatGoogleGenerativeAI = None
from langchain_core.prompts import PromptTemplate

router = APIRouter()

class AIQuery(BaseModel):
    query_type: str # "fraud", "link", "general"
    context_data: str

@router.post("/ai-explain")
def ai_explain(req: AIQuery):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or not ChatGoogleGenerativeAI:
        return {
            "explanation": "Gemini API Key is missing or library not installed. Simulated AI response: Based on the data, the activity is considered anomalous due to deviations from typical citizen behavior patterns. Recommendation: Flag user and monitor transactions.",
            "recommendation": "Flag for manual review."
        }
        
    try:
        llm = ChatGoogleGenerativeAI(
            model="gemini-pro",
            google_api_key=api_key,
            temperature=0.2
        )
        
        template = """
        You are SentinelX AI, a cybersecurity and digital trust agent for a government platform.
        Analyze the following context regarding a {query_type} and provide an explanation and recommended actions.
        
        Context: {context_data}
        
        Please format the output clearly in markdown.
        """
        prompt = PromptTemplate(input_variables=["query_type", "context_data"], template=template)
        
        chain = prompt | llm
        response = chain.invoke({"query_type": req.query_type, "context_data": req.context_data})
        
        return {
            "explanation": response.content,
            "recommendation": "Follow AI guidelines presented above."
        }
    except Exception as e:
        return {
            "explanation": f"Gemini Engine error: {str(e)}. Simulated: Activity is suspicious.",
            "recommendation": "Review logs."
        }
