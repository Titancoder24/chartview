import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

const COLORS: Record<string, string> = { Tech: '#6366f1', Finance: '#8b5cf6', Health: '#a78bfa', Energy: '#7c3aed' };

export default function BubbleChartComponent({ data }: { data: any[] }) {
  const groups = ['Tech', 'Finance', 'Health', 'Energy'];
  return (
    <ChartCard title="Market Landscape" subtitle="Companies by revenue, growth & market cap">
      <ResponsiveContainer width="100%" height={240}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="x" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} name="Revenue" />
          <YAxis dataKey="y" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} name="Growth" />
          <ZAxis dataKey="z" range={[40, 500]} />
          <Tooltip {...tooltip} />
          {groups.map(g => (
            <Scatter key={g} name={g} data={data.filter(d => d.category === g)} fill={COLORS[g]} fillOpacity={0.6} />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
