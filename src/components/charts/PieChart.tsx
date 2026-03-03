import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function PieChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();

  const tooltip = {
    contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary },
  };

  return (
    <ChartCard title="Device Distribution" subtitle="Traffic by device type">
      <ResponsiveContainer width="100%" height={240}>
        <RePieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value" stroke="none" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
            {data.map((_, i) => <Cell key={i} fill={theme.colors[i % theme.colors.length]} />)}
          </Pie>
          <Tooltip {...tooltip} />
          <Legend wrapperStyle={{ fontSize: '11px', color: theme.textMuted }} />
        </RePieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
