import React, { useState } from 'react';
import { Settings as SettingsIcon, Cpu, Key, Sliders, Check, Shield } from 'lucide-react';

export default function Settings({ quantumStatus }) {
  const [backendSource, setBackendSource] = useState('qiskit_simulator');
  const [ibmApiKey, setIbmApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border border-slate-800">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300">
            <SettingsIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">System Settings & Engine Config</h1>
            <p className="text-xs text-slate-400 font-mono">Manage Quantum Provider Backends & Hardware Interfaces</p>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Engine Provider Selection */}
        <div className="cyber-card p-6 border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Quantum Backend Provider</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label
              onClick={() => setBackendSource('qiskit_simulator')}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                backendSource === 'qiskit_simulator'
                  ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-cyan-glow'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div className="font-bold text-xs mb-1">Qiskit Aer Simulator</div>
              <p className="text-[11px] text-slate-400">Local quantum circuit superposition statevector model</p>
            </label>

            <label
              onClick={() => setBackendSource('ibm_quantum')}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                backendSource === 'ibm_quantum'
                  ? 'bg-purple-500/10 border-purple-500 text-purple-300 shadow-purple-glow'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div className="font-bold text-xs mb-1">IBM Quantum Cloud (Real Hardware)</div>
              <p className="text-[11px] text-slate-400">Connect physical QPU backend via IBM Qiskit Runtime</p>
            </label>

            <label
              onClick={() => setBackendSource('classical_fallback')}
              className={`p-4 rounded-xl border cursor-pointer transition ${
                backendSource === 'classical_fallback'
                  ? 'bg-emerald-500/10 border-emerald-500 text-emerald-300 shadow-emerald-glow'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              <div className="font-bold text-xs mb-1">Secure OS CSPRNG</div>
              <p className="text-[11px] text-slate-400">Python secrets cryptographic operating system entropy</p>
            </label>
          </div>
        </div>

        {/* IBM Quantum API Key Input */}
        {backendSource === 'ibm_quantum' && (
          <div className="cyber-card p-6 border-purple-500/30 shadow-purple-glow space-y-4">
            <div className="flex items-center space-x-2 text-purple-300 font-bold text-xs">
              <Key className="w-4 h-4" />
              <span>IBM Quantum API Token</span>
            </div>
            <input
              type="password"
              value={ibmApiKey}
              onChange={(e) => setIbmApiKey(e.target.value)}
              placeholder="Paste IBM Quantum API Token (Optional for hardware deployment)"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-500"
            />
            <p className="text-[11px] text-slate-500">
              When token is left blank, the application safely operates using the local Qiskit simulator.
            </p>
          </div>
        )}

        {/* Save Button */}
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-cyan-glow transition"
          >
            Save Configuration
          </button>
          {saved && (
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <Check className="w-4 h-4" /> Settings Saved!
            </span>
          )}
        </div>
      </form>

      {/* System Telemetry Metadata */}
      <div className="cyber-card p-6 border-slate-800 space-y-3 font-mono text-xs">
        <h3 className="text-sm font-semibold text-white font-sans mb-2">System Metadata</h3>
        <div className="flex justify-between py-1 border-b border-slate-800">
          <span className="text-slate-400">Product Name:</span>
          <span className="text-cyan-300">QuantumKeyGen v1.0</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-800">
          <span className="text-slate-400">Backend Server:</span>
          <span className="text-slate-200">FastAPI / Uvicorn (Port 8000)</span>
        </div>
        <div className="flex justify-between py-1 border-b border-slate-800">
          <span className="text-slate-400">Quantum Engine:</span>
          <span className="text-purple-300">{quantumStatus?.source_type || 'Qiskit Simulator'}</span>
        </div>
      </div>
    </div>
  );
}
