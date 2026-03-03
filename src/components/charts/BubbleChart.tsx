import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function BubbleChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();

  const tooltip = {
    contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary },
  };

  const groups = ['Tech', 'Finance', 'Health', 'Energy'];

  return (
    <ChartCard title="Market Landscape" subtitle="Company positioning bubble chart">
      <ResponsiveContainer width="100%" height={240}>
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="x" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} name="Revenue" />
          <YAxis dataKey="y" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} name="Growth" />
          <ZAxis dataKey="z" range={[40, 500]} />
          <Tooltip {...tooltip} />
          {groups.map((g, i) => (
            <Scatter key={g} name={g} data={data.filter(d => d.category === g)} fill={theme.colors[i % theme.colors.length]} fillOpacity={0.6} />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
