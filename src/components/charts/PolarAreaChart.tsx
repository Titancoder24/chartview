const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#7c3aed', '#c4b5fd', '#4c1d95'];
const segments = [
  { label: 'Organic', value: 35 },
  { label: 'Paid', value: 25 },
  { label: 'Social', value: 18 },
  { label: 'Email', value: 12 },
  { label: 'Referral', value: 7 },
  { label: 'Direct', value: 3 },
];

export default function PolarAreaChartComponent() {
  const cx = 110, cy = 110;
  const maxR = 90;
  const maxVal = Math.max(...segments.map(s => s.value));
  const angleStep = (2 * Math.PI) / segments.length;

  return (
    <ChartCard title="Polar Area Chart" subtitle="Traffic sources by magnitude">
      <div className="flex justify-center">
        <svg width="220" height="220" viewBox="0 0 220 220">
          {[0.25, 0.5, 0.75, 1].map((t, i) => (
            <circle key={i} cx={cx} cy={cy} r={maxR * t} fill="none" stroke="#1e293b" strokeWidth={0.5} />
          ))}
          {segments.map((seg, i) => {
            const r = (seg.value / maxVal) * maxR;
            const startAngle = i * angleStep - Math.PI / 2;
            const endAngle = (i + 1) * angleStep - Math.PI / 2;
            const x1 = cx + r * Math.cos(startAngle);
            const y1 = cy + r * Math.sin(startAngle);
            const x2 = cx + r * Math.cos(endAngle);
            const y2 = cy + r * Math.sin(endAngle);
            const largeArc = angleStep > Math.PI ? 1 : 0;
            return (
              <path key={i}
                d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={COLORS[i]} fillOpacity={0.6} stroke={COLORS[i]} strokeWidth={1} />
            );
          })}
          {segments.map((seg, i) => {
            const midAngle = (i + 0.5) * angleStep - Math.PI / 2;
            const labelR = maxR + 15;
            const lx = cx + labelR * Math.cos(midAngle);
            const ly = cy + labelR * Math.sin(midAngle);
            return (
              <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill="#9ca3af" fontSize={8}>
                {seg.label}
              </text>
            );
          })}
        </svg>
      </div>
    </ChartCard>
  );
}
