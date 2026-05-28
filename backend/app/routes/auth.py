from fastapi import APIRouter
from app.schemas.user_schema import UserSignup, UserLogin
from app.utils.security import (
    hash_password,
    create_access_token
)

router = APIRouter()

@router.post("/signup")
def signup(user: UserSignup):

    hashed_password = hash_password(user.password)

    return {
        "message": "User created successfully",
        "email": user.email,
        "hashed_password": hashed_password
    }

@router.post("/login")
def login(user: UserLogin):

    token = create_access_token(
        data={"sub": user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }