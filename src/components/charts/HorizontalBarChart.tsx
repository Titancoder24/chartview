import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function HorizontalBarChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();

  const tooltip = {
    contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary },
  };

  return (
    <ChartCard title="Category Rankings" subtitle="Horizontal bar comparison">
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} horizontal={false} />
          <XAxis type="number" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis dataKey="name" type="category" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
          <Tooltip {...tooltip} />
          <Bar dataKey="value" fill={theme.colors[0]} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
