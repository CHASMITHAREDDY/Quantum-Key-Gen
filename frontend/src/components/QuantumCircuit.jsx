import React from 'react';
import { Atom, Cpu, ArrowRight } from 'lucide-react';

export default function QuantumCircuit({ qubitsCount = 4, isAnimating = false, circuitData = null, generatedBits = '' }) {
  const displayQubits = Math.min(qubitsCount, 6);

  return (
    <div className="cyber-card p-6 border-cyan-500/20 shadow-cyan-glow relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Atom className={`w-5 h-5 ${isAnimating ? 'animate-spin text-cyan-300' : ''}`} />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Quantum Circuit Visualization</h4>
            <p className="text-xs text-slate-400 font-mono">Qiskit Hadamard Superposition Engine</p>
          </div>
        </div>
        <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400">
          {displayQubits} Qubits Active
        </span>
      </div>

      {/* Quantum Wire Diagram */}
      <div className="space-y-4 my-6 font-mono text-sm">
        {Array.from({ length: displayQubits }).map((_, idx) => {
          const bitVal = generatedBits ? generatedBits[idx] : null;
          return (
            <div key={idx} className="flex items-center space-x-3 group">
              {/* Qubit Initial State */}
              <span className="w-10 text-cyan-400 font-bold text-xs px-2 py-1 rounded bg-cyan-500/10 border border-cyan-500/20 text-center">
                |0⟩
              </span>

              {/* Wire 1 */}
              <div className="flex-1 h-0.5 bg-slate-700 relative flex items-center">
                {isAnimating && (
                  <div className="absolute h-1.5 w-6 bg-cyan-400 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: `${idx * 0.15}s` }} />
                )}
              </div>

              {/* Hadamard Gate H */}
              <div className="px-3 py-1.5 rounded bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-bold text-xs border border-purple-400/40 shadow-purple-glow">
                H
              </div>

              {/* Wire 2 */}
              <div className="flex-1 h-0.5 bg-slate-700 relative flex items-center">
                {isAnimating && (
                  <div className="absolute h-1.5 w-6 bg-purple-400 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: `${idx * 0.2}s` }} />
                )}
              </div>

              {/* Measurement Gate M */}
              <div className="px-2.5 py-1.5 rounded bg-slate-800 text-cyan-300 font-bold text-xs border border-cyan-500/30 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>M</span>
              </div>

              {/* Arrow */}
              <ArrowRight className="w-4 h-4 text-slate-500" />

              {/* Classical Bit Outcome */}
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center font-bold text-xs font-mono transition-all ${
                bitVal === '1'
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-cyan-glow'
                  : bitVal === '0'
                  ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-purple-glow'
                  : 'bg-slate-900 border-slate-800 text-slate-500'
              }`}>
                {bitVal !== null ? bitVal : '?'}
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanation Footer */}
      <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <p className="font-semibold text-cyan-300 mb-1 flex items-center gap-1">
          <span>|0⟩ → H → Measurement → 0/1</span>
        </p>
        <p className="text-slate-400">
          The Hadamard gate (<code className="text-purple-300 bg-slate-900 px-1 py-0.5 rounded">H</code>) places the qubit into an equal superposition state <span className="font-mono text-cyan-400">|ψ⟩ = (|0⟩ + |1⟩) / √2</span>. Upon quantum measurement (<code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">M</code>), the state collapses into either 0 or 1 with equal 50% probability.
        </p>
      </div>
    </div>
  );
}
