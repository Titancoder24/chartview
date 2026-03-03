import { ArrowUpRight, ArrowDownRight, Activity, Users, DollarSign, Zap } from 'lucide-react';

const metrics = [
  { icon: DollarSign, label: 'MRR', value: '$42.5K', change: '+12.5%', up: true, color: '#6366f1' },
  { icon: Users, label: 'DAU', value: '18,429', change: '+8.2%', up: true, color: '#8b5cf6' },
  { icon: Activity, label: 'Latency', value: '42ms', change: '-15.3%', up: true, color: '#22c55e' },
  { icon: Zap, label: 'Uptime', value: '99.98%', change: '+0.02%', up: true, color: '#a78bfa' },
];

export default function MetricCardsComponent() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        return (
          <div key={i} className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-5 hover:border-[#334155] transition-all duration-300 group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${m.color}15` }}>
                <Icon size={16} style={{ color: m.color }} />
              </div>
              <div className={`flex items-center gap-0.5 text-xs font-medium ${m.up ? 'text-emerald-400' : 'text-red-400'}`}>
                {m.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {m.change}
              </div>
            </div>
            <p className="text-white text-xl font-bold">{m.value}</p>
            <p className="text-gray-500 text-xs mt-0.5">{m.label}</p>
          </div>
        );
      })}
    </div>
  );
}
