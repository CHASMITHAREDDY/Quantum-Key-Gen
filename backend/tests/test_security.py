from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_security_demo_prng():
    payload = {"demo_type": "prng_compromise", "secret_message": "Test Message 123", "weak_seed": 500}
    res = client.post("/api/security/demo", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["demo_type"] == "prng_compromise"
    assert data["success"] is True
    assert data["recovered_message"] == "Test Message 123"
    assert "VULNERABLE" in data["security_verdict"]

def test_security_demo_qrng():
    payload = {"demo_type": "qrng_secure", "secret_message": "Test Message 123"}
    res = client.post("/api/security/demo", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["demo_type"] == "qrng_secure"
    assert data["success"] is True
    assert data["recovered_message"] is None
    assert "SECURE" in data["security_verdict"]
