import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#7c3aed'];

const tooltip = {
  contentStyle: { background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px', color: '#e5e7eb' },
};

export default function PieChartComponent({ data }: { data: any[] }) {
  return (
    <ChartCard title="Device Distribution" subtitle="Traffic by device type">
      <ResponsiveContainer width="100%" height={240}>
        <RePieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value" stroke="none" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip {...tooltip} />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} />
        </RePieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
