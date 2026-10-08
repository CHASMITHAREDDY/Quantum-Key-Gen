import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import QuantumRNG from './pages/QuantumRNG';
import KeyGenerator from './pages/KeyGenerator';
import RandomnessAnalysis from './pages/RandomnessAnalysis';
import ComparisonLab from './pages/ComparisonLab';
import SecurityLab from './pages/SecurityLab';
import Documentation from './pages/Documentation';
import Settings from './pages/Settings';
import { apiService } from './services/api';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quantumStatus, setQuantumStatus] = useState(null);
  const [stats, setStats] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const loadSystemData = async () => {
    try {
      const [statusData, statsData] = await Promise.all([
        apiService.getQuantumStatus().catch(() => null),
        apiService.getStatistics().catch(() => null)
      ]);
      if (statusData) setQuantumStatus(statusData);
      if (statsData) setStats(statsData);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadSystemData();
    const interval = setInterval(loadSystemData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await apiService.generateQuantumBits(256, 'quantum');
      showToast(`Generated 256 quantum bits (Entropy: ${res.entropy})`);
      loadSystemData();
    } catch (err) {
      showToast(`Generation error: ${err.message}`, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const showToast = (msg, type = 'info') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl border font-mono text-xs shadow-2xl flex items-center space-x-2 transition-all animate-bounce ${
          toastMessage.type === 'error'
            ? 'bg-rose-950/90 border-rose-500 text-rose-200'
            : 'bg-cyan-950/90 border-cyan-500 text-cyan-200 shadow-cyan-glow'
        }`}>
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        <Header
          setIsOpen={setSidebarOpen}
          activePage={activePage}
          setActivePage={setActivePage}
          quantumStatus={quantumStatus}
          onQuickGenerate={handleQuickGenerate}
          isGenerating={isGenerating}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {activePage === 'dashboard' && (
            <Dashboard stats={stats} onNavigate={setActivePage} />
          )}

          {activePage === 'quantum-rng' && (
            <QuantumRNG />
          )}

          {activePage === 'key-generator' && (
            <KeyGenerator />
          )}

          {activePage === 'randomness-analysis' && (
            <RandomnessAnalysis />
          )}

          {activePage === 'comparison-lab' && (
            <ComparisonLab />
          )}

          {activePage === 'security-lab' && (
            <SecurityLab />
          )}

          {activePage === 'documentation' && (
            <Documentation />
          )}

          {activePage === 'settings' && (
            <Settings quantumStatus={quantumStatus} />
          )}
        </main>

        {/* Footer */}
        <footer className="py-6 px-8 border-t border-slate-800 text-center text-xs text-slate-500 font-mono">
          <p>
            QuantumKeyGen © 2026 — Quantum Randomness for Trusted Cryptographic Keys
          </p>
          <p className="text-[11px] text-slate-600 mt-1">
            Research & Educational Prototype | Built with React, Vite, Qiskit & FastAPI
          </p>
        </footer>
      </div>
    </div>
  );
}
