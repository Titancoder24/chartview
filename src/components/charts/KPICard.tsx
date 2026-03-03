import { useTheme } from '../../context/ThemeContext';

interface KPI { title: string; value: string; change: number; trend: number[] }

export default function KPICardComponent({ data }: { data: KPI[] }) {
  const { theme } = useTheme();
  return (
    <div className="grid grid-cols-2 gap-3">
      {data.map((kpi, i) => {
        const max = Math.max(...kpi.trend);
        const min = Math.min(...kpi.trend);
        const range = max - min || 1;
        const points = kpi.trend.map((v, j) => `${(j / (kpi.trend.length - 1)) * 100},${40 - ((v - min) / range) * 36}`).join(' ');
        return (
          <div key={i} className="rounded-xl p-4 transition-all" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
            <p className="text-xs mb-1" style={{ color: theme.textMuted }}>{kpi.title}</p>
            <div className="flex items-end justify-between">
              <p className="text-xl font-bold" style={{ color: theme.textPrimary }}>{kpi.value}</p>
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${kpi.change >= 0 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-500'}`}>
                {kpi.change >= 0 ? '+' : ''}{kpi.change}%
              </span>
            </div>
            <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none" className="mt-2">
              <polyline points={points} fill="none" stroke={kpi.change >= 0 ? theme.positive : theme.negative} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
