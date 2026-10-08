from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

# Quantum Generation Schemas
class QuantumGenerateRequest(BaseModel):
    bits_count: int = Field(default=256, ge=16, le=8192, description="Number of bits to generate (16 to 8192)")
    source: str = Field(default="quantum", description="Requested source: 'quantum' or 'classical'")

class QuantumGenerateResponse(BaseModel):
    bits: str
    hex_string: str
    bits_count: int
    entropy: float
    execution_time_ms: float
    zeros_count: int
    ones_count: int
    zeros_pct: float
    ones_pct: float
    source_used: str
    qubits_used: int
    is_simulated: bool
    circuit_diagram: str
    timestamp: str

# Key Generator Schemas
class KeyGenerateRequest(BaseModel):
    key_size: int = Field(default=256, description="Key size in bits (128, 192, 256)")
    source: str = Field(default="quantum_simulation", description="Randomness source: 'quantum_simulation' or 'secure_classical'")

class KeyGenerateResponse(BaseModel):
    key_id: str
    key_size: int
    source: str
    generated_at: str
    entropy: float
    sha256_fingerprint: str
    masked_key: str
    raw_key_hex: str
    raw_key_base64: str
    warning: str

# Randomness Analysis Schemas
class AnalysisRequest(BaseModel):
    bitstring: Optional[str] = Field(default=None, description="Binary string of 0s and 1s to analyze")
    bits_count: Optional[int] = Field(default=512, description="Bit length if auto-generating sequence")
    source: Optional[str] = Field(default="quantum", description="Source if auto-generating: 'quantum' or 'pseudorandom'")

class AnalysisResponse(BaseModel):
    length: int
    zeros_count: int
    ones_count: int
    zero_one_ratio: float
    shannon_entropy: float
    monobit_p_value: float
    runs_test_score: float
    runs_count: int
    expected_runs: float
    byte_distribution: List[int]
    collision_rate: float
    overall_score: float
    explanations: Dict[str, str]

# Quantum vs Pseudo-Random Comparison Schemas
class CompareRequest(BaseModel):
    bits_count: int = Field(default=1024, ge=64, le=8192, description="Length of sequence to compare")

class CompareResponse(BaseModel):
    quantum_result: AnalysisResponse
    pseudorandom_result: AnalysisResponse
    metrics_summary: Dict[str, Any]
    explanation: str

# Security Demo Schemas
class SecurityDemoRequest(BaseModel):
    demo_type: str = Field(default="prng_compromise", description="Demo type: 'prng_compromise' or 'qrng_secure'")
    secret_message: str = Field(default="QuantumKeyGen Secret Cryptographic Payload", description="Message to protect")
    weak_seed: Optional[int] = Field(default=1337, description="Seed used for weak PRNG scenario")

class SecurityDemoResponse(BaseModel):
    demo_type: str
    success: bool
    seed_used: Optional[int]
    attempts_required: int
    time_taken_ms: float
    encrypted_payload_hex: str
    recovered_key_hex: Optional[str]
    recovered_message: Optional[str]
    security_verdict: str
    explanation: str

# System Stats Schemas
class SystemStatsResponse(BaseModel):
    total_bits_generated: int
    total_keys_derived: int
    avg_entropy: float
    quantum_engine_status: str
    source_type: str
    security_status: str
    key_strength: str
    recent_activity: List[Dict[str, str]]
