import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceArea } from 'recharts';

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

export default function AnnotatedLineComponent({ data }: { data: any[] }) {
  return (
    <ChartCard title="Annotated Timeline" subtitle="Key events highlighted on trend">
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tooltip} />
          <ReferenceArea x1="Mar" x2="May" fill="#6366f1" fillOpacity={0.05} />
          <ReferenceLine x="Jun" stroke="#8b5cf6" strokeDasharray="4 4" label={{ value: 'Launch', fill: '#8b5cf6', fontSize: 10, position: 'top' }} />
          <ReferenceLine y={6000} stroke="#374151" strokeDasharray="3 3" label={{ value: 'Target', fill: '#6b7280', fontSize: 10, position: 'right' }} />
          <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} dot={{ r: 3, fill: '#6366f1' }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
