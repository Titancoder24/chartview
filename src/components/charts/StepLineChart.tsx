import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function StepLineChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  return (
    <ChartCard title="Step Function" subtitle="Pricing tier changes over time">
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="date" tick={{ fill: theme.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tt} />
          <Line type="stepAfter" dataKey="value" stroke={theme.colors[0]} strokeWidth={2.5} dot={{ r: 3, fill: theme.colors[0] }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
