const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

interface WItem { name: string; value: number }

export default function WaterfallChartComponent({ data }: { data: WItem[] }) {
  let cumulative = 0;
  const bars = data.map((d, i) => {
    const isFirst = i === 0;
    const isLast = i === data.length - 1;
    const start = isFirst || isLast ? 0 : cumulative;
    const end = isFirst || isLast ? d.value : cumulative + d.value;
    if (!isFirst && !isLast) cumulative += d.value;
    else if (isFirst) cumulative = d.value;
    return { ...d, start: Math.min(start, end), height: Math.abs(end - start), positive: d.value >= 0 };
  });

  const maxVal = Math.max(...bars.map(b => b.start + b.height));
  const svgH = 200;
  const barW = 40;
  const gap = 12;
  const svgW = bars.length * (barW + gap) + gap;
  const scale = (v: number) => svgH - (v / maxVal) * svgH;

  return (
    <ChartCard title="P&L Waterfall" subtitle="Revenue breakdown to net income">
      <div className="overflow-x-auto">
        <svg width="100%" height={svgH + 30} viewBox={`0 0 ${svgW} ${svgH + 30}`} preserveAspectRatio="xMidYMid meet">
          {bars.map((b, i) => {
            const x = gap + i * (barW + gap);
            const y = scale(b.start + b.height);
            const h = (b.height / maxVal) * svgH;
            return (
              <g key={i}>
                <rect x={x} y={y} width={barW} height={Math.max(h, 2)} rx={4} fill={b.positive ? '#6366f1' : '#ef4444'} fillOpacity={0.8} />
                <text x={x + barW / 2} y={y - 6} textAnchor="middle" fill={b.positive ? '#818cf8' : '#fca5a5'} fontSize={10} fontWeight="600">
                  {b.value >= 0 ? '+' : ''}{(b.value / 1000).toFixed(0)}K
                </text>
                <text x={x + barW / 2} y={svgH + 15} textAnchor="middle" fill="#6b7280" fontSize={9}>{b.name}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </ChartCard>
  );
}
