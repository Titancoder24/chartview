import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>{`${((percent ?? 0) * 100).toFixed(0)}%`}</text>;
};

export default function PieChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  return (
    <ChartCard title="Device Breakdown" subtitle="Traffic by device type">
      <ResponsiveContainer width="100%" height={240}>
        <RePieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value" labelLine={false} label={renderLabel} strokeWidth={0}>
            {data.map((_, i) => <Cell key={i} fill={theme.colors[i % theme.colors.length]} />)}
          </Pie>
          <Tooltip {...tt} />
        </RePieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
