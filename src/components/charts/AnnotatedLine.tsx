import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, ReferenceDot } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function AnnotatedLineComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  return (
    <ChartCard title="Annotated Trend" subtitle="Key milestones highlighted">
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={theme.gridColor} />
          <XAxis dataKey="month" tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: theme.textMuted, fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip {...tt} />
          <ReferenceLine y={6000} stroke={theme.negative} strokeDasharray="4 4" label={{ value: 'Target', fill: theme.negative, fontSize: 10 }} />
          <Line type="monotone" dataKey="revenue" stroke={theme.colors[0]} strokeWidth={2.5} dot={false} />
          <ReferenceDot x="Jun" y={6200} r={5} fill={theme.colors[1]} stroke="white" />
          <ReferenceDot x="Dec" y={8200} r={5} fill={theme.positive} stroke="white" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
