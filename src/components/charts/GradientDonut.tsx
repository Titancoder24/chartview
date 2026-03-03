import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function GradientDonutComponent() {
  const { theme } = useTheme();
  const value = 73;
  const r = 70;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - value / 100);

  return (
    <ChartCard title="Completion Rate" subtitle="Gradient ring progress">
      <div className="flex flex-col items-center">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={theme.colors[0]} />
              <stop offset="50%" stopColor={theme.colors[1]} />
              <stop offset="100%" stopColor={theme.colors[2]} />
            </linearGradient>
          </defs>
          <circle cx="90" cy="90" r={r} fill="none" stroke={theme.gridColor} strokeWidth="10" />
          <circle cx="90" cy="90" r={r} fill="none" stroke="url(#ringGrad)" strokeWidth="10"
            strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset}
            transform="rotate(-90 90 90)"
            style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }} />
          <text x="90" y="82" textAnchor="middle" fill={theme.textPrimary} fontSize="32" fontWeight="bold">{value}%</text>
          <text x="90" y="102" textAnchor="middle" fill={theme.textMuted} fontSize="11">Completed</text>
        </svg>
      </div>
    </ChartCard>
  );
}
