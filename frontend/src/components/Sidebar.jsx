import React from 'react';
import {
  LayoutDashboard,
  Atom,
  KeyRound,
  BarChart3,
  GitCompare,
  ShieldAlert,
  BookOpen,
  Settings as SettingsIcon,
  X
} from 'lucide-react';

export default function Sidebar({ activePage, setActivePage, isOpen, setIsOpen }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'quantum-rng', label: 'Quantum RNG', icon: Atom },
    { id: 'key-generator', label: 'Key Generator', icon: KeyRound },
    { id: 'randomness-analysis', label: 'Randomness Analysis', icon: BarChart3 },
    { id: 'comparison-lab', label: 'Quantum vs Pseudo', icon: GitCompare },
    { id: 'security-lab', label: 'Security Lab', icon: ShieldAlert },
    { id: 'documentation', label: 'Documentation', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#0D1322]/90 backdrop-blur-xl border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-800/80">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActivePage('dashboard')}>
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-cyan-glow">
                <Atom className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-white tracking-wide flex items-center gap-1">
                  Quantum<span className="text-cyan-400">KeyGen</span>
                </h1>
                <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">Quantum Cybersecurity</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/10 text-cyan-300 border border-cyan-500/30 shadow-cyan-glow'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 mr-3 transition-colors ${
                      isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer Badge */}
          <div className="p-4 border-t border-slate-800/80">
            <div className="cyber-card p-3 text-xs text-slate-400">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-slate-300">Engine State</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  READY
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Qiskit Superposition Engine initialized.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
