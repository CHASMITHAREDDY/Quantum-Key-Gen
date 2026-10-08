import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Lock, Unlock, Play, KeyRound, AlertOctagon, Terminal } from 'lucide-react';
import { apiService } from '../services/api';

export default function SecurityLab() {
  const [secretMsg, setSecretMsg] = useState('Confidential Quantum Cryptographic Payload');
  const [weakSeed, setWeakSeed] = useState(1337);
  const [loading, setLoading] = useState(false);
  const [demoResult, setDemoResult] = useState(null);

  const runDemo = async (demoType) => {
    setLoading(true);
    try {
      const data = await apiService.runSecurityDemo(demoType, secretMsg, weakSeed);
      setDemoResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-rose-950/40 border border-slate-800">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Interactive Cryptographic Security Lab</h1>
            <p className="text-xs text-slate-400 font-mono">Demonstrating PRNG Seed Reconstruction vs Quantum Unpredictability</p>
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="cyber-card p-6 border-slate-800 space-y-6">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Configure Educational Security Simulation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Secret Message Payload</label>
            <input
              type="text"
              value={secretMsg}
              onChange={(e) => setSecretMsg(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs text-slate-300 font-medium">Weak PRNG Seed (Scenario 1)</label>
            <input
              type="number"
              value={weakSeed}
              onChange={(e) => setWeakSeed(parseInt(e.target.value) || 1337)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-amber-300 focus:outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <button
            onClick={() => runDemo('prng_compromise')}
            disabled={loading}
            className="p-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <Unlock className="w-4 h-4 text-rose-400" />
            <span>RUN SCENARIO A: WEAK PRNG COMPROMISE DEMO</span>
          </button>

          <button
            onClick={() => runDemo('qrng_secure')}
            disabled={loading}
            className="p-4 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>RUN SCENARIO B: QUANTUM KEY SECURITY DEMO</span>
          </button>
        </div>
      </div>

      {/* Educational Flow Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weak PRNG Flow */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-rose-500/30 space-y-3">
          <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
            <AlertOctagon className="w-4 h-4" />
            <span>Scenario A: Deterministic PRNG Key Flow</span>
          </div>
          <div className="font-mono text-xs text-slate-400 space-y-2">
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-amber-300">
              Low-Entropy PRNG Seed (e.g. {weakSeed})
            </div>
            <div className="text-center text-slate-600">↓</div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-amber-300">
              Deterministic Pseudo-Random Sequence
            </div>
            <div className="text-center text-slate-600">↓</div>
            <div className="p-2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
              Attacker Reconstructs Seed & Decrypts Payload
            </div>
          </div>
        </div>

        {/* Quantum Flow */}
        <div className="p-5 rounded-xl bg-slate-900/60 border border-emerald-500/30 space-y-3">
          <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Scenario B: Quantum Randomness Key Flow</span>
          </div>
          <div className="font-mono text-xs text-slate-400 space-y-2">
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-cyan-300">
              Quantum Measurement (|ψ⟩ = |0⟩ + |1⟩)
            </div>
            <div className="text-center text-slate-600">↓</div>
            <div className="p-2 rounded bg-slate-950 border border-slate-800 text-cyan-300">
              High-Entropy HKDF SHA-256 Key Material
            </div>
            <div className="text-center text-slate-600">↓</div>
            <div className="p-2 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              AES-256-GCM Payload Completely Unbreakable
            </div>
          </div>
        </div>
      </div>

      {/* Demo Simulation Execution Output */}
      {demoResult && (
        <div className={`cyber-card p-6 border-slate-800 space-y-6 ${
          demoResult.demo_type === 'prng_compromise' ? 'border-rose-500/30 shadow-rose-glow' : 'border-emerald-500/30 shadow-emerald-glow'
        }`}>
          {/* Verdict Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <Terminal className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white text-base font-mono">Security Telemetry Terminal</h3>
            </div>
            <span className={`px-3 py-1 rounded text-xs font-mono font-bold ${
              demoResult.demo_type === 'prng_compromise'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500'
            }`}>
              {demoResult.security_verdict}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-1">Execution Time</span>
              <span className="text-cyan-400 font-bold">{demoResult.time_taken_ms} ms</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-1">Attacker Attempts</span>
              <span className="text-purple-400 font-bold">{demoResult.attempts_required.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-1">Seed Recovered</span>
              <span className="text-amber-400 font-bold">{demoResult.seed_used !== null ? demoResult.seed_used : 'FAILED'}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
              <span className="text-slate-400 block mb-1">Key Status</span>
              <span className={demoResult.recovered_key_hex ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                {demoResult.recovered_key_hex ? 'COMPROMISED' : 'PROTECTED'}
              </span>
            </div>
          </div>

          {/* Recovered Secret Payload (if broken) */}
          {demoResult.recovered_message && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
              <span className="text-xs font-bold text-rose-300 uppercase tracking-wider font-mono">
                Attacker Decrypted Payload:
              </span>
              <p className="font-mono text-sm text-white font-bold bg-slate-950 p-3 rounded-lg border border-slate-800">
                "{demoResult.recovered_message}"
              </p>
            </div>
          )}

          {/* Explanation Text */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
            <p className="font-semibold text-cyan-300 mb-1">Analysis & Takeaway:</p>
            <p className="text-slate-400">{demoResult.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
