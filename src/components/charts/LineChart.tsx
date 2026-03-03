import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function LineChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  return (
    <ChartCard title="Weekly Traffic" subtitle="Visitors and page views">
      <ResponsiveContainer width="100%" height={240}>
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="day" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tt} />
          <Legend wrapperStyle={{ fontSize: '11px', color: theme.textSecondary }} />
          <Line type="monotone" dataKey="visitors" stroke={theme.colors[0]} strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="pageViews" stroke={theme.colors[1]} strokeWidth={2} dot={false} />
        </ReLineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
