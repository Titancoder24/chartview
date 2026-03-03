import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function TreemapChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const treeData = data.map((d, i) => ({ ...d, fill: theme.colors[i % theme.colors.length] }));
  const tt = { contentStyle: { background: theme.tooltipBg, border: `1px solid ${theme.tooltipBorder}`, borderRadius: '12px', fontSize: '12px', color: theme.textPrimary } };
  return (
    <ChartCard title="Market Sectors" subtitle="Hierarchical treemap view">
      <ResponsiveContainer width="100%" height={240}>
        <Treemap data={treeData} dataKey="size" nameKey="name" stroke={theme.cardBg} fill={theme.colors[0]} aspectRatio={4 / 3}>
          <Tooltip {...tt} />
        </Treemap>
      </ResponsiveContainer>
    </ChartCard>
  );
}
