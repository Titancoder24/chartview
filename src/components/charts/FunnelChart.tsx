import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';
interface FunnelItem { stage: string; value: number; color?: string }
export default function FunnelChartComponent({ data }: { data: FunnelItem[] }) {
  const { theme } = useTheme();
  const max = data[0]?.value || 1;
  return (
    <ChartCard title="Conversion Funnel" subtitle="User journey stages">
      <div className="space-y-2">
        {data.map((d, i) => {
          const w = (d.value / max) * 100;
          const pct = i > 0 ? ((d.value / data[i - 1].value) * 100).toFixed(0) : '100';
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="h-9 rounded-lg flex items-center px-3 transition-all" style={{ width: `${w}%`, backgroundColor: theme.colors[i % theme.colors.length], minWidth: '60px' }}>
                  <span className="text-white text-xs font-medium whitespace-nowrap">{d.stage}</span>
                </div>
              </div>
              <div className="w-20 text-right">
                <span className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{d.value.toLocaleString()}</span>
                <span className="text-xs ml-1" style={{ color: theme.textMuted }}>{pct}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
