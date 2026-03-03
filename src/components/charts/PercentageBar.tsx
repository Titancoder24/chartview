const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#7c3aed'];

export default function PercentageBarComponent({ data }: { data: { name: string; value: number }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <ChartCard title="Share Breakdown" subtitle="100% stacked percentage bar">
      <div className="space-y-4">
        <div className="h-8 rounded-xl overflow-hidden flex">
          {data.map((d, i) => (
            <div key={i} className="h-full transition-all duration-500 hover:brightness-125 first:rounded-l-xl last:rounded-r-xl"
              style={{ width: `${(d.value / total) * 100}%`, backgroundColor: COLORS[i % COLORS.length] }} />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
              <span className="text-gray-400 text-xs">{d.name}</span>
              <span className="text-white text-xs font-semibold">{((d.value / total) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}
