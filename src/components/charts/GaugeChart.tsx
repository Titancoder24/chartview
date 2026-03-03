import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';
interface GaugeItem { label: string; value: number; max: number; color?: string }
export default function GaugeChartComponent({ data }: { data: GaugeItem[] }) {
  const { theme } = useTheme();
  return (
    <ChartCard title="System Health" subtitle="Real-time resource gauges">
      <div className="grid grid-cols-2 gap-4">
        {data.map((g, i) => {
          const pct = g.value / g.max; const r = 36; const c = 2 * Math.PI * r; const arc = c * 0.75; const offset = arc * (1 - pct);
          const color = theme.colors[i % theme.colors.length];
          return (
            <div key={i} className="flex flex-col items-center">
              <svg width="90" height="70" viewBox="0 0 90 75">
                <circle cx="45" cy="45" r={r} fill="none" stroke={theme.gridColor} strokeWidth="7" strokeDasharray={`${arc} ${c}`} strokeLinecap="round" transform="rotate(135 45 45)" />
                <circle cx="45" cy="45" r={r} fill="none" stroke={color} strokeWidth="7" strokeDasharray={`${arc - offset} ${c}`} strokeLinecap="round" transform="rotate(135 45 45)" />
                <text x="45" y="45" textAnchor="middle" dominantBaseline="middle" fill={theme.textPrimary} fontSize="14" fontWeight="700">{g.value}%</text>
              </svg>
              <span className="text-xs mt-1" style={{ color: theme.textMuted }}>{g.label}</span>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
