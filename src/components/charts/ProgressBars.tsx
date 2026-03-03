import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';
interface ProgressItem { label: string; progress: number; color?: string }
export default function ProgressBarsComponent({ data }: { data: ProgressItem[] }) {
  const { theme } = useTheme();
  return (
    <ChartCard title="Project Status" subtitle="Completion percentage">
      <div className="space-y-4">
        {data.map((p, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs font-medium" style={{ color: theme.textSecondary }}>{p.label}</span>
              <span className="text-xs font-semibold" style={{ color: theme.textPrimary }}>{p.progress}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.gridColor }}>
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${p.progress}%`, backgroundColor: theme.colors[i % theme.colors.length] }} />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
