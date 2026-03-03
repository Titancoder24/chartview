import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

const outer = [{ name: 'A', value: 40 }, { name: 'B', value: 30 }, { name: 'C', value: 20 }, { name: 'D', value: 10 }];
const inner = [{ name: 'X', value: 55 }, { name: 'Y', value: 25 }, { name: 'Z', value: 20 }];

export default function NestedDonutComponent() {
  const { theme } = useTheme();
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  return (
    <ChartCard title="Nested Rings" subtitle="Multi-level donut chart">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie data={outer} cx="50%" cy="50%" outerRadius={90} innerRadius={68} dataKey="value" paddingAngle={2} strokeWidth={0}>
            {outer.map((_, i) => <Cell key={i} fill={theme.colors[i]} />)}
          </Pie>
          <Pie data={inner} cx="50%" cy="50%" outerRadius={60} innerRadius={40} dataKey="value" paddingAngle={3} strokeWidth={0}>
            {inner.map((_, i) => <Cell key={i} fill={theme.colors[(i + 2) % theme.colors.length]} />)}
          </Pie>
          <Tooltip {...tt} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
