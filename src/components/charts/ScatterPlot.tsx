import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';

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

export default function ScatterPlotComponent({ data }: { data: any[] }) {
  const catA = data.filter(d => d.category === 'A');
  const catB = data.filter(d => d.category === 'B');
  const catC = data.filter(d => d.category === 'C');
  return (
    <ChartCard title="Correlation Analysis" subtitle="Multi-dimensional scatter plot">
      <ResponsiveContainer width="100%" height={240}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="x" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} name="X" />
          <YAxis dataKey="y" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} name="Y" />
          <ZAxis dataKey="z" range={[40, 400]} />
          <Tooltip {...tooltip} />
          <Scatter data={catA} fill="#6366f1" fillOpacity={0.7} />
          <Scatter data={catB} fill="#8b5cf6" fillOpacity={0.7} />
          <Scatter data={catC} fill="#a78bfa" fillOpacity={0.7} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
