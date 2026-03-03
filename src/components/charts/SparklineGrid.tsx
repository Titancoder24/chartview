const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

function Sparkline({ data, color, label, value }: { data: number[]; color: string; label: string; value: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 120, h = 36;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(' ');
  const areaPoints = points + ` ${w},${h} 0,${h}`;
  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-[#111827] transition-colors">
      <div>
        <p className="text-gray-400 text-xs">{label}</p>
        <p className="text-white text-lg font-bold mt-0.5">{value}</p>
      </div>
      <svg width={w} height={h}>
        <polygon points={areaPoints} fill={color} fillOpacity={0.1} />
        <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function SparklineGridComponent({ data }: { data: Record<string, number[]> }) {
  const configs = [
    { key: 'revenue', label: 'Revenue', value: '$68K', color: '#6366f1' },
    { key: 'users', label: 'Active Users', value: '278', color: '#8b5cf6' },
    { key: 'orders', label: 'Orders', value: '88', color: '#a78bfa' },
    { key: 'latency', label: 'Latency', value: '25ms', color: '#22c55e' },
  ];
  return (
    <ChartCard title="Sparkline Metrics" subtitle="Inline trend indicators">
      <div className="space-y-1">
        {configs.map(c => (
          <Sparkline key={c.key} data={data[c.key] || []} color={c.color} label={c.label} value={c.value} />
        ))}
      </div>
    </ChartCard>
  );
}
