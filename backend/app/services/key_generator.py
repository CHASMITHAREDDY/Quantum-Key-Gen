import uuid
import base64
import hashlib
from datetime import datetime
from typing import Dict, Any

from cryptography.hazmat.primitives.kdf.hkdf import HKDF
from cryptography.hazmat.primitives import hashes

from .quantum_rng import rng_engine, calculate_shannon_entropy


class CryptographicKeyGenerator:
    """Generates cryptographic keys derived from quantum or classical random bitstreams using HKDF SHA-256."""
    
    def generate_key(self, key_size: int = 256, source: str = "quantum_simulation") -> Dict[str, Any]:
        if key_size not in [128, 192, 256]:
            key_size = 256
            
        # 1. Generate sufficient random bits (e.g., 512 bits for extra entropy headroom)
        raw_bits_needed = max(512, key_size * 2)
        rng_source = "quantum" if "quantum" in source.lower() else "classical"
        
        rng_result = rng_engine.generate(bits_count=raw_bits_needed, source=rng_source)
        bitstring = rng_result["bits"]
        entropy = rng_result["entropy"]
        source_label = rng_result["source_used"]
        
        # 2. Convert bitstring to raw bytes
        remainder = len(bitstring) % 8
        if remainder != 0:
            bitstring += '0' * (8 - remainder)
        byte_len = len(bitstring) // 8
        int_val = int(bitstring, 2)
        entropy_bytes = int_val.to_bytes(byte_len, byteorder='big')
        
        # 3. Cryptographic Key Derivation (HKDF SHA-256)
        target_bytes = key_size // 8
        salt = b"QuantumKeyGen-v1.0-DerivationSalt"
        info = f"QuantumKeyGen-{key_size}bit-SymmetricKey".encode('utf-8')
        
        hkdf = HKDF(
            algorithm=hashes.SHA256(),
            length=target_bytes,
            salt=salt,
            info=info,
        )
        derived_key_bytes = hkdf.derive(entropy_bytes)
        
        # 4. Formats and Fingerprints
        raw_key_hex = derived_key_bytes.hex().upper()
        raw_key_b64 = base64.b64encode(derived_key_bytes).decode('utf-8')
        
        # Compute SHA-256 Fingerprint
        fingerprint_hash = hashlib.sha256(derived_key_bytes).hexdigest().upper()
        fingerprint_formatted = "SHA256:" + ":".join([fingerprint_hash[i:i+2] for i in range(0, 16, 2)])
        
        # Masked Key
        if len(raw_key_hex) >= 8:
            masked_key = f"{raw_key_hex[:4]}••••••••••••••••{raw_key_hex[-4:]}"
        else:
            masked_key = "••••••••••••••••"
            
        key_id = f"qkg-{uuid.uuid4().hex[:8]}"
        
        warning_msg = (
            "SECURITY WARNING: This key is generated for educational demonstration purposes. "
            "In production environments, secret keys must NEVER be transmitted to client frontends or logged, "
            "and should be managed using a Hardware Security Module (HSM) or secure Key Vault."
        )
        
        return {
            "key_id": key_id,
            "key_size": key_size,
            "source": source_label,
            "generated_at": datetime.now().isoformat(),
            "entropy": entropy,
            "sha256_fingerprint": fingerprint_formatted,
            "masked_key": masked_key,
            "raw_key_hex": raw_key_hex,
            "raw_key_base64": raw_key_b64,
            "warning": warning_msg
        }


key_generator_service = CryptographicKeyGenerator()
