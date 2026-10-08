import React from 'react';
import { Menu, Zap, Shield, Cpu, Activity, RefreshCw } from 'lucide-react';

export default function Header({
  setIsOpen,
  activePage,
  setActivePage,
  quantumStatus,
  onQuickGenerate,
  isGenerating
}) {
  const isOnline = quantumStatus?.engine_status === 'ONLINE';

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#090D16]/80 backdrop-blur-xl border-b border-slate-800 px-4 lg:px-8 flex items-center justify-between">
      {/* Left section: Mobile menu & Page Title */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-lg font-semibold text-white capitalize tracking-wide flex items-center gap-2">
            {activePage.replace('-', ' ')}
          </h2>
        </div>
      </div>

      {/* Right section: Telemetry badges & Generate button */}
      <div className="flex items-center space-x-3">
        {/* Engine Status Badge */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="text-slate-400">Engine:</span>
          <span className={`font-mono font-semibold ${isOnline ? 'text-cyan-400' : 'text-amber-400'}`}>
            {quantumStatus?.engine_status || 'SIMULATOR'}
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
        </div>

        {/* Security Status Badge */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
          <Shield className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-400">Security:</span>
          <span className="font-mono font-semibold text-emerald-400">SECURE</span>
        </div>

        {/* Quick Generate Action Button */}
        <button
          onClick={onQuickGenerate}
          disabled={isGenerating}
          className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs shadow-cyan-glow transition-all duration-200 active:scale-95 disabled:opacity-50"
        >
          {isGenerating ? (
            <RefreshCw className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Zap className="w-4 h-4 text-cyan-200 fill-cyan-200" />
          )}
          <span className="hidden sm:inline">Quick Generate</span>
        </button>
      </div>
    </header>
  );
}
