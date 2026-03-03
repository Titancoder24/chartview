import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function GrowthBarComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const maxSales = Math.max(...data.map((d: any) => d.sales));
  return (
    <ChartCard title="Growth Indicators" subtitle="Sales with growth rate badges">
      <div className="space-y-3">
        {data.slice(0, 6).map((d: any, i: number) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs" style={{ color: theme.textSecondary }}>{d.product}</span>
              <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${d.growth >= 0 ? 'text-emerald-600 bg-emerald-500/10' : 'text-red-500 bg-red-500/10'}`}>
                {d.growth >= 0 ? '+' : ''}{d.growth}%
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.gridColor }}>
              <div className="h-full rounded-full" style={{ width: `${(d.sales / maxSales) * 100}%`, backgroundColor: d.growth >= 0 ? theme.colors[0] : theme.negative }} />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
