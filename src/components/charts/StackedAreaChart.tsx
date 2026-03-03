import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function StackedAreaChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();

  const tooltip = {
    contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary },
  };

  return (
    <ChartCard title="Platform Traffic" subtitle="Stacked area by device type">
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="month" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tooltip} />
          <Area type="monotone" dataKey="mobile" stackId="1" stroke={theme.colors[0]} fill={theme.colors[0]} fillOpacity={0.6} />
          <Area type="monotone" dataKey="desktop" stackId="1" stroke={theme.colors[1]} fill={theme.colors[1]} fillOpacity={0.6} />
          <Area type="monotone" dataKey="tablet" stackId="1" stroke={theme.colors[2]} fill={theme.colors[2]} fillOpacity={0.6} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
