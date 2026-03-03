import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const tooltip = {
  contentStyle: { background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px', color: '#e5e7eb' },
};

export default function ComparisonRadarComponent({ data }: { data: any[] }) {
  return (
    <ChartCard title="Competitive Analysis" subtitle="Us vs competitor across dimensions">
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data}>
          <PolarGrid stroke="#1e293b" />
          <PolarAngleAxis dataKey="feature" tick={{ fill: '#9ca3af', fontSize: 10 }} />
          <Tooltip {...tooltip} />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} />
          <Radar name="Us" dataKey="ours" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} strokeWidth={2} />
          <Radar name="Competitor" dataKey="competitor" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
