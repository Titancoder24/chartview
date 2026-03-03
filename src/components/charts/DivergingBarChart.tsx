import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function DivergingBarChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();

  const tooltip = {
    contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary },
  };

  return (
    <ChartCard title="Sentiment Analysis" subtitle="Positive vs negative scores">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="category" tick={{ fill: theme.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tooltip} />
          <ReferenceLine y={0} stroke={theme.gridColor} />
          <Bar dataKey="positive" fill={theme.positive} radius={[4, 4, 0, 0]} />
          <Bar dataKey="negative" fill={theme.negative} radius={[0, 0, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
