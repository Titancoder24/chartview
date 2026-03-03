import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function SparklineGridComponent({ data }: { data: Record<string, number[]> }) {
  const { theme } = useTheme();
  const entries = Object.entries(data);
  return (
    <ChartCard title="Micro Trends" subtitle="Inline sparkline grid">
      <div className="grid grid-cols-2 gap-3">
        {entries.map(([key, values], i) => {
          const max = Math.max(...values);
          const min = Math.min(...values);
          const range = max - min || 1;
          const pts = values.map((v, j) => `${(j / (values.length - 1)) * 100},${36 - ((v - min) / range) * 32}`).join(' ');
          const color = theme.colors[i % theme.colors.length];
          return (
            <div key={key} className="rounded-lg p-3" style={{ backgroundColor: theme.gridColor + '40' }}>
              <p className="text-xs capitalize mb-1" style={{ color: theme.textSecondary }}>{key}</p>
              <svg width="100%" height="36" viewBox="0 0 100 36" preserveAspectRatio="none">
                <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
