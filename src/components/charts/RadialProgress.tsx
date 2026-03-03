import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

function Ring({ value, max, label, color, trackColor, textColor, mutedColor, size = 80 }: { value: number; max: number; label: string; color: string; trackColor: string; textColor: string; mutedColor: string; size?: number }) {
  const pct = value / max;
  const r = (size - 8) / 2;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - pct);
  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={trackColor} strokeWidth="6" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="6"
          strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} />
        <text x={size / 2} y={size / 2} textAnchor="middle" dominantBaseline="middle" fill={textColor} fontSize="14" fontWeight="bold">
          {Math.round(pct * 100)}%
        </text>
      </svg>
      <p className="text-xs mt-2" style={{ color: mutedColor }}>{label}</p>
    </div>
  );
}

export default function RadialProgressComponent() {
  const { theme } = useTheme();
  const items = [
    { value: 85, max: 100, label: 'Design' },
    { value: 62, max: 100, label: 'Backend' },
    { value: 45, max: 100, label: 'Testing' },
    { value: 91, max: 100, label: 'Deploy' },
  ];
  return (
    <ChartCard title="Sprint Progress" subtitle="Radial progress indicators">
      <div className="flex justify-around">
        {items.map((item, i) => (
          <Ring key={i} {...item} color={theme.colors[i % theme.colors.length]} trackColor={theme.gridColor} textColor={theme.textPrimary} mutedColor={theme.textMuted} />
        ))}
      </div>
    </ChartCard>
  );
}
