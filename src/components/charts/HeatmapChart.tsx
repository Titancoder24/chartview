import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';
export default function HeatmapChartComponent({ data }: { data: { hour: string; day: string; value: number }[] }) {
  const { theme } = useTheme();
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const maxVal = Math.max(...data.map(d => d.value));
  const getColor = (val: number) => { const opacity = Math.max(0.05, val / maxVal); return `${theme.colors[0]}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`; };
  return (
    <ChartCard title="Activity Heatmap" subtitle="Hourly activity by day of week">
      <div className="overflow-x-auto">
        <div className="inline-flex gap-0.5">
          <div className="flex flex-col gap-0.5 pr-1 pt-4">
            {days.map(d => <div key={d} className="h-4 flex items-center"><span className="text-[9px]" style={{ color: theme.textMuted }}>{d}</span></div>)}
          </div>
          {hours.filter((_, i) => i % 2 === 0).map(hour => (
            <div key={hour} className="flex flex-col gap-0.5">
              <span className="text-[8px] text-center mb-0.5" style={{ color: theme.textMuted }}>{hour.split(':')[0]}</span>
              {days.map(day => { const cell = data.find(d => d.hour === hour && d.day === day); return <div key={day} className="w-4 h-4 rounded-[2px]" style={{ backgroundColor: getColor(cell?.value || 0) }} title={`${day} ${hour}: ${cell?.value || 0}`} />; })}
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}
