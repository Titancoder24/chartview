import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

const rangeData = [
  { label: 'Jan', lo: 18, hi: 42 },
  { label: 'Feb', lo: 22, hi: 48 },
  { label: 'Mar', lo: 28, hi: 55 },
  { label: 'Apr', lo: 32, hi: 58 },
  { label: 'May', lo: 38, hi: 65 },
  { label: 'Jun', lo: 42, hi: 72 },
  { label: 'Jul', lo: 45, hi: 78 },
  { label: 'Aug', lo: 40, hi: 75 },
  { label: 'Sep', lo: 35, hi: 62 },
  { label: 'Oct', lo: 28, hi: 52 },
  { label: 'Nov', lo: 22, hi: 45 },
  { label: 'Dec', lo: 15, hi: 38 },
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
          );
        })}
      </div>
    </ChartCard>
  );
}
