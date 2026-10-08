import React, { useState } from 'react';
import { Atom, Play, Copy, Check, Cpu, Clock, Layers, ShieldCheck, AlertCircle } from 'lucide-react';
import QuantumCircuit from '../components/QuantumCircuit';
import { apiService } from '../services/api';

export default function QuantumRNG() {
  const [bitsCount, setBitsCount] = useState(256);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copiedBits, setCopiedBits] = useState(false);
  const [copiedHex, setCopiedHex] = useState(false);
  const [error, setError] = useState(null);

  const bitOptions = [64, 128, 256, 512, 1024, 2048];

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.generateQuantumBits(bitsCount, 'quantum');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/40 border border-slate-800">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Atom className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Quantum Random Number Generator</h1>
            <p className="text-xs text-slate-400 font-mono">Qiskit Hadamard Superposition & Probabilistic Measurement</p>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="cyber-card p-6 border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Select Bitstream Length
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              {bitOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setBitsCount(option)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                    bitsCount === option
                      ? 'bg-cyan-500 text-slate-950 shadow-cyan-glow border border-cyan-400'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {option} bits
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm shadow-cyan-glow transition-all active:scale-95 disabled:opacity-50"
          >
            <Play className={`w-4 h-4 fill-white ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Executing Circuit...' : 'GENERATE QUANTUM RANDOMNESS'}</span>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Quantum Circuit Visualization */}
      <QuantumCircuit
        qubitsCount={Math.min(bitsCount / 16, 8)}
        isAnimating={loading}
        generatedBits={result ? result.bits : ''}
      />

      {/* Results Display */}
      {result && (
        <div className="cyber-card p-6 border-slate-800 space-y-6">
          {/* Summary Stat Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-mono uppercase">Shannon Entropy</span>
              <p className="text-lg font-bold text-cyan-400 font-mono">{result.entropy} <span className="text-xs font-normal">bits/bit</span></p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-mono uppercase">Execution Time</span>
              <p className="text-lg font-bold text-purple-400 font-mono">{result.execution_time_ms} <span className="text-xs font-normal">ms</span></p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-mono uppercase">0s Count / Ratio</span>
              <p className="text-lg font-bold text-slate-200 font-mono">{result.zeros_count} <span className="text-xs font-normal text-purple-300">({result.zeros_pct}%)</span></p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[11px] text-slate-400 font-mono uppercase">1s Count / Ratio</span>
              <p className="text-lg font-bold text-slate-200 font-mono">{result.ones_count} <span className="text-xs font-normal text-cyan-300">({result.ones_pct}%)</span></p>
            </div>
          </div>

          {/* Source Banner */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Randomness Source:</span>
            <span className="text-cyan-300 font-semibold">{result.source_used}</span>
          </div>

          {/* Generated Binary Sequence */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Generated Binary Sequence ({result.bits_count} bits)
              </label>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(result.bits);
                  setCopiedBits(true);
                  setTimeout(() => setCopiedBits(false), 2000);
                }}
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
              >
                {copiedBits ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedBits ? 'Copied' : 'Copy Bits'}</span>
              </button>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 break-all leading-relaxed max-h-48 overflow-y-auto">
              {result.bits}
            </div>
          </div>

          {/* Hexadecimal Representation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Hexadecimal Representation
              </label>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(result.hex_string);
                  setCopiedHex(true);
                  setTimeout(() => setCopiedHex(false), 2000);
                }}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-mono"
              >
                {copiedHex ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHex ? 'Copied' : 'Copy Hex'}</span>
              </button>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300 break-all">
              {result.hex_string}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
