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

export default function WaffleChartComponent({ data }: { data: { name: string; value: number }[] }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const cells: string[] = [];
  data.forEach((d, idx) => {
    const count = Math.round((d.value / total) * 100);
    for (let i = 0; i < count && cells.length < 100; i++) cells.push(COLORS[idx % COLORS.length]);
  });
  while (cells.length < 100) cells.push('#1e293b');

  return (
    <ChartCard title="Market Composition" subtitle="Waffle grid visualization">
      <div className="grid grid-cols-10 gap-1 mb-4">
        {cells.map((color, i) => (
          <div key={i} className="aspect-square rounded-sm transition-all duration-200 hover:scale-110" style={{ backgroundColor: color }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            <span className="text-gray-400 text-xs">{d.name} ({d.value}%)</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
