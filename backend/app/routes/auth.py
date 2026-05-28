from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

fake_db = {}

class User(BaseModel):
    username: str
    password: str

@router.post("/signup")
def signup(user: User):

    if user.username in fake_db:
        return {
            "message": "User already exists"
        }

    fake_db[user.username] = user.password

    return {
        "message": "Signup successful"
    }

@router.post("/login")
def login(user: User):

    if fake_db.get(user.username) != user.password:
        return {
            "message": "Invalid credentials"
        }

    return {
        "access_token": "securemind-token"
    }