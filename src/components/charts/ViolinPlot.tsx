const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const groups = [
  { name: 'Group A', widths: [2, 8, 18, 28, 35, 38, 35, 28, 18, 8, 2], color: '#6366f1' },
  { name: 'Group B', widths: [4, 12, 22, 30, 25, 18, 25, 30, 22, 12, 4], color: '#8b5cf6' },
  { name: 'Group C', widths: [1, 5, 15, 32, 38, 40, 38, 32, 15, 5, 1], color: '#a78bfa' },
];

export default function ViolinPlotComponent() {
  const svgW = 400, svgH = 220;
  const violinH = 160;
  const maxW = 40;

  return (
    <ChartCard title="Violin Plot" subtitle="Distribution shape comparison">
      <svg width="100%" height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="xMidYMid meet">
        {groups.map((g, gi) => {
          const cx = 80 + gi * 120;
          const points = g.widths;
          const step = violinH / (points.length - 1);
          const leftPath = points.map((w, i) => `${cx - (w / 40) * maxW},${20 + i * step}`);
          const rightPath = points.map((w, i) => `${cx + (w / 40) * maxW},${20 + i * step}`).reverse();
          const path = `M ${leftPath.join(' L ')} L ${rightPath.join(' L ')} Z`;
          return (
            <g key={gi}>
              <path d={path} fill={g.color} fillOpacity={0.25} stroke={g.color} strokeWidth={1.5} />
              <line x1={cx} y1={20} x2={cx} y2={20 + violinH} stroke={g.color} strokeWidth={1} strokeOpacity={0.3} />
              <circle cx={cx} cy={20 + violinH / 2} r={3} fill="white" />
              <text x={cx} y={svgH - 5} textAnchor="middle" fill="#6b7280" fontSize={11}>{g.name}</text>
            </g>
          );
        })}
      </svg>
    </ChartCard>
  );
}
