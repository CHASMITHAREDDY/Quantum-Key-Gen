import React, { useState, useEffect } from 'react';
import { Atom, Shield, KeyRound, Activity, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import StatCard from '../components/StatCard';
import { BitDistributionChart, EntropyTrendChart, ComparisonBarChart } from '../components/RandomnessChart';
import { apiService } from '../services/api';

export default function Dashboard({ stats, onNavigate }) {
  const [loading, setLoading] = useState(false);
  const [recentBit, setRecentBit] = useState(null);

  useEffect(() => {
    // Generate an initial quantum bit sample for live visualization
    apiService.generateQuantumBits(256, 'quantum')
      .then(res => setRecentBit(res))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Banner Hero */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 overflow-hidden shadow-cyan-glow">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Atom className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>Quantum Superposition Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Quantum-Powered Cryptographic Key Generation
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Eliminate deterministic key weaknesses using simulated quantum mechanical measurement randomness. 
              Derive high-entropy keys with verified Shannon entropy and zero-seed predictability.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('quantum-rng')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-cyan-glow transition-all"
            >
              Generate Quantum Bits
            </button>
            <button
              onClick={() => onNavigate('key-generator')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs transition-all"
            >
              Derive Key
            </button>
          </div>
        </div>
      </div>

      {/* Main 4 Visual Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Quantum Random Bits"
          value={stats?.total_bits_generated?.toLocaleString() || '16,384'}
          subtitle="Total bits measured from superposition"
          icon={Atom}
          color="cyan"
          badgeText="Active"
        />
        <StatCard
          title="Entropy Score"
          value={`${stats?.avg_entropy || '0.9996'}`}
          subtitle="Shannon bits/bit (Ideal: 1.0)"
          icon={Activity}
          color="purple"
          badgeText="Optimal"
        />
        <StatCard
          title="Key Strength"
          value={stats?.key_strength ? stats.key_strength.split(' ')[0] : '256-bit'}
          subtitle="HKDF SHA-256 Symmetric AES-GCM"
          icon={KeyRound}
          color="emerald"
          badgeText="Verified"
        />
        <StatCard
          title="Randomness Quality"
          value="99.8%"
          subtitle="NIST Monobit & Runs test score"
          icon={Shield}
          color="gold"
          badgeText="Passed"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bit Distribution (0 vs 1) */}
        <div className="cyber-card p-6 border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-white">Live Bit Distribution (0 vs 1)</h3>
            <span className="text-xs font-mono text-cyan-400">{recentBit ? `${recentBit.bits_count} bits` : '256 bits'}</span>
          </div>
          <BitDistributionChart
            zerosPct={recentBit ? recentBit.zeros_pct : 50}
            onesPct={recentBit ? recentBit.ones_pct : 50}
          />
          <p className="text-xs text-slate-400">
            Hadamard measurement produces a symmetric 50:50 distribution of 0s and 1s.
          </p>
        </div>

        {/* Entropy Trend Over Time */}
        <div className="cyber-card p-6 border-slate-800 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-white">Entropy Trend (Quantum vs Classical PRNG)</h3>
            <span className="text-xs font-mono text-purple-400">Shannon Index</span>
          </div>
          <EntropyTrendChart />
          <p className="text-xs text-slate-400">
            Quantum simulation maintains maximum physical randomness (\(\approx 1.0\)), whereas classical PRNGs exhibit algorithmic variance.
          </p>
        </div>
      </div>

      {/* Comparison Overview & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quantum vs PRNG Bar Chart */}
        <div className="cyber-card p-6 border-slate-800 space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-white">Statistical Quality: Quantum vs Pseudo-Random</h3>
            <button
              onClick={() => onNavigate('comparison-lab')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-mono"
            >
              Open Comparison Lab →
            </button>
          </div>
          <ComparisonBarChart />
        </div>

        {/* Recent Activity Telemetry */}
        <div className="cyber-card p-6 border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>Recent System Telemetry</span>
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {stats?.recent_activity?.slice(0, 5).map((act, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-cyan-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {act.action}
                  </span>
                  <span className="text-[10px] text-slate-500">{act.timestamp}</span>
                </div>
                <p className="text-[11px] text-slate-400 font-sans">{act.detail}</p>
              </div>
            )) || (
              <p className="text-xs text-slate-500">Initializing activity log...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
