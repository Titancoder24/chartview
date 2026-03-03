import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function GradientLineChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  return (
    <ChartCard title="Growth Trajectory" subtitle="Gradient area with smooth curve">
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="glGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.colors[1]} stopOpacity={0.5} />
              <stop offset="50%" stopColor={theme.colors[0]} stopOpacity={0.2} />
              <stop offset="100%" stopColor={theme.colors[0]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="month" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tt} />
          <Area type="monotone" dataKey="users" stroke={theme.colors[1]} fill="url(#glGrad)" strokeWidth={2.5} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
