from fastapi import APIRouter, HTTPException
from ..models.schemas import SecurityDemoRequest, SecurityDemoResponse
from ..services.security_demo import security_demo_service
from .system import record_activity

router = APIRouter(prefix="/security", tags=["Security Lab"])

@router.post("/demo", response_model=SecurityDemoResponse)
def run_security_demo(request: SecurityDemoRequest):
    """Runs interactive educational security demonstration showing PRNG seed cracking vs QRNG key security."""
    try:
        if request.demo_type == "prng_compromise":
            result = security_demo_service.run_prng_compromise_demo(
                secret_message=request.secret_message,
                weak_seed=request.weak_seed or 1337
            )
            record_activity(
                action="Security Lab: Weak PRNG key compromise simulated",
                detail=f"Seed {result['seed_used']} recovered in {result['attempts_required']} attempts"
            )
        else:
            result = security_demo_service.run_qrng_secure_demo(
                secret_message=request.secret_message
            )
            record_activity(
                action="Security Lab: Quantum key security test executed",
                detail="Key unbreakable via seed prediction (2^256 search space)"
            )
            
        return SecurityDemoResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to execute security demo: {str(e)}")
