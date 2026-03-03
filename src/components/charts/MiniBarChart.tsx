import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function MiniBarChartComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const max = Math.max(...data.map((d: any) => d.revenue));
  return (
    <ChartCard title="Monthly Snapshot" subtitle="Compact inline bar chart">
      <div className="flex items-end gap-1.5 h-32">
        {data.map((d: any, i: number) => {
          const h = (d.revenue / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-md transition-all duration-500 hover:opacity-80" style={{ height: `${h}%`, backgroundColor: theme.colors[0] }} />
              <span className="text-[9px]" style={{ color: theme.textMuted }}>{d.month?.slice(0, 1)}</span>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
