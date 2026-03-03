import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function SemiCircleGaugeComponent() {
  const { theme } = useTheme();
  const value = 76;
  const r = 60;
  const c = Math.PI * r;
  const offset = c * (1 - value / 100);
  return (
    <ChartCard title="Performance Score" subtitle="Semi-circle gauge indicator">
      <div className="flex flex-col items-center">
        <svg width="160" height="90" viewBox="0 0 160 90">
          <circle cx="80" cy="80" r={r} fill="none" stroke={theme.gridColor} strokeWidth="10" strokeDasharray={`${c} ${2 * Math.PI * r}`} strokeLinecap="round" transform="rotate(180 80 80)" />
          <circle cx="80" cy="80" r={r} fill="none" stroke={theme.colors[0]} strokeWidth="10" strokeDasharray={`${c - offset} ${2 * Math.PI * r}`} strokeLinecap="round" transform="rotate(180 80 80)" />
          <text x="80" y="70" textAnchor="middle" fill={theme.textPrimary} fontSize="28" fontWeight="800">{value}</text>
          <text x="80" y="86" textAnchor="middle" fill={theme.textMuted} fontSize="10">out of 100</text>
        </svg>
      </div>
    </ChartCard>
  );
}
