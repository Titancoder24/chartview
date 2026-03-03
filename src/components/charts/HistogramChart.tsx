import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

export default function HistogramChartComponent({ data }: { data: { value: number }[] }) {
  const bins = 20;
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const binSize = (max - min) / bins;
  const histogram = Array.from({ length: bins }, (_, i) => {
    const lo = min + i * binSize;
    const hi = lo + binSize;
    const count = values.filter(v => v >= lo && (i === bins - 1 ? v <= hi : v < hi)).length;
    return { range: `${Math.round(lo)}-${Math.round(hi)}`, count };
  });

  return (
    <ChartCard title="Distribution" subtitle="Value frequency histogram">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={histogram}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="range" tick={{ fill: '#6b7280', fontSize: 8 }} axisLine={false} tickLine={false} interval={3} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tooltip} />
          <Bar dataKey="count" fill="#6366f1" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
