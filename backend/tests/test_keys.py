from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_key_generate_256():
    payload = {"key_size": 256, "source": "quantum_simulation"}
    res = client.post("/api/key/generate", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["key_size"] == 256
    assert len(data["raw_key_hex"]) == 64  # 256 bits = 32 bytes = 64 hex chars
    assert "SHA256:" in data["sha256_fingerprint"]
    assert "••••" in data["masked_key"]
    assert "SECURITY WARNING" in data["warning"]

def test_key_generate_128():
    payload = {"key_size": 128, "source": "secure_classical"}
    res = client.post("/api/key/generate", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["key_size"] == 128
    assert len(data["raw_key_hex"]) == 32  # 128 bits = 16 bytes = 32 hex chars
