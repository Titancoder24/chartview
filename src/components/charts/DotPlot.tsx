const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

export default function DotPlotComponent({ data }: { data: any[] }) {
  const max = Math.max(...data.map(d => d.value));
  return (
    <ChartCard title="Ranking Dot Plot" subtitle="Lollipop-style ranking chart">
      <div className="space-y-3">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-gray-400 text-xs w-20 text-right">{d.name}</span>
            <div className="flex-1 relative h-4">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] bg-[#1e293b] w-full rounded" />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] bg-indigo-500/40 rounded" style={{ width: `${(d.value / max) * 100}%` }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-indigo-500 rounded-full border-2 border-[#0a0f1a] shadow-lg shadow-indigo-500/30"
                style={{ left: `calc(${(d.value / max) * 100}% - 6px)` }} />
            </div>
            <span className="text-gray-300 text-xs font-medium w-8">{d.value}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
