import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function AreaSplineComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  return (
    <ChartCard title="Spline Area" subtitle="Smooth interpolation curve">
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="splineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={theme.colors[0]} stopOpacity={0.4} />
              <stop offset="100%" stopColor={theme.negative} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="month" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tt} />
          <Area type="natural" dataKey="revenue" stroke={theme.colors[0]} fill="url(#splineGrad)" strokeWidth={2.5} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
