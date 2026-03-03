import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function RevenueExpenseChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  return (
    <ChartCard title="Revenue & Expenses" subtitle="Bar-line combo chart">
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="month" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tt} />
          <Legend wrapperStyle={{ fontSize: '11px', color: theme.textSecondary }} />
          <Bar dataKey="revenue" fill={theme.colors[0]} radius={[4, 4, 0, 0]} barSize={20} />
          <Bar dataKey="expenses" fill={theme.gridColor} radius={[4, 4, 0, 0]} barSize={20} />
          <Line type="monotone" dataKey="profit" stroke={theme.positive} strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
