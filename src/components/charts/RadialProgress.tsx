import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

const items = [
  { label: 'Design', value: 85 },
  { label: 'Dev', value: 62 },
  { label: 'Testing', value: 45 },
  { label: 'Deploy', value: 91 },
];

export default function RadialProgressComponent() {
  const { theme } = useTheme();
  return (
    <ChartCard title="Sprint Progress" subtitle="Radial progress indicators">
      <div className="flex justify-around">
        {items.map((item, i) => {
          const r = 28;
          const c = 2 * Math.PI * r;
          const offset = c * (1 - item.value / 100);
          return (
            <div key={i} className="flex flex-col items-center">
              <svg width="68" height="68" viewBox="0 0 68 68">
                <circle cx="34" cy="34" r={r} fill="none" stroke={theme.gridColor} strokeWidth="5" />
                <circle cx="34" cy="34" r={r} fill="none" stroke={theme.colors[i % theme.colors.length]} strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} transform="rotate(-90 34 34)" />
                <text x="34" y="34" textAnchor="middle" dominantBaseline="middle" fill={theme.textPrimary} fontSize="13" fontWeight="700">{item.value}%</text>
              </svg>
              <span className="text-xs mt-1" style={{ color: theme.textMuted }}>{item.label}</span>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
