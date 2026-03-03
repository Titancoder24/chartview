import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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

const outer = [
  { name: 'Chrome', value: 64 },
  { name: 'Safari', value: 19 },
  { name: 'Firefox', value: 4 },
  { name: 'Edge', value: 5 },
  { name: 'Other', value: 8 },
];

const inner = [
  { name: 'Desktop', value: 55 },
  { name: 'Mobile', value: 38 },
  { name: 'Tablet', value: 7 },
];

const OUTER_COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#4c1d95'];
const INNER_COLORS = ['#818cf8', '#a78bfa', '#c4b5fd'];

export default function NestedDonutComponent() {
  return (
    <ChartCard title="Nested Ring Chart" subtitle="Browser & device distribution">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={outer} cx="50%" cy="50%" outerRadius={95} innerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
            {outer.map((_, i) => <Cell key={i} fill={OUTER_COLORS[i]} />)}
          </Pie>
          <Pie data={inner} cx="50%" cy="50%" outerRadius={62} innerRadius={42} paddingAngle={3} dataKey="value" stroke="none">
            {inner.map((_, i) => <Cell key={i} fill={INNER_COLORS[i]} />)}
          </Pie>
          <Tooltip {...tooltip} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
