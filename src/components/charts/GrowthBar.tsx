import { TrendingUp, TrendingDown } from 'lucide-react';

const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

export default function GrowthBarComponent({ data }: { data: any[] }) {
  const max = Math.max(...data.map(d => d.sales));
  return (
    <ChartCard title="Growth Indicators" subtitle="Sales with growth badges">
      <div className="space-y-3">
        {data.map((d, i) => (
          <div key={i} className="group">
            <div className="flex justify-between mb-1">
              <span className="text-gray-300 text-xs">{d.product}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-xs">${(d.sales / 1000).toFixed(0)}K</span>
                <span className={`text-[10px] flex items-center gap-0.5 ${d.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {d.growth >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {d.growth >= 0 ? '+' : ''}{d.growth}%
                </span>
              </div>
            </div>
            <div className="h-2 rounded-full bg-[#111827] overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700 group-hover:brightness-125"
                style={{
                  width: `${(d.sales / max) * 100}%`,
                  background: d.growth >= 0
                    ? 'linear-gradient(90deg, #6366f1, #8b5cf6)'
                    : 'linear-gradient(90deg, #ef4444, #f87171)'
                }} />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
