import { Radar, RadarChart as ReRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function RadarChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  return (
    <ChartCard title="Performance Profile" subtitle="Multi-axis radar comparison">
      <ResponsiveContainer width="100%" height={260}>
        <ReRadarChart data={data}>
          <PolarGrid stroke={theme.gridColor} />
          <PolarAngleAxis dataKey="metric" tick={{ fill: theme.textSecondary, fontSize: 10 }} />
          <PolarRadiusAxis angle={30} tick={{ fill: theme.textMuted, fontSize: 9 }} />
          <Tooltip {...tt} />
          <Legend wrapperStyle={{ fontSize: '11px', color: theme.textSecondary }} />
          <Radar name="Product A" dataKey="A" stroke={theme.colors[0]} fill={theme.colors[0]} fillOpacity={0.3} />
          <Radar name="Product B" dataKey="B" stroke={theme.colors[1]} fill={theme.colors[1]} fillOpacity={0.3} />
        </ReRadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
