import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

const bullets = [
  { label: 'Revenue', actual: 78, target: 85, ranges: [40, 65, 100] },
  { label: 'Profit', actual: 62, target: 70, ranges: [30, 55, 100] },
  { label: 'Satisfaction', actual: 88, target: 90, ranges: [50, 75, 100] },
  { label: 'New Users', actual: 45, target: 60, ranges: [25, 50, 100] },
];

export default function BulletChartComponent() {
  const { theme } = useTheme();
  return (
    <ChartCard title="Bullet Charts" subtitle="Performance against targets">
      <div className="space-y-5">
        {bullets.map((b, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs" style={{ color: theme.textMuted }}>{b.label}</span>
              <span className="text-xs" style={{ color: theme.textMuted }}>{b.actual}% / {b.target}%</span>
            </div>
            <div className="relative h-5 rounded-md overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="h-full" style={{ width: `${b.ranges[0]}%`, backgroundColor: `${theme.gridColor}cc` }} />
                <div className="h-full" style={{ width: `${b.ranges[1] - b.ranges[0]}%`, backgroundColor: `${theme.gridColor}80` }} />
                <div className="h-full" style={{ width: `${b.ranges[2] - b.ranges[1]}%`, backgroundColor: `${theme.gridColor}4d` }} />
              </div>
              <div className="absolute top-1 bottom-1 left-0 rounded-sm" style={{ width: `${b.actual}%`, backgroundColor: theme.colors[i % theme.colors.length] }} />
              <div className="absolute top-0 bottom-0 w-0.5" style={{ left: `${b.target}%`, backgroundColor: theme.textPrimary }} />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
