const rawBase = import.meta.env.VITE_API_BASE_URL || '/api';
const API_BASE_URL = rawBase.endsWith('/api') ? rawBase : `${rawBase.replace(/\/$/, '')}/api`;

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.detail || `Server error: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }
  return response.json();
}

export const apiService = {
  async getQuantumStatus() {
    const res = await fetch(`${API_BASE_URL}/quantum/status`);
    return handleResponse(res);
  },

  async generateQuantumBits(bitsCount = 256, source = 'quantum') {
    const res = await fetch(`${API_BASE_URL}/quantum/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bits_count: bitsCount, source }),
    });
    return handleResponse(res);
  },

  async generateKey(keySize = 256, source = 'quantum_simulation') {
    const res = await fetch(`${API_BASE_URL}/key/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key_size: keySize, source }),
    });
    return handleResponse(res);
  },

  async analyzeRandomness(bitstring = null, bitsCount = 512, source = 'quantum') {
    const payload = {};
    if (bitstring) payload.bitstring = bitstring;
    else {
      payload.bits_count = bitsCount;
      payload.source = source;
    }
    const res = await fetch(`${API_BASE_URL}/randomness/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return handleResponse(res);
  },

  async compareRandomness(bitsCount = 1024) {
    const res = await fetch(`${API_BASE_URL}/randomness/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bits_count: bitsCount }),
    });
    return handleResponse(res);
  },

  async getStatistics() {
    const res = await fetch(`${API_BASE_URL}/statistics`);
    return handleResponse(res);
  },

  async runSecurityDemo(demoType = 'prng_compromise', secretMessage = '', weakSeed = 1337) {
    const res = await fetch(`${API_BASE_URL}/security/demo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        demo_type: demoType,
        secret_message: secretMessage || 'QuantumKeyGen Cryptographic Payload',
        weak_seed: weakSeed
      }),
    });
    return handleResponse(res);
  }
};
