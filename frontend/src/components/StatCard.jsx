import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'cyan', badgeText }) {
  const colorMap = {
    cyan: {
      border: 'border-cyan-500/20 hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
      glow: 'shadow-cyan-glow',
      text: 'text-cyan-400',
    },
    purple: {
      border: 'border-purple-500/20 hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
      glow: 'shadow-purple-glow',
      text: 'text-purple-400',
    },
    emerald: {
      border: 'border-emerald-500/20 hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      glow: 'shadow-emerald-glow',
      text: 'text-emerald-400',
    },
    gold: {
      border: 'border-amber-500/20 hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      glow: '',
      text: 'text-amber-400',
    }
  };

  const style = colorMap[color] || colorMap.cyan;

  return (
    <div className={`cyber-card p-5 transition-all duration-300 ${style.border}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className={`p-2 rounded-lg border ${style.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-bold text-white font-mono tracking-tight">{value}</h3>
        {badgeText && (
          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${style.iconBg}`}>
            {badgeText}
          </span>
        )}
      </div>

      {subtitle && <p className="text-xs text-slate-400 mt-2 font-sans">{subtitle}</p>}
    </div>
  );
}
