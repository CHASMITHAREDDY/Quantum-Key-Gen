import React, { useState } from 'react';
import { BarChart3, Activity, PieChart, ShieldCheck, Play, Info, AlertCircle } from 'lucide-react';
import { ByteDistributionHistogram } from '../components/RandomnessChart';
import { apiService } from '../services/api';

export default function RandomnessAnalysis() {
  const [bitstringInput, setBitstringInput] = useState('');
  const [bitsCount, setBitsCount] = useState(1024);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.analyzeRandomness(
        bitstringInput.trim() || null,
        bitsCount,
        'quantum'
      );
      setAnalysis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Statistical Randomness Suite</h1>
            <p className="text-xs text-slate-400 font-mono">NIST SP 800-22 Inspired Statistical Battery & Shannon Entropy Analysis</p>
          </div>
        </div>
      </div>

      {/* Input Controls */}
      <div className="cyber-card p-6 border-slate-800 space-y-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Option A: Paste Binary String (0s and 1s)
            </label>
            <span className="text-[11px] text-slate-500 font-mono">Leave blank to auto-generate sample sequence</span>
          </div>

          <textarea
            value={bitstringInput}
            onChange={(e) => setBitstringInput(e.target.value.replace(/[^01]/g, ''))}
            placeholder="e.g. 011010010110010101101100110..."
            className="w-full h-24 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500 transition placeholder:text-slate-700"
          />

          {!bitstringInput && (
            <div className="flex items-center space-x-3 pt-2">
              <label className="text-xs text-slate-400 font-medium">Auto-generate sample size:</label>
              {[256, 512, 1024, 2048].map((size) => (
                <button
                  key={size}
                  onClick={() => setBitsCount(size)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition ${
                    bitsCount === size
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {size} bits
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-sm tracking-wide shadow-cyan-glow transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          <Play className={`w-4 h-4 fill-white ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Executing Statistical Suite...' : 'RUN RANDOMNESS ANALYSIS'}</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Analysis Results Display */}
      {analysis && (
        <div className="space-y-6">
          {/* Main 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="cyber-card p-5 border-cyan-500/30 shadow-cyan-glow space-y-2">
              <span className="text-xs text-slate-400 uppercase font-medium">Overall Quality Score</span>
              <p className="text-3xl font-bold text-cyan-400 font-mono">{analysis.overall_score}%</p>
              <p className="text-[11px] text-slate-400">Composite statistical score</p>
            </div>

            <div className="cyber-card p-5 border-purple-500/30 shadow-purple-glow space-y-2">
              <span className="text-xs text-slate-400 uppercase font-medium">Shannon Entropy</span>
              <p className="text-3xl font-bold text-purple-400 font-mono">{analysis.shannon_entropy}</p>
              <p className="text-[11px] text-slate-400">Target: 1.0 bits per bit</p>
            </div>

            <div className="cyber-card p-5 border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-medium">Monobit P-Value</span>
              <p className="text-3xl font-bold text-slate-200 font-mono">{analysis.monobit_p_value}</p>
              <p className="text-[11px] text-emerald-400 font-mono">Passed (≥ 0.01)</p>
            </div>

            <div className="cyber-card p-5 border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-medium">0 / 1 Bit Ratio</span>
              <p className="text-3xl font-bold text-slate-200 font-mono">{analysis.zero_one_ratio}</p>
              <p className="text-[11px] text-slate-400 font-mono">{analysis.zeros_count} zeros / {analysis.ones_count} ones</p>
            </div>
          </div>

          {/* Byte Frequency Histogram Chart */}
          <div className="cyber-card p-6 border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-semibold text-white">Byte Value Frequency Histogram (0 to 255)</h3>
              <span className="text-xs font-mono text-purple-400">Uniformity Check</span>
            </div>
            <ByteDistributionHistogram byteDistribution={analysis.byte_distribution} />
            <p className="text-xs text-slate-400">
              {analysis.explanations.byte_distribution} Collision rate across octets: <span className="text-cyan-300 font-mono">{(analysis.collision_rate * 100).toFixed(1)}%</span>.
            </p>
          </div>

          {/* Educational Explanations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-cyan-300">
                <Info className="w-4 h-4 text-cyan-400" />
                <span>Shannon Entropy Explanation</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {analysis.explanations.shannon_entropy}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-bold text-purple-300">
                <Info className="w-4 h-4 text-purple-400" />
                <span>Runs Test Explanation</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {analysis.explanations.runs_test} Observed runs: <span className="font-mono text-purple-300">{analysis.runs_count}</span> (Expected: <span className="font-mono text-purple-300">{analysis.expected_runs}</span>).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
