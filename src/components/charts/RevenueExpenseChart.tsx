import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

export default function RevenueExpenseChartComponent({ data }: { data: any[] }) {
  return (
    <ChartCard title="Revenue & Expenses" subtitle="Bar-line combo chart">
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tooltip} />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#9ca3af' }} />
          <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
          <Bar dataKey="expenses" fill="#374151" radius={[4, 4, 0, 0]} barSize={20} />
          <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
