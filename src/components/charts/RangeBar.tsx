import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

const ranges = [
  { label: 'Mon', min: 18, max: 28 },
  { label: 'Tue', min: 20, max: 32 },
  { label: 'Wed', min: 15, max: 25 },
  { label: 'Thu', min: 22, max: 35 },
  { label: 'Fri', min: 19, max: 30 },
  { label: 'Sat', min: 10, max: 20 },
  { label: 'Sun', min: 12, max: 22 },
];

export default function RangeBarComponent() {
  const { theme } = useTheme();
  const globalMax = Math.max(...ranges.map(r => r.max));
  return (
    <ChartCard title="Temperature Range" subtitle="Daily min-max range bars">
      <div className="space-y-3">
        {ranges.map((r, i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs w-8" style={{ color: theme.textMuted }}>{r.label}</span>
            <div className="flex-1 relative h-4">
              <div className="absolute inset-0 rounded-full" style={{ backgroundColor: theme.gridColor }} />
              <div className="absolute top-0 h-full rounded-full" style={{ left: `${(r.min / globalMax) * 100}%`, width: `${((r.max - r.min) / globalMax) * 100}%`, backgroundColor: theme.colors[0] }} />
            </div>
            <span className="text-xs w-16 text-right" style={{ color: theme.textSecondary }}>{r.min}° - {r.max}°</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
