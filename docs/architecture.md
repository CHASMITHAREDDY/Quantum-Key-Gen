# QuantumKeyGen Architecture Documentation

## System System Architecture & Workflow

```
+-------------------------------------------------------------------------+
|                              REACT FRONTEND                             |
|    Dashboard | Quantum RNG | Key Generator | Analysis | Security Lab    |
+-------------------------------------------------------------------------+
                                    |
                          HTTP / REST API (JSON)
                                    v
+-------------------------------------------------------------------------+
|                             FASTAPI BACKEND                             |
|          /api/quantum | /api/key | /api/randomness | /api/security      |
+-------------------------------------------------------------------------+
                                    |
      +-----------------------------+-----------------------------+
      |                                                           |
      v                                                           v
+-----------------------------+                 +-----------------------------+
| QUANTUM RNG ENGINE (Qiskit) |                 |  STATISTICAL ANALYSIS SUITE |
| Superposition |0⟩ -> |H⟩     |                 |  Shannon Entropy           |
| Probabilistic Measurement   |                 |  NIST Monobit & Runs Tests  |
+-----------------------------+                 +-----------------------------+
              |                                               |
              v                                               v
+-------------------------------------------------------------------------+
|                       CRYPTOGRAPHIC DERIVATION                          |
|       HKDF SHA-256 Key Derivation -> AES-256-GCM Symmetric Key          |
+-------------------------------------------------------------------------+
```

## Core Components

1. **Quantum Superposition Engine (`quantum_rng.py`)**:
   - Constructs Qiskit quantum circuits using Hadamard gates to place qubits in superposition:
     $$\mid\psi\rangle = \frac{\mid 0 \rangle + \mid 1 \rangle}{\sqrt{2}}$$
   - Samples probabilistic quantum measurements to produce unbiased binary bitstreams.
   - Fallback to Python `secrets` OS CSPRNG if Qiskit simulator is unavailable.

2. **Cryptographic Key Derivation (`key_generator.py`)**:
   - Converts quantum bits into byte arrays.
   - Passes bytes into HMAC-based Extract-and-Expand Key Derivation Function (HKDF SHA-256).
   - Generates 128-bit, 192-bit, or 256-bit symmetric key material.
   - Formats unique SHA-256 key fingerprints.

3. **Randomness Analysis Suite (`randomness_analyzer.py`)**:
   - **Shannon Entropy Test**: Calculates information unpredictability index ($H \in [0, 1]$).
   - **Monobit Frequency Test**: Verifies 0 vs 1 statistical balance using complementary error functions.
   - **Runs Test**: Measures transitions between consecutive identical bit sequences.
   - **Byte Histogram**: Evaluates 256-bin octet distribution and collision rate.

4. **Security Demonstration Laboratory (`security_demo.py`)**:
   - Compares deterministic weak PRNG seed encryption vs high-entropy quantum key protection under AES-256-GCM.
