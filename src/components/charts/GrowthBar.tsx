import { TrendingUp, TrendingDown } from 'lucide-react';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function GrowthBarComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const max = Math.max(...data.map(d => d.sales));
  return (
    <ChartCard title="Growth Indicators" subtitle="Sales with growth rate badges">
      <div className="space-y-3">
        {data.map((d, i) => (
          <div key={i} className="group">
            <div className="flex justify-between mb-1">
              <span className="text-xs" style={{ color: theme.textSecondary }}>{d.product}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: theme.textMuted }}>${(d.sales / 1000).toFixed(0)}K</span>
                <span className="text-[10px] flex items-center gap-0.5" style={{ color: d.growth >= 0 ? theme.positive : theme.negative }}>
                  {d.growth >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {d.growth >= 0 ? '+' : ''}{d.growth}%
                </span>
              </div>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: theme.gridColor }}>
              <div className="h-full rounded-full transition-all duration-700 group-hover:brightness-125"
                style={{
                  width: `${(d.sales / max) * 100}%`,
                  background: d.growth >= 0
                    ? `linear-gradient(90deg, ${theme.colors[0]}, ${theme.colors[1]})`
                    : `linear-gradient(90deg, ${theme.negative}, ${theme.negative}cc)`
                }} />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
