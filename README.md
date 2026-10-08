# QuantumKeyGen

> **“Quantum Randomness for Trusted Cryptographic Keys”**

A recruiter-ready, end-to-end Quantum Communication & Cybersecurity web application demonstrating how simulated quantum measurement randomness eliminates pseudo-random number generator (PRNG) determinism weaknesses to derive trusted cryptographic keys.

---

## 📌 Problem Statement

Conventional Pseudo-Random Number Generators (PRNGs) rely on deterministic algorithms (e.g., Mersenne Twister). Given knowledge of an application's internal state or low-entropy seed (such as system timestamp), an adversary can predict future random sequences, reproduce identical cryptographic keys, and compromise encrypted data.

---

## 💡 Proposed Solution

**QuantumKeyGen** harnesses quantum superposition and probabilistic measurement. By placing qubits into an equal superposition using Hadamard gates ($\mid 0 \rangle \xrightarrow{H} \frac{\mid 0 \rangle + \mid 1 \rangle}{\sqrt{2}}$), quantum measurement yields physical unpredictability. These random bitstreams are then converted and derived into 256-bit symmetric keys using HKDF (SHA-256) for authenticated AES-256-GCM encryption.

---

## 🚀 Key Features

1. **Simulated Quantum RNG Engine**:
   - Qiskit quantum circuit generator with Hadamard gates & measurement operators.
   - Interactive quantum wire visualization with animated superposition state collapse.
   - Graceful fallback to OS CSPRNG with transparent source labeling.

2. **Cryptographic Key Generator**:
   - Derives 128-bit, 192-bit, and 256-bit symmetric keys.
   - HKDF SHA-256 key extraction & expansion.
   - Unique SHA-256 key fingerprints and default secret masking for UI display.

3. **Statistical Randomness Analysis Suite**:
   - **Shannon Entropy Test**: Measures unpredictability ($H \to 1.0$ bits/bit).
   - **NIST Monobit Test**: Evaluates 0/1 ratio balance via complementary error functions.
   - **Runs Test**: Analyzes consecutive identical bit sequence cluster transitions.
   - **Byte Frequency Histogram**: 256-bin octet distribution and collision rate calculation.

4. **Quantum vs Pseudo-Random Comparison Lab**:
   - Side-by-side comparative benchmarking between Qiskit Quantum Simulation and Python Mersenne Twister PRNG.

5. **Interactive Security Demonstration**:
   - Educational simulation proving how weak PRNG seeds enable key recovery in milliseconds versus how 256-bit Quantum Keys resist $2^{256}$ seed estimation attacks.

6. **Interactive Built-in Documentation**:
   - Comprehensive guide on quantum gates, qubits, PRNG vs CSPRNG vs QRNG, and key management best practices.

---

## 🔄 System Workflow

```
User
 ↓
React Frontend (Vite + Tailwind CSS + Recharts)
 ↓
FastAPI Backend (/api endpoints)
 ↓
Quantum RNG Engine (Qiskit Circuit / Statevector)
 ↓
Quantum Superposition & Probabilistic Measurement
 ↓
Random Bit Sequence (0/1) & Hex String
 ↓
Entropy Analysis (Shannon & NIST Monobit Tests)
 ↓
Cryptographic Key Derivation (HKDF SHA-256)
 ↓
Security Telemetry & SOC Dashboard
```

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Recharts, Lucide React Icons
- **Backend**: Python 3.14+, FastAPI, Uvicorn, Pydantic v2
- **Quantum Engine**: Qiskit 2.5+, Qiskit Aer / Statevector Simulator
- **Cryptography**: Python `cryptography` library (HKDF, SHA-256, AES-256-GCM)
- **Testing**: Pytest & HTTPX TestClient

---

## 📋 API Documentation Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API Root Information |
| `GET` | `/health` | System Health Check |
| `GET` | `/api/quantum/status` | Quantum Engine & Provider Status |
| `POST` | `/api/quantum/generate` | Generates Quantum Bitstream & Circuit Diagram |
| `POST` | `/api/key/generate` | Derives 128/192/256-bit Cryptographic Key |
| `POST` | `/api/randomness/analyze` | Runs Statistical Battery & Shannon Entropy |
| `POST` | `/api/randomness/compare` | Head-to-Head Quantum vs PRNG Benchmarking |
| `POST` | `/api/security/demo` | Simulates PRNG Seed Cracking vs Quantum Key Security |
| `GET` | `/api/statistics` | Dynamic Session Statistics & Telemetry Log |

Interactive Swagger UI available at: `http://127.0.0.1:8000/docs`

---

## ⚙️ How to Run Locally

### 1. Backend Setup

```bash
cd backend

# Create Virtual Environment
python -m venv .venv

# Activate Virtual Environment (Windows)
.venv\Scripts\activate

# Install Backend Dependencies
pip install -r requirements.txt

# Run FastAPI Server
python -m uvicorn main:app --reload
```

Backend will start on: `http://127.0.0.1:8000`

### 2. Frontend Setup

In a new terminal window:

```bash
cd frontend

# Install Node Dependencies
npm install

# Run Vite Development Server
npm run dev
```

Frontend will start on: `http://localhost:5173`

---

## 🧪 Running Unit Tests

To run the backend test suite:

```bash
cd backend
.venv\Scripts\pytest tests
```

Tests cover:
- Health check endpoints
- Quantum bitstream generation & bit ratio bounds
- Cryptographic key derivation (128-bit & 256-bit HKDF)
- Statistical randomness analysis suite
- PRNG seed compromise vs Quantum key security scenarios

---

## ⚠️ Security & Production Considerations

- **Educational Disclaimer**: Secrets displayed in this demo interface are for educational purposes.
- **Production Key Storage**: Production deployments must never transmit raw secret keys to browser frontends or log secret bytes; secret keys should be managed inside a dedicated Hardware Security Module (HSM) or Cloud Key Management Service (KMS).
- **Simulation Disclosure**: This software uses a local Qiskit quantum simulator unless connected to IBM Quantum hardware backends.

---

## 🔮 Limitations & Future Enhancements

- **Real QPU Integration**: Provisioning direct IBM Quantum QPU hardware queues.
- **Post-Quantum Cryptography (PQC)**: Integrating Kyber/Dilithium lattice-based key encapsulation.
- **Continuous Entropy Streaming**: WebSockets streaming real-time quantum bit generation.

---

## 📄 License

MIT License. Designed for Educational, Research, and Portfolio Demonstrations.
