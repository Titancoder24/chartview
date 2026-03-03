const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const axes = ['Speed', 'Power', 'Efficiency', 'Cost', 'Quality'];
const items = [
  { name: 'Alpha', values: [85, 72, 90, 55, 88], color: '#6366f1' },
  { name: 'Beta', values: [72, 88, 65, 78, 75], color: '#8b5cf6' },
  { name: 'Gamma', values: [90, 60, 82, 42, 95], color: '#a78bfa' },
  { name: 'Delta', values: [65, 95, 78, 88, 68], color: '#7c3aed' },
];

export default function ParallelCoordinatesComponent() {
  const svgW = 440, svgH = 200;
  const pad = 40;
  const axisGap = (svgW - pad * 2) / (axes.length - 1);
  const yScale = (v: number) => svgH - 30 - ((v / 100) * (svgH - 60));

  return (
    <ChartCard title="Parallel Coordinates" subtitle="Multi-dimensional product comparison">
      <svg width="100%" height={svgH + 20} viewBox={`0 0 ${svgW} ${svgH + 20}`} preserveAspectRatio="xMidYMid meet">
        {axes.map((ax, i) => {
          const x = pad + i * axisGap;
          return (
            <g key={i}>
              <line x1={x} y1={20} x2={x} y2={svgH - 30} stroke="#1e293b" strokeWidth={1} />
              <text x={x} y={svgH} textAnchor="middle" fill="#6b7280" fontSize={9}>{ax}</text>
            </g>
          );
        })}
        {items.map((item, i) => {
          const points = item.values.map((v, j) => `${pad + j * axisGap},${yScale(v)}`).join(' ');
          return (
            <polyline key={i} points={points} fill="none" stroke={item.color} strokeWidth={1.5} strokeOpacity={0.6}
              strokeLinecap="round" strokeLinejoin="round" />
          );
        })}
        {items.map((item, i) =>
          item.values.map((v, j) => (
            <circle key={`${i}-${j}`} cx={pad + j * axisGap} cy={yScale(v)} r={3} fill={item.color} />
          ))
        )}
      </svg>
      <div className="flex gap-4 mt-2 justify-center">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-gray-400 text-xs">{item.name}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
