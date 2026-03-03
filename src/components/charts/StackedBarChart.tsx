import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

export default function StackedBarChartComponent({ data }: { data: any[] }) {
  return (
    <ChartCard title="Platform Revenue" subtitle="Stacked bar by device">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tooltip} />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} />
          <Bar dataKey="mobile" stackId="a" fill="#6366f1" radius={[0, 0, 0, 0]} />
          <Bar dataKey="desktop" stackId="a" fill="#8b5cf6" />
          <Bar dataKey="tablet" stackId="a" fill="#a78bfa" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
