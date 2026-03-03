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

function getColor(val: number, max: number) {
  const t = val / max;
  const r = Math.round(99 * (1 - t) + 99 * t);
  const g = Math.round(102 * (1 - t) + 102 * t);
  const b = Math.round(241 * t + 30 * (1 - t));
  return `rgba(${r}, ${g}, ${b}, ${0.15 + t * 0.85})`;
}

export default function HeatmapChartComponent({ data }: { data: { hour: string; day: string; value: number }[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from(new Set(data.map(d => d.hour)));
  const displayHours = hours.filter((_, i) => i % 3 === 0);
  const max = Math.max(...data.map(d => d.value));

  return (
    <ChartCard title="Activity Heatmap" subtitle="Hourly activity by day of week">
      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          <div className="flex gap-0.5 mb-1 ml-10">
            {displayHours.map(h => (
              <div key={h} className="text-gray-500 text-[9px]" style={{ width: `${100 / displayHours.length}%` }}>{h}</div>
            ))}
          </div>
          {days.map((day) => (
            <div key={day} className="flex items-center gap-1 mb-0.5">
              <div className="w-8 text-gray-500 text-[10px] text-right">{day}</div>
              <div className="flex-1 flex gap-0.5">
                {hours.map((hour, hi) => {
                  const item = data.find(d => d.day === day && d.hour === hour);
                  const idx = days.indexOf(day) * hours.length + hi;
                  return (
                    <div
                      key={hour}
                      className="flex-1 h-5 rounded-[2px] cursor-pointer transition-all duration-150"
                      style={{
                        backgroundColor: getColor(item?.value || 0, max),
                        transform: hovered === idx ? 'scale(1.2)' : 'scale(1)',
                      }}
                      onMouseEnter={() => setHovered(idx)}
                      onMouseLeave={() => setHovered(null)}
                      title={`${day} ${hour}: ${item?.value || 0}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
}
