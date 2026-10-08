import React, { useState, useEffect } from 'react';
import { GitCompare, Atom, Cpu, Play, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { ComparisonBarChart } from '../components/RandomnessChart';
import { apiService } from '../services/api';

export default function ComparisonLab() {
  const [bitsCount, setBitsCount] = useState(1024);
  const [loading, setLoading] = useState(false);
  const [compData, setCompData] = useState(null);
  const [error, setError] = useState(null);

  const handleRunComparison = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.compareRandomness(bitsCount);
      setCompData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleRunComparison();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <GitCompare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Quantum vs Pseudo-Random Comparison Lab</h1>
            <p className="text-xs text-slate-400 font-mono">Head-to-Head Entropy, Monobit & Predictability Analysis</p>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="cyber-card p-6 border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Comparison Sample Bitstream Size
            </label>
            <div className="flex space-x-2 pt-1">
              {[512, 1024, 2048, 4096].map((size) => (
                <button
                  key={size}
                  onClick={() => setBitsCount(size)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                    bitsCount === size
                      ? 'bg-cyan-500 text-slate-950 shadow-cyan-glow border border-cyan-400'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {size} bits
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleRunComparison}
            disabled={loading}
            className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-sm shadow-cyan-glow transition-all active:scale-95 disabled:opacity-50"
          >
            <Play className={`w-4 h-4 fill-white ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Running Comparison...' : 'RUN HEAD-TO-HEAD LAB'}</span>
          </button>
        </div>
      </div>

      {/* Results Section */}
      {compData && (
        <div className="space-y-8">
          {/* Comparison Side-by-Side Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quantum Side */}
            <div className="cyber-card-glow p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Atom className="w-5 h-5 animate-pulse" />
                  <h3 className="font-bold text-white text-base">Quantum Superposition Engine</h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Qiskit Simulator
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Shannon Entropy:</span>
                  <span className="font-bold text-cyan-400">{compData.quantum_result.shannon_entropy} bits/bit</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Monobit P-Value:</span>
                  <span className="font-bold text-cyan-400">{compData.quantum_result.monobit_p_value}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Runs Test Score:</span>
                  <span className="font-bold text-cyan-400">{compData.quantum_result.runs_test_score}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Overall Quality:</span>
                  <span className="font-bold text-emerald-400">{compData.quantum_result.overall_score}%</span>
                </div>
              </div>
            </div>

            {/* PRNG Side */}
            <div className="cyber-card p-6 border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Cpu className="w-5 h-5" />
                  <h3 className="font-bold text-white text-base">Classical PRNG (Mersenne Twister)</h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Deterministic
                </span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Shannon Entropy:</span>
                  <span className="font-bold text-amber-400">{compData.pseudorandom_result.shannon_entropy} bits/bit</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Monobit P-Value:</span>
                  <span className="font-bold text-amber-400">{compData.pseudorandom_result.monobit_p_value}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Runs Test Score:</span>
                  <span className="font-bold text-amber-400">{compData.pseudorandom_result.runs_test_score}</span>
                </div>
                <div className="flex justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400">Overall Quality:</span>
                  <span className="font-bold text-amber-400">{compData.pseudorandom_result.overall_score}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Metric Comparison Table */}
          <div className="cyber-card p-6 border-slate-800 space-y-4 overflow-x-auto">
            <h3 className="text-sm font-semibold text-white">Side-by-Side Metric Comparison Table</h3>
            <table className="w-full text-xs font-mono text-left">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">Statistical Metric</th>
                  <th className="p-3 text-cyan-400">Quantum Superposition</th>
                  <th className="p-3 text-amber-400">Pseudo-Random (PRNG)</th>
                  <th className="p-3">Security Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-3 font-semibold text-white">Shannon Entropy</td>
                  <td className="p-3 text-cyan-300">{compData.quantum_result.shannon_entropy}</td>
                  <td className="p-3 text-amber-300">{compData.pseudorandom_result.shannon_entropy}</td>
                  <td className="p-3 text-slate-400 font-sans">High unpredictability prevents seed estimation</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Zero / One Ratio</td>
                  <td className="p-3 text-cyan-300">{compData.quantum_result.zero_one_ratio}</td>
                  <td className="p-3 text-amber-300">{compData.pseudorandom_result.zero_one_ratio}</td>
                  <td className="p-3 text-slate-400 font-sans">Symmetric balance eliminates bit bias</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Runs Test Score</td>
                  <td className="p-3 text-cyan-300">{compData.quantum_result.runs_test_score}</td>
                  <td className="p-3 text-amber-300">{compData.pseudorandom_result.runs_test_score}</td>
                  <td className="p-3 text-slate-400 font-sans">Protects against repeating sequence clusters</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Determinism</td>
                  <td className="p-3 text-cyan-300">Non-Deterministic (Quantum Law)</td>
                  <td className="p-3 text-amber-300">100% Deterministic (Algorithm)</td>
                  <td className="p-3 text-slate-400 font-sans">PRNG state can be completely cloned if seed is leaked</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bar Chart Overview */}
          <div className="cyber-card p-6 border-slate-800 space-y-4">
            <h3 className="text-sm font-semibold text-white">Comparative Quality Visualization</h3>
            <ComparisonBarChart
              quantumScore={compData.quantum_result.overall_score}
              prngScore={compData.pseudorandom_result.overall_score}
            />
          </div>

          {/* Nuanced Scientific Explanation */}
          <div className="p-5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-2 text-xs text-slate-300 leading-relaxed">
            <div className="flex items-center space-x-2 text-indigo-300 font-bold text-sm">
              <AlertTriangle className="w-5 h-5 text-indigo-400" />
              <span>Scientific & Cryptographic Principle</span>
            </div>
            <p className="text-slate-300">
              {compData.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
