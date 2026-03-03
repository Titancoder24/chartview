const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

interface GaugeItem { label: string; value: number; max: number; color: string }

function Gauge({ label, value, max, color }: GaugeItem) {
  const pct = (value / max) * 100;
  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference - (pct / 100) * circumference * 0.75;
  return (
    <div className="flex flex-col items-center">
      <svg width="100" height="80" viewBox="0 0 100 80">
        <path d="M 10 70 A 40 40 0 1 1 90 70" fill="none" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
        <path d="M 10 70 A 40 40 0 1 1 90 70" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75}`} strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
        <text x="50" y="55" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">{value}%</text>
      </svg>
      <p className="text-gray-400 text-xs mt-1">{label}</p>
    </div>
  );
}

export default function GaugeChartComponent({ data }: { data: GaugeItem[] }) {
  return (
    <ChartCard title="System Health" subtitle="Real-time resource utilization">
      <div className="grid grid-cols-4 gap-2">
        {data.map((g, i) => <Gauge key={i} {...g} />)}
      </div>
    </ChartCard>
  );
}
