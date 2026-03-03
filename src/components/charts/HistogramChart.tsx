import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function HistogramChartComponent({ data }: { data: { value: number }[] }) {
  const { theme } = useTheme();
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  const bins = 20;
  const values = data.map(d => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const binSize = (max - min) / bins;
  const histogram = Array.from({ length: bins }, (_, i) => {
    const lo = min + i * binSize;
    const hi = lo + binSize;
    const count = values.filter(v => v >= lo && (i === bins - 1 ? v <= hi : v < hi)).length;
    return { range: `${Math.round(lo)}-${Math.round(hi)}`, count };
  });

  return (
    <ChartCard title="Distribution" subtitle="Value frequency histogram">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={histogram}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="range" tick={{ fill: theme.textMuted, fontSize: 8 }} axisLine={false} tickLine={false} interval={3} />
          <YAxis tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tt} />
          <Bar dataKey="count" fill={theme.colors[0]} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
