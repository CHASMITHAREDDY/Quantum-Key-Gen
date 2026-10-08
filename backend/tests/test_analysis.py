from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_randomness_analyze():
    payload = {"bitstring": "01010101010101010101010101010101"}
    res = client.post("/api/randomness/analyze", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["length"] == 32
    assert data["zeros_count"] == 16
    assert data["ones_count"] == 16
    assert data["shannon_entropy"] == 1.0

def test_randomness_compare():
    payload = {"bits_count": 512}
    res = client.post("/api/randomness/compare", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert "quantum_result" in data
    assert "pseudorandom_result" in data
    assert data["metrics_summary"]["bits_count"] == 512
