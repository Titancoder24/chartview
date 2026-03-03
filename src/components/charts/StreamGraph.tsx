import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function StreamGraphComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();

  const tooltip = {
    contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary },
  };

  return (
    <ChartCard title="Stream Graph" subtitle="Organic flow visualization">
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} stackOffset="wiggle">
          <XAxis dataKey="month" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tooltip} />
          <Area type="monotone" dataKey="mobile" stackId="1" stroke="none" fill={theme.colors[0]} fillOpacity={0.7} />
          <Area type="monotone" dataKey="desktop" stackId="1" stroke="none" fill={theme.colors[1]} fillOpacity={0.7} />
          <Area type="monotone" dataKey="tablet" stackId="1" stroke="none" fill={theme.colors[2]} fillOpacity={0.7} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
