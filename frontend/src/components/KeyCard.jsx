import React, { useState } from 'react';
import { KeyRound, Copy, Check, Eye, EyeOff, ShieldAlert, Cpu, Fingerprint } from 'lucide-react';

export default function KeyCard({ keyData }) {
  const [showRaw, setShowRaw] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!keyData) return null;

  const handleCopy = () => {
    if (keyData.raw_key_hex) {
      navigator.clipboard.writeText(keyData.raw_key_hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="cyber-card-glow p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-cyan-glow">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white font-mono">{keyData.key_id}</h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                {keyData.key_size}-bit AES-GCM
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Derived: {new Date(keyData.generated_at).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Source Badge */}
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span className="text-slate-400">Source:</span>
          <span className="text-purple-300 font-semibold">{keyData.source}</span>
        </div>
      </div>

      {/* Secret Key Raw / Masked Display */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            Cryptographic Secret Key Material
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowRaw(!showRaw)}
              className="text-xs text-slate-400 hover:text-cyan-400 flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 transition"
            >
              {showRaw ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showRaw ? 'Mask Secret' : 'Reveal Secret'}</span>
            </button>
            <button
              onClick={handleCopy}
              className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 font-mono transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Key'}</span>
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-cyan-300 break-all select-all tracking-wider shadow-inner">
          {showRaw ? keyData.raw_key_hex : keyData.masked_key}
        </div>
      </div>

      {/* Key Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* SHA-256 Fingerprint */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
            <Fingerprint className="w-4 h-4 text-cyan-400" />
            <span>SHA-256 Key Fingerprint</span>
          </div>
          <p className="font-mono text-xs text-slate-200 break-all">{keyData.sha256_fingerprint}</p>
        </div>

        {/* Shannon Entropy */}
        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>Derived Entropy</span>
          </div>
          <p className="font-mono text-sm text-purple-300 font-semibold">
            {keyData.entropy} <span className="text-xs font-normal text-slate-400">bits / bit</span>
          </p>
        </div>
      </div>

      {/* Production Warning Banner */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start space-x-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-amber-200">PRODUCTION SECURITY NOTICE</span>
          <p className="text-amber-300/80 leading-relaxed">
            {keyData.warning}
          </p>
        </div>
      </div>
    </div>
  );
}
