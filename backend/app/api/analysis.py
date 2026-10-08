from fastapi import APIRouter, HTTPException
from ..models.schemas import (
    AnalysisRequest,
    AnalysisResponse,
    CompareRequest,
    CompareResponse
)
from ..services.randomness_analyzer import analyzer_service
from ..services.quantum_rng import rng_engine
from .system import record_activity

router = APIRouter(prefix="/randomness", tags=["Randomness Analysis"])

@router.post("/analyze", response_model=AnalysisResponse)
def analyze_randomness(request: AnalysisRequest):
    """Performs statistical randomness tests (Monobit frequency, Shannon entropy, Runs test, Byte distribution)."""
    try:
        bitstring = request.bitstring
        if not bitstring:
            bits_count = request.bits_count or 512
            source = request.source or "quantum"
            gen_res = rng_engine.generate(bits_count=bits_count, source=source)
            bitstring = gen_res["bits"]
            
        analysis = analyzer_service.analyze_bitstring(bitstring)
        
        record_activity(
            action=f"Randomness statistical analysis completed ({len(bitstring)} bits)",
            detail=f"Entropy: {analysis['shannon_entropy']} | Score: {analysis['overall_score']}%"
        )
        
        return AnalysisResponse(**analysis)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to analyze bitstring: {str(e)}")


@router.post("/compare", response_model=CompareResponse)
def compare_quantum_vs_pseudorandom(request: CompareRequest):
    """Compares quantum-generated randomness side-by-side against classical pseudo-random numbers (PRNG)."""
    try:
        result = analyzer_service.compare_quantum_vs_pseudorandom(bits_count=request.bits_count)
        
        record_activity(
            action=f"Quantum vs PRNG comparison test executed ({request.bits_count} bits)",
            detail=f"Quantum Score: {result['metrics_summary']['quantum_score']}% vs PRNG Score: {result['metrics_summary']['prng_score']}%"
        )
        
        return CompareResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to run comparison: {str(e)}")
