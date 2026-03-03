import { useState } from 'react';

const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

function getColor(val: number) {
  if (val === 0) return '#111827';
  if (val < 3) return 'rgba(99, 102, 241, 0.2)';
  if (val < 6) return 'rgba(99, 102, 241, 0.4)';
  if (val < 9) return 'rgba(99, 102, 241, 0.6)';
  return 'rgba(99, 102, 241, 0.85)';
}

export default function ActivityCalendarComponent() {
  const [hovered, setHovered] = useState<number | null>(null);
  const weeks = 26;
  const data = Array.from({ length: weeks * 7 }, () => Math.floor(Math.random() * 12));

  return (
    <ChartCard title="Contribution Graph" subtitle="GitHub-style activity calendar">
      <div className="flex gap-[3px] overflow-x-auto pb-2">
        {Array.from({ length: weeks }, (_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }, (_, d) => {
              const idx = w * 7 + d;
              const val = data[idx];
              return (
                <div key={d}
                  className="w-3 h-3 rounded-[2px] cursor-pointer transition-all duration-150"
                  style={{ backgroundColor: getColor(val), transform: hovered === idx ? 'scale(1.3)' : 'scale(1)' }}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  title={`${val} contributions`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className="text-gray-500 text-[10px]">Less</span>
        {[0, 2, 5, 8, 11].map((v, i) => (
          <div key={i} className="w-3 h-3 rounded-[2px]" style={{ backgroundColor: getColor(v) }} />
        ))}
        <span className="text-gray-500 text-[10px]">More</span>
      </div>
    </ChartCard>
  );
}
