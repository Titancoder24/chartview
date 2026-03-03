import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function PercentageBarComponent({ data }: { data: { name: string; value: number }[] }) {
  const { theme } = useTheme();
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <ChartCard title="Share Breakdown" subtitle="100% stacked percentage bar">
      <div className="space-y-4">
        <div className="h-8 rounded-xl overflow-hidden flex">
          {data.map((d, i) => (
            <div key={i} className="h-full transition-all duration-500 hover:brightness-125 first:rounded-l-xl last:rounded-r-xl"
              style={{ width: `${(d.value / total) * 100}%`, backgroundColor: theme.colors[i % theme.colors.length] }} />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {data.map((d, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: theme.colors[i % theme.colors.length] }} />
              <span className="text-xs" style={{ color: theme.textMuted }}>{d.name}</span>
              <span className="text-xs font-semibold" style={{ color: theme.textPrimary }}>{((d.value / total) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}
