import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function ScatterPlotComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  const catA = data.filter(d => d.category === 'A');
  const catB = data.filter(d => d.category === 'B');
  const catC = data.filter(d => d.category === 'C');
  return (
    <ChartCard title="Correlation Analysis" subtitle="Multi-dimensional scatter plot">
      <ResponsiveContainer width="100%" height={240}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="x" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} name="X" />
          <YAxis dataKey="y" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} name="Y" />
          <ZAxis dataKey="z" range={[40, 400]} />
          <Tooltip {...tt} />
          <Scatter data={catA} fill={theme.colors[0]} fillOpacity={0.7} />
          <Scatter data={catB} fill={theme.colors[1]} fillOpacity={0.7} />
          <Scatter data={catC} fill={theme.colors[2]} fillOpacity={0.7} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
