import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function AreaComparisonChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();

  const tooltip = {
    contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary },
  };

  return (
    <ChartCard title="Year-over-Year" subtitle="This year vs last year">
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="acThisYear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.colors[0]} stopOpacity={0.4} />
              <stop offset="100%" stopColor={theme.colors[0]} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="acLastYear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.colors[1]} stopOpacity={0.4} />
              <stop offset="100%" stopColor={theme.colors[1]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="month" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tooltip} />
          <Legend wrapperStyle={{ fontSize: '11px', color: theme.textMuted }} />
          <Area type="monotone" dataKey="thisYear" stroke={theme.colors[0]} fill="url(#acThisYear)" strokeWidth={2} />
          <Area type="monotone" dataKey="lastYear" stroke={theme.colors[1]} fill="url(#acLastYear)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
