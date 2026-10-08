import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "QuantumKeyGen"
    PROJECT_SUBTITLE: str = "Quantum Randomness for Trusted Cryptographic Keys"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://localhost:8000",
        "*"
    ]

settings = Settings()
