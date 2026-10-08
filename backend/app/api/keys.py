from fastapi import APIRouter, HTTPException
from ..models.schemas import KeyGenerateRequest, KeyGenerateResponse
from ..services.key_generator import key_generator_service
from .system import record_activity

router = APIRouter(prefix="/key", tags=["Cryptographic Keys"])

@router.post("/generate", response_model=KeyGenerateResponse)
def generate_cryptographic_key(request: KeyGenerateRequest):
    """Derives a cryptographic key (128, 192, 256-bit) using quantum randomness and HKDF SHA-256."""
    try:
        result = key_generator_service.generate_key(key_size=request.key_size, source=request.source)
        
        # Log activity anonymously without logging secret key
        record_activity(
            action=f"{result['key_size']}-bit cryptographic key derived",
            detail=f"Source: {result['source']} | Fingerprint: {result['sha256_fingerprint'][:16]}..."
        )
        
        return KeyGenerateResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate key: {str(e)}")
