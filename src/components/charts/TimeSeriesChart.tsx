import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function TimeSeriesChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();

  const tooltip = {
    contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary },
  };

  return (
    <ChartCard title="90-Day Trend" subtitle="Actual vs predicted values">
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data.slice(0, 45)}>
          <defs>
            <linearGradient id="tsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.colors[0]} stopOpacity={0.3} />
              <stop offset="100%" stopColor={theme.colors[0]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="date" tick={{ fill: theme.textMuted, fontSize: 9 }} axisLine={false} tickLine={false} interval={6} />
          <YAxis tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tooltip} />
          <Area type="monotone" dataKey="value" stroke={theme.colors[0]} fill="url(#tsGrad)" strokeWidth={2} />
          <Area type="monotone" dataKey="predicted" stroke={theme.colors[1]} fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
