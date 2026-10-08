import React from 'react';
import { BookOpen, Atom, Shield, KeyRound, HelpCircle, Cpu, CheckCircle2 } from 'lucide-react';

export default function Documentation() {
  const sections = [
    {
      title: 'What is Quantum Random Number Generation (QRNG)?',
      icon: Atom,
      color: 'text-cyan-400',
      content: (
        <p>
          Quantum Random Number Generation uses fundamental quantum mechanical principles to produce random bits. 
          Unlike classical algorithms that generate numbers using mathematical functions, quantum randomness relies on 
          physically probabilistic outcomes such as qubit measurement after applying a Hadamard gate.
        </p>
      )
    },
    {
      title: 'Why Pseudo-Random Numbers Can Be Deterministic (PRNG vs CSPRNG vs QRNG)',
      icon: Cpu,
      color: 'text-purple-400',
      content: (
        <div className="space-y-3">
          <p>Classical computers cannot naturally generate pure random numbers. Instead, they use algorithms:</p>
          <ul className="space-y-2 list-disc list-inside text-slate-300">
            <li>
              <strong className="text-amber-400 font-mono">PRNG (Pseudo-Random Number Generator):</strong> Uses deterministic mathematical formulas (e.g. Mersenne Twister). Given the initial seed value, the entire future sequence is 100% predictable.
            </li>
            <li>
              <strong className="text-purple-400 font-mono">CSPRNG (Cryptographically Secure PRNG):</strong> Uses operating system entropy sources (mouse movements, hardware timing) to make seed prediction computationally infeasible.
            </li>
            <li>
              <strong className="text-cyan-400 font-mono">QRNG (Quantum Random Number Generator):</strong> Obtains randomness directly from physical quantum mechanical superposition collapse, offering true physical unpredictability.
            </li>
          </ul>
        </div>
      )
    },
    {
      title: 'What is a Qubit and a Hadamard Gate?',
      icon: Atom,
      color: 'text-cyan-400',
      content: (
        <div className="space-y-3">
          <p>
            A classical bit can exist only as a <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">0</code> or a <code className="text-cyan-300 bg-slate-900 px-1 py-0.5 rounded">1</code>. A quantum bit (qubit) can exist in a linear combination of both states simultaneously, known as a <strong className="text-white">superposition</strong>:
          </p>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-cyan-300">
            |ψ⟩ = (|0⟩ + |1⟩) / √2
          </div>
          <p>
            The <strong className="text-purple-300">Hadamard Gate (H)</strong> transforms a computational basis state |0⟩ into an equal 50:50 superposition state. When the qubit is measured, it probabilistically collapses into either 0 or 1 with equal 50% likelihood.
          </p>
        </div>
      )
    },
    {
      title: 'Why Does Randomness Matter for Cryptographic Keys?',
      icon: Shield,
      color: 'text-emerald-400',
      content: (
        <p>
          Modern symmetric cryptography (AES-256-GCM) and asymmetric key exchange rely on key unpredictability. 
          If an attacker can predict or narrow down the random seed used to create a key, they can reproduce the key 
          and decrypt sensitive data without needing to brute force all \(2^{256}\) combinations. Quantum randomness ensures key materials remain unpredictable.
        </p>
      )
    },
    {
      title: 'Simulation Notice & Hardware Abstraction',
      icon: HelpCircle,
      color: 'text-amber-400',
      content: (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 space-y-2">
          <p className="font-bold">Transparent Disclosure on Simulation vs Hardware:</p>
          <p className="text-amber-200/80 leading-relaxed">
            This application uses a Qiskit statevector / Aer quantum simulator engine to model quantum mechanics. 
            While simulated quantum randomness follows quantum laws, classical computers simulating quantum circuits operate deterministically at the CPU level. 
            QuantumKeyGen includes an extensible <code className="bg-slate-900 px-1 py-0.5 rounded">QuantumRandomSource</code> interface to connect genuine IBM Quantum hardware backends when API access is configured.
          </p>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Quantum & Cryptography Documentation</h1>
            <p className="text-xs text-slate-400 font-mono">Educational Reference Guide to Quantum Mechanics and Key Security</p>
          </div>
        </div>
      </div>

      {/* Sections Grid */}
      <div className="space-y-6">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div key={idx} className="cyber-card p-6 border-slate-800 space-y-4">
              <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                <Icon className={`w-5 h-5 ${sec.color}`} />
                <h3 className="text-base font-bold text-white tracking-wide">{sec.title}</h3>
              </div>
              <div className="text-xs text-slate-300 leading-relaxed font-sans">
                {sec.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
