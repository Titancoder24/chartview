import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function BubbleChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  const tech = data.filter(d => d.category === 'Tech');
  const finance = data.filter(d => d.category === 'Finance');
  const health = data.filter(d => d.category === 'Health');
  const energy = data.filter(d => d.category === 'Energy');
  return (
    <ChartCard title="Market Landscape" subtitle="Company positioning bubble chart">
      <ResponsiveContainer width="100%" height={240}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="x" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} name="Growth" />
          <YAxis dataKey="y" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} name="Revenue" />
          <ZAxis dataKey="z" range={[40, 600]} />
          <Tooltip {...tt} />
          <Scatter data={tech} fill={theme.colors[0]} fillOpacity={0.6} />
          <Scatter data={finance} fill={theme.colors[1]} fillOpacity={0.6} />
          <Scatter data={health} fill={theme.colors[2]} fillOpacity={0.6} />
          <Scatter data={energy} fill={theme.colors[3]} fillOpacity={0.6} />
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
