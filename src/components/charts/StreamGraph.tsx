import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

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

export default function StreamGraphComponent({ data }: { data: any[] }) {
  return (
    <ChartCard title="Stream Graph" subtitle="Layered flow visualization">
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} stackOffset="wiggle">
          <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tooltip} />
          <Area type="monotone" dataKey="mobile" stackId="1" stroke="none" fill="#6366f1" fillOpacity={0.7} />
          <Area type="monotone" dataKey="desktop" stackId="1" stroke="none" fill="#8b5cf6" fillOpacity={0.7} />
          <Area type="monotone" dataKey="tablet" stackId="1" stroke="none" fill="#a78bfa" fillOpacity={0.7} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
