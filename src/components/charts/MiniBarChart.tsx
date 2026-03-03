const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

export default function MiniBarChartComponent({ data }: { data: any[] }) {
  const max = Math.max(...data.map(d => d.revenue));
  return (
    <ChartCard title="Monthly Snapshot" subtitle="Compact inline bar chart">
      <div className="flex items-end gap-1.5 h-32">
        {data.map((d, i) => {
          const h = (d.revenue / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md transition-all duration-500 hover:opacity-80"
                style={{ height: `${h}%`, background: 'linear-gradient(180deg, #6366f1, #4f46e5)' }} />
              <span className="text-gray-500 text-[9px]">{d.month.slice(0, 1)}</span>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
