import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';
export default function WaffleChartComponent({ data }: { data: { name: string; value: number }[] }) {
  const { theme } = useTheme();
  const total = data.reduce((s, d) => s + d.value, 0);
  const cells: string[] = [];
  data.forEach((d, i) => { const count = Math.round((d.value / total) * 100); for (let j = 0; j < count && cells.length < 100; j++) cells.push(theme.colors[i % theme.colors.length]); });
  while (cells.length < 100) cells.push(theme.gridColor);
  return (
    <ChartCard title="Waffle Chart" subtitle="Proportional grid visualization">
      <div className="grid grid-cols-10 gap-1">
        {cells.map((color, i) => <div key={i} className="aspect-square rounded-[3px] transition-all hover:scale-110" style={{ backgroundColor: color }} />)}
      </div>
      <div className="flex flex-wrap gap-3 mt-3">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: theme.colors[i % theme.colors.length] }} />
            <span className="text-xs" style={{ color: theme.textSecondary }}>{d.name}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
