import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function DonutChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();

  const tooltip = {
    contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary },
  };

  return (
    <ChartCard title="Market Share" subtitle="Browser usage distribution">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={3} dataKey="value" stroke="none">
            {data.map((_, i) => <Cell key={i} fill={theme.colors[i % theme.colors.length]} />)}
          </Pie>
          <Tooltip {...tooltip} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
