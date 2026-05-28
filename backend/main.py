from app.routes.chat import router as chat_router

from app.routes.upload import router as upload_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.auth import router as auth_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(chat_router)

@app.get("/")
def home():
    return {"message": "SecureMind AI Backend Running"}