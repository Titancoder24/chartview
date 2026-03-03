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
  const max = 90;
  return (
    <ChartCard title="Temperature Range" subtitle="Monthly high-low range bars">
      <div className="flex items-end gap-2 h-48 px-2">
        {rangeData.map((d, i) => {
          const bottom = (d.lo / max) * 100;
          const top = (d.hi / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center relative h-full">
              <div className="absolute w-full flex flex-col items-center" style={{ bottom: `${bottom}%`, height: `${top - bottom}%` }}>
                <div className="w-3 h-full rounded-full" style={{ background: `linear-gradient(180deg, ${theme.colors[0]}, ${theme.colors[1]})` }} />
              </div>
              <span className="absolute -bottom-5 text-[9px]" style={{ color: theme.textMuted }}>{d.label}</span>
            </div>
            <span className="text-xs w-16 text-right" style={{ color: theme.textSecondary }}>{r.min}° - {r.max}°</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
