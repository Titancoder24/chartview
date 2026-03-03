import { useState } from 'react';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function ActivityCalendarComponent() {
  const { theme } = useTheme();
  const [hovered, setHovered] = useState<number | null>(null);
  const weeks = 26;
  const data = Array.from({ length: weeks * 7 }, () => Math.floor(Math.random() * 12));

  const getColor = (val: number) => {
    if (val === 0) return theme.gridColor;
    const base = theme.colors[0];
    if (val < 3) return `${base}33`;
    if (val < 6) return `${base}66`;
    if (val < 9) return `${base}99`;
    return `${base}dd`;
  };

  return (
    <ChartCard title="Contribution Graph" subtitle="GitHub-style activity calendar">
      <div className="flex gap-[3px] overflow-x-auto pb-2">
        {Array.from({ length: weeks }, (_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }, (_, d) => {
              const idx = w * 7 + d;
              return (
                <div key={d} className="w-3 h-3 rounded-[2px] cursor-pointer transition-all duration-150"
                  style={{ backgroundColor: getColor(data[idx]), transform: hovered === idx ? 'scale(1.3)' : 'scale(1)' }}
                  onMouseEnter={() => setHovered(idx)} onMouseLeave={() => setHovered(null)} title={`${data[idx]} contributions`} />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px]" style={{ color: theme.textMuted }}>Less</span>
        {[0, 2, 5, 8, 11].map((v, i) => (
          <div key={i} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: getColor(v) }} />
        ))}
        <span className="text-[10px]" style={{ color: theme.textMuted }}>More</span>
      </div>
    </ChartCard>
  );
}
