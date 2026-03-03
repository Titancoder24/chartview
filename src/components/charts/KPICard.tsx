import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPI {
  title: string;
  value: string;
  change: number;
  trend: number[];
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80, h = 32;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  return (
    <svg width={w} height={h} className="ml-auto">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function KPICardComponent({ data }: { data: KPI[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {data.map((kpi, i) => (
        <div key={i} className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-5 hover:border-[#334155] transition-all duration-300">
          <p className="text-gray-500 text-xs font-medium uppercase tracking-wider">{kpi.title}</p>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-white text-2xl font-bold">{kpi.value}</p>
              <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${kpi.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {kpi.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {kpi.change >= 0 ? '+' : ''}{kpi.change}%
              </div>
            </div>
            <MiniSparkline data={kpi.trend} color={kpi.change >= 0 ? '#34d399' : '#f87171'} />
          </div>
        </div>
      ))}
    </div>
  );
}
