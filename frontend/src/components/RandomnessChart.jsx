import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

export function BitDistributionChart({ zerosPct = 50, onesPct = 50 }) {
  const data = [
    { name: 'Bit 0', percentage: zerosPct, fill: '#8B5CF6' },
    { name: 'Bit 1', percentage: onesPct, fill: '#06B6D4' }
  ];

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} />
          <YAxis stroke="#94A3B8" fontSize={12} domain={[0, 100]} unit="%" />
          <Tooltip
            contentStyle={{ backgroundColor: '#111827', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC' }}
            formatter={(val) => [`${val}%`, 'Proportion']}
          />
          <Bar dataKey="percentage" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EntropyTrendChart() {
  const historyData = [
    { sample: 'Gen 1', quantum: 0.9998, prng: 0.9850 },
    { sample: 'Gen 2', quantum: 0.9994, prng: 0.9780 },
    { sample: 'Gen 3', quantum: 1.0000, prng: 0.9820 },
    { sample: 'Gen 4', quantum: 0.9996, prng: 0.9750 },
    { sample: 'Gen 5', quantum: 0.9999, prng: 0.9810 },
    { sample: 'Gen 6', quantum: 0.9997, prng: 0.9790 },
  ];

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis dataKey="sample" stroke="#94A3B8" fontSize={12} />
          <YAxis stroke="#94A3B8" fontSize={12} domain={[0.95, 1.0]} />
          <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC' }} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <Line type="monotone" dataKey="quantum" name="Quantum Sim Entropy" stroke="#06B6D4" strokeWidth={2.5} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="prng" name="Classical PRNG Entropy" stroke="#F59E0B" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ComparisonBarChart({ quantumScore = 98.5, prngScore = 82.4 }) {
  const data = [
    { metric: 'Shannon Entropy', Quantum: 99.9, PRNG: 97.5 },
    { metric: 'Monobit P-Val', Quantum: 95.0, PRNG: 78.0 },
    { metric: 'Runs Test Score', Quantum: 94.0, PRNG: 81.0 },
    { metric: 'Overall Quality', Quantum: quantumScore, PRNG: prngScore },
  ];

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis dataKey="metric" stroke="#94A3B8" fontSize={11} />
          <YAxis stroke="#94A3B8" fontSize={11} domain={[0, 100]} unit="%" />
          <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC' }} />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <Bar dataKey="Quantum" fill="#06B6D4" radius={[4, 4, 0, 0]} />
          <Bar dataKey="PRNG" fill="#F59E0B" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ByteDistributionHistogram({ byteDistribution = [] }) {
  // Aggregate 256 byte bins into 16 chunk bins for clean visualization
  const bins = Array.from({ length: 16 }).map((_, idx) => {
    const startBin = idx * 16;
    const endBin = startBin + 15;
    let sum = 0;
    if (byteDistribution && byteDistribution.length === 256) {
      for (let i = startBin; i <= endBin; i++) {
        sum += byteDistribution[i] || 0;
      }
    }
    return {
      binRange: `${startBin}-${endBin}`,
      count: sum
    };
  });

  return (
    <div className="h-52 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={bins} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis dataKey="binRange" stroke="#94A3B8" fontSize={10} interval={1} />
          <YAxis stroke="#94A3B8" fontSize={11} />
          <Tooltip contentStyle={{ backgroundColor: '#111827', borderColor: '#334155', borderRadius: '8px', color: '#F8FAFC' }} />
          <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
