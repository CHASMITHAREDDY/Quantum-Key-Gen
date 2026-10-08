import React, { useState } from 'react';
import { KeyRound, Shield, Play, ArrowDown, Cpu, CheckCircle2, Lock, AlertCircle } from 'lucide-react';
import KeyCard from '../components/KeyCard';
import { apiService } from '../services/api';

export default function KeyGenerator() {
  const [keySize, setKeySize] = useState(256);
  const [source, setSource] = useState('quantum_simulation');
  const [loading, setLoading] = useState(false);
  const [keyResult, setKeyResult] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateKey = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.generateKey(keySize, source);
      setKeyResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Cryptographic Key Generator</h1>
            <p className="text-xs text-slate-400 font-mono">HKDF SHA-256 Key Derivation from Superposition Measurement</p>
          </div>
        </div>
      </div>

      {/* Process Flow Diagram */}
      <div className="cyber-card p-6 border-slate-800 space-y-4">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Key Derivation Architecture Pipeline
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold">1. Quantum Bits</span>
            <p className="text-[10px] text-slate-400">Hadamard |ψ⟩</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-cyan-400 font-bold">2. Bit Validation</span>
            <p className="text-[10px] text-slate-400">Entropy Check</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-purple-400 font-bold">3. Byte Conversion</span>
            <p className="text-[10px] text-slate-400">Binary → Octets</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-purple-400 font-bold">4. HKDF SHA-256</span>
            <p className="text-[10px] text-slate-400">Extract & Expand</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold">5. AES-GCM Key</span>
            <p className="text-[10px] text-slate-400">Symmetric Key</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-bold">6. Fingerprint</span>
            <p className="text-[10px] text-slate-400">SHA-256 ID</p>
          </div>
        </div>
      </div>

      {/* Generator Controls */}
      <div className="cyber-card p-6 border-slate-800 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Key Size Picker */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Select Key Size (bits)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[128, 192, 256].map((size) => (
                <button
                  key={size}
                  onClick={() => setKeySize(size)}
                  className={`p-3 rounded-xl font-mono text-sm font-bold border transition-all ${
                    keySize === size
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500 shadow-emerald-glow'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {size}-bit
                </button>
              ))}
            </div>
          </div>

          {/* Randomness Source Picker */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Randomness Entropy Source
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSource('quantum_simulation')}
                className={`p-3 rounded-xl text-xs font-semibold border flex items-center justify-center space-x-2 transition-all ${
                  source === 'quantum_simulation'
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500 shadow-cyan-glow'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Cpu className="w-4 h-4" />
                <span>Quantum Simulation</span>
              </button>
              <button
                onClick={() => setSource('secure_classical')}
                className={`p-3 rounded-xl text-xs font-semibold border flex items-center justify-center space-x-2 transition-all ${
                  source === 'secure_classical'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500 shadow-purple-glow'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <Lock className="w-4 h-4" />
                <span>Secure CSPRNG</span>
              </button>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerateKey}
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-emerald-glow transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Play className={`w-4 h-4 fill-slate-950 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Deriving Cryptographic Key...' : 'GENERATE SECURE KEY'}</span>
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Key Result Component */}
      {keyResult && <KeyCard keyData={keyResult} />}
    </div>
  );
}
