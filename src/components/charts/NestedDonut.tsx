import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

const outer = [
  { name: 'Chrome', value: 64 },
  { name: 'Safari', value: 19 },
  { name: 'Firefox', value: 4 },
  { name: 'Edge', value: 5 },
  { name: 'Other', value: 8 },
];

const inner = [
  { name: 'Desktop', value: 55 },
  { name: 'Mobile', value: 38 },
  { name: 'Tablet', value: 7 },
];

export default function NestedDonutComponent() {
  const { theme } = useTheme();
  const tooltip = {
    contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary },
  };

  return (
    <ChartCard title="Nested Rings" subtitle="Multi-level donut chart">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={outer} cx="50%" cy="50%" outerRadius={95} innerRadius={70} paddingAngle={2} dataKey="value" stroke="none">
            {outer.map((_, i) => <Cell key={i} fill={theme.colors[i % theme.colors.length]} />)}
          </Pie>
          <Pie data={inner} cx="50%" cy="50%" outerRadius={62} innerRadius={42} paddingAngle={3} dataKey="value" stroke="none">
            {inner.map((_, i) => <Cell key={i} fill={theme.colors[(i + 5) % theme.colors.length]} />)}
          </Pie>
          <Tooltip {...tooltip} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
