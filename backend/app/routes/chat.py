from fastapi import APIRouter
from pydantic import BaseModel

from app.services.rag_service import ask_question

router = APIRouter()

class ChatRequest(BaseModel):
    question: str

@router.post("/chat")

def chat_with_docs(data: ChatRequest):

    answer = ask_question(data.question)

    return {
        "question": data.question,
        "answer": answer
    }