import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function DotPlotComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const max = Math.max(...data.map(d => d.value));
  return (
    <ChartCard title="Ranking Dot Plot" subtitle="Lollipop-style ranking chart">
      <div className="space-y-3">
        {data.map((d: any, i: number) => (
          <div key={i} className="flex items-center gap-3">
            <span className="text-xs w-20 text-right" style={{ color: theme.textMuted }}>{d.name}</span>
            <div className="flex-1 relative h-4">
              <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] w-full rounded" style={{ backgroundColor: theme.gridColor }} />
              <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] rounded" style={{ width: `${(d.value / max) * 100}%`, backgroundColor: `${theme.colors[0]}66` }} />
              <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2"
                style={{ left: `calc(${(d.value / max) * 100}% - 6px)`, backgroundColor: theme.colors[0], borderColor: theme.cardBg }} />
            </div>
            <span className="text-xs font-medium w-8" style={{ color: theme.textSecondary }}>{d.value}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
