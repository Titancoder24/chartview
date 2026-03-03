const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const boxData = [
  { name: 'Q1', min: 12, q1: 28, median: 42, q3: 58, max: 78 },
  { name: 'Q2', min: 18, q1: 32, median: 48, q3: 62, max: 82 },
  { name: 'Q3', min: 22, q1: 38, median: 55, q3: 68, max: 88 },
  { name: 'Q4', min: 15, q1: 35, median: 52, q3: 72, max: 92 },
];

export default function BoxPlotComponent() {
  const svgW = 400, svgH = 200;
  const maxVal = 100;
  const barW = 40;
  const scale = (v: number) => svgH - 20 - ((v / maxVal) * (svgH - 40));

  return (
    <ChartCard title="Box Plot" subtitle="Statistical distribution by quarter">
      <svg width="100%" height={svgH + 30} viewBox={`0 0 ${svgW} ${svgH + 30}`} preserveAspectRatio="xMidYMid meet">
        {boxData.map((d, i) => {
          const x = 60 + i * 80;
          return (
            <g key={i}>
              <line x1={x + barW / 2} y1={scale(d.max)} x2={x + barW / 2} y2={scale(d.min)} stroke="#4b5563" strokeWidth={1.5} />
              <line x1={x + 8} y1={scale(d.max)} x2={x + barW - 8} y2={scale(d.max)} stroke="#6b7280" strokeWidth={1.5} />
              <line x1={x + 8} y1={scale(d.min)} x2={x + barW - 8} y2={scale(d.min)} stroke="#6b7280" strokeWidth={1.5} />
              <rect x={x} y={scale(d.q3)} width={barW} height={scale(d.q1) - scale(d.q3)}
                rx={4} fill="#6366f1" fillOpacity={0.3} stroke="#6366f1" strokeWidth={1.5} />
              <line x1={x} y1={scale(d.median)} x2={x + barW} y2={scale(d.median)} stroke="#a78bfa" strokeWidth={2} />
              <text x={x + barW / 2} y={svgH + 10} textAnchor="middle" fill="#6b7280" fontSize={11}>{d.name}</text>
            </g>
          );
        })}
      </svg>
    </ChartCard>
  );
}
