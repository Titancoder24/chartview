import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function BarChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  return (
    <ChartCard title="Product Sales" subtitle="Revenue by product category">
      <ResponsiveContainer width="100%" height={240}>
        <ReBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="product" tick={{ fill: theme.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} angle={-20} textAnchor="end" height={50} />
          <YAxis tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tt} />
          <Bar dataKey="sales" fill={theme.colors[0]} radius={[6, 6, 0, 0]} />
        </ReBarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
