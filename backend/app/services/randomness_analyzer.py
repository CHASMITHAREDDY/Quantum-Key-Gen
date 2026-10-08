import math
import random
import secrets
from typing import Dict, Any, List
from scipy.special import erfc

from .quantum_rng import calculate_shannon_entropy, rng_engine


class RandomnessAnalyzer:
    """Analyzes bitstreams using statistical entropy, monobit frequency, runs test, and byte distribution."""
    
    def analyze_bitstring(self, bitstring: str) -> Dict[str, Any]:
        if not bitstring or len(bitstring) == 0:
            bitstring = "0"
            
        n = len(bitstring)
        n0 = bitstring.count('0')
        n1 = bitstring.count('1')
        
        # 1. Zero/One ratio
        zero_one_ratio = round(n0 / n1, 4) if n1 > 0 else 0.0
        
        # 2. Shannon Entropy
        entropy = calculate_shannon_entropy(bitstring)
        
        # 3. NIST Monobit Frequency Test
        # S_obs = |n0 - n1| / sqrt(n)
        s_obs = abs(n0 - n1) / math.sqrt(n)
        monobit_p_value = round(float(erfc(s_obs / math.sqrt(2))), 6)
        
        # 4. Basic Runs Test
        # Count total runs (blocks of consecutive identical bits)
        runs_count = 1
        for i in range(1, n):
            if bitstring[i] != bitstring[i-1]:
                runs_count += 1
                
        pi = n1 / n
        expected_runs = 1 + (2 * n0 * n1 / n)
        
        if abs(pi - 0.5) >= (2 / math.sqrt(n)):
            runs_score = 0.0
        else:
            variance = (2 * n0 * n1 * (2 * n0 * n1 - n)) / (n * n * (n - 1)) if n > 1 else 1.0
            if variance > 0:
                z_stat = abs(runs_count - expected_runs) / math.sqrt(variance)
                runs_score = round(float(erfc(z_stat / math.sqrt(2))), 6)
            else:
                runs_score = 1.0
                
        # 5. Byte Distribution & Collision Analysis
        # Pad bitstring to multiple of 8
        remainder = n % 8
        eval_bits = bitstring[:n - remainder] if remainder != 0 else bitstring
        
        byte_counts = [0] * 256
        collisions = 0
        seen_bytes = set()
        
        if len(eval_bits) >= 8:
            num_bytes = len(eval_bits) // 8
            for i in range(num_bytes):
                b_str = eval_bits[i*8 : (i+1)*8]
                b_val = int(b_str, 2)
                byte_counts[b_val] += 1
                if b_val in seen_bytes:
                    collisions += 1
                else:
                    seen_bytes.add(b_val)
            collision_rate = round(collisions / num_bytes, 4) if num_bytes > 0 else 0.0
        else:
            collision_rate = 0.0
            
        # 6. Overall Randomness Score calculation (0 to 100%)
        # Weighted combination: 40% Shannon Entropy, 30% Monobit p-value, 30% Runs test
        score_entropy = (entropy / 1.0) * 40.0
        score_monobit = min(monobit_p_value, 1.0) * 30.0
        score_runs = min(runs_score, 1.0) * 30.0
        
        overall_score = round(min(100.0, max(0.0, score_entropy + score_monobit + score_runs)), 2)
        
        explanations = {
            "shannon_entropy": (
                "Shannon Entropy measures the unpredictability of the bitstream. "
                "For an ideal unbiased binary source, entropy approaches 1.0 bit per bit."
            ),
            "monobit_frequency": (
                "The Monobit test verifies whether the proportion of 0s and 1s is approximately equal. "
                "A p-value >= 0.01 indicates passing statistical balance."
            ),
            "runs_test": (
                "The Runs test evaluates the frequency of consecutive identical bits. "
                "Too fast or too slow transitions indicate non-random structure."
            ),
            "byte_distribution": (
                "Byte distribution maps bit chunks to 256 byte values (0-255) to check uniform coverage."
            ),
            "randomness_score": (
                "Overall composite quality score combining entropy, bit balance, and transition randomness."
            )
        }
        
        return {
            "length": n,
            "zeros_count": n0,
            "ones_count": n1,
            "zero_one_ratio": zero_one_ratio,
            "shannon_entropy": entropy,
            "monobit_p_value": monobit_p_value,
            "runs_test_score": runs_score,
            "runs_count": runs_count,
            "expected_runs": round(expected_runs, 2),
            "byte_distribution": byte_counts,
            "collision_rate": collision_rate,
            "overall_score": overall_score,
            "explanations": explanations
        }
        
    def compare_quantum_vs_pseudorandom(self, bits_count: int = 1024) -> Dict[str, Any]:
        # A. Quantum simulation sequence
        q_gen = rng_engine.generate(bits_count=bits_count, source="quantum")
        quantum_bits = q_gen["bits"]
        quantum_analysis = self.analyze_bitstring(quantum_bits)
        
        # B. Python Mersenne Twister pseudo-random sequence (deterministic PRNG)
        prng_bits = ''.join(str(random.randint(0, 1)) for _ in range(bits_count))
        prng_analysis = self.analyze_bitstring(prng_bits)
        
        diff_entropy = round(abs(quantum_analysis["shannon_entropy"] - prng_analysis["shannon_entropy"]), 6)
        
        summary = {
            "bits_count": bits_count,
            "quantum_entropy": quantum_analysis["shannon_entropy"],
            "prng_entropy": prng_analysis["shannon_entropy"],
            "quantum_score": quantum_analysis["overall_score"],
            "prng_score": prng_analysis["overall_score"],
            "entropy_difference": diff_entropy,
            "quantum_source": q_gen["source_used"],
            "prng_source": "Python Mersenne Twister PRNG (random.randint)"
        }
        
        explanation = (
            "Pseudo-random number generators (PRNGs) rely on deterministic algorithms (e.g., Mersenne Twister) "
            "where knowing the internal state or seed allows predicting all future output. "
            "In contrast, quantum random number generation relies on quantum mechanical superposition and measurement, "
            "which yields fundamental physical unpredictability when executed on physical quantum hardware. "
            "Note: In this simulator, quantum laws are simulated using quantum state vectors."
        )
        
        return {
            "quantum_result": quantum_analysis,
            "pseudorandom_result": prng_analysis,
            "metrics_summary": summary,
            "explanation": explanation
        }


analyzer_service = RandomnessAnalyzer()
