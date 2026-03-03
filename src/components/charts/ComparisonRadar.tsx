import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function ComparisonRadarComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  return (
    <ChartCard title="Competitive Analysis" subtitle="Feature-by-feature comparison">
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data}>
          <PolarGrid stroke={theme.gridColor} />
          <PolarAngleAxis dataKey="feature" tick={{ fill: theme.textSecondary, fontSize: 10 }} />
          <Tooltip {...tt} />
          <Legend wrapperStyle={{ fontSize: '11px', color: theme.textSecondary }} />
          <Radar name="Ours" dataKey="ours" stroke={theme.colors[0]} fill={theme.colors[0]} fillOpacity={0.35} />
          <Radar name="Competitor" dataKey="competitor" stroke={theme.negative} fill={theme.negative} fillOpacity={0.15} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
