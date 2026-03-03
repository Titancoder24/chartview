const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

function Ring({ value, max, label, color, size = 80 }: { value: number; max: number; label: string; color: string; size?: number }) {
  const pct = value / max;
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - pct);
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1e293b" strokeWidth="6" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
        <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="14" fontWeight="bold">
          {Math.round(pct * 100)}%
        </text>
      </svg>
      <p className="text-gray-400 text-xs mt-2">{label}</p>
    </div>
  );
}

export default function RadialProgressComponent() {
  const items = [
    { value: 85, max: 100, label: 'Design', color: '#6366f1' },
    { value: 62, max: 100, label: 'Backend', color: '#8b5cf6' },
    { value: 45, max: 100, label: 'Testing', color: '#a78bfa' },
    { value: 91, max: 100, label: 'Deploy', color: '#22c55e' },
  ];
  return (
    <ChartCard title="Sprint Progress" subtitle="Radial progress indicators">
      <div className="flex justify-around">
        {items.map((item, i) => <Ring key={i} {...item} />)}
      </div>
    </ChartCard>
  );
}
