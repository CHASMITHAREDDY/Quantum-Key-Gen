from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_root_and_health():
    res1 = client.get("/")
    assert res1.status_code == 200
    assert "QuantumKeyGen" in res1.json()["name"]
    
    res2 = client.get("/health")
    assert res2.status_code == 200
    assert res2.json()["status"] == "healthy"

def test_quantum_status():
    res = client.get("/api/quantum/status")
    assert res.status_code == 200
    data = res.json()
    assert "engine_status" in data
    assert data["engine_status"] == "ONLINE"

def test_quantum_generate():
    payload = {"bits_count": 128, "source": "quantum"}
    res = client.post("/api/quantum/generate", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert len(data["bits"]) == 128
    assert data["bits_count"] == 128
    assert data["entropy"] > 0.8
    assert data["zeros_count"] + data["ones_count"] == 128
