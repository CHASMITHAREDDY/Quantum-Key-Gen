from fastapi import APIRouter, HTTPException
from ..models.schemas import QuantumGenerateRequest, QuantumGenerateResponse
from ..services.quantum_rng import rng_engine, HAS_QISKIT, QISKIT_ERROR

router = APIRouter(prefix="/quantum", tags=["Quantum RNG"])

@router.get("/status")
def get_quantum_status():
    """Returns system status of the Quantum Engine and available backends."""
    status_text = "ONLINE"
    source_type = "Quantum Measurement Simulation (Qiskit Aer/Statevector)" if HAS_QISKIT else "Secure Classical Fallback (CSPRNG)"
    
    return {
        "engine_status": status_text,
        "has_qiskit": HAS_QISKIT,
        "source_type": source_type,
        "qiskit_error": QISKIT_ERROR if not HAS_QISKIT else None,
        "is_hardware_connected": False,
        "hardware_notice": "Currently using statevector simulation. IBM Quantum hardware backend can be configured in settings."
    }

@router.post("/generate", response_model=QuantumGenerateResponse)
def generate_quantum_bits(request: QuantumGenerateRequest):
    """Generates random bits using quantum simulation (Hadamard gates + measurement) or classical fallback."""
    try:
        result = rng_engine.generate(bits_count=request.bits_count, source=request.source)
        return QuantumGenerateResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate random bits: {str(e)}")
