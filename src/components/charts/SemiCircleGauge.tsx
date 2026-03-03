import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function SemiCircleGaugeComponent() {
  const { theme } = useTheme();
  const value = 76;
  const r = 80;
  const circumference = Math.PI * r;
  const dashOffset = circumference * (1 - value / 100);

  return (
    <ChartCard title="Performance Score" subtitle="Overall system performance">
      <div className="flex flex-col items-center">
        <svg width="200" height="120" viewBox="0 0 200 120">
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke={theme.gridColor} strokeWidth="12" strokeLinecap="round" />
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#semiGrad)" strokeWidth="12" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }} />
          <defs>
            <linearGradient id="semiGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={theme.colors[0]} />
              <stop offset="100%" stopColor={theme.colors[1]} />
            </linearGradient>
          </defs>
          <text x="100" y="90" textAnchor="middle" fill={theme.textPrimary} fontSize="28" fontWeight="bold">{value}</text>
          <text x="100" y="108" textAnchor="middle" fill={theme.textMuted} fontSize="11">out of 100</text>
        </svg>
        <div className="flex justify-between w-48 mt-2">
          <span className="text-xs" style={{ color: theme.textMuted }}>Poor</span>
          <span className="text-xs font-medium" style={{ color: theme.colors[0] }}>Good</span>
          <span className="text-xs" style={{ color: theme.textMuted }}>Excellent</span>
        </div>
      </div>
    </ChartCard>
  );
}
