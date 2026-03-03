import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';
interface WItem { name: string; value: number }
export default function WaterfallChartComponent({ data }: { data: WItem[] }) {
  const { theme } = useTheme();
  let cumulative = 0;
  const bars = data.map((d, i) => {
    const isFirst = i === 0; const isLast = i === data.length - 1;
    const start = isFirst || isLast ? 0 : cumulative; const end = isFirst || isLast ? d.value : cumulative + d.value;
    if (!isFirst && !isLast) cumulative += d.value; else if (isFirst) cumulative = d.value;
    return { ...d, start: Math.min(start, end), height: Math.abs(end - start), positive: d.value >= 0 };
  });
  const maxVal = Math.max(...bars.map(b => b.start + b.height)); const svgH = 200; const barW = 40; const gap = 12;
  const svgW = bars.length * (barW + gap) + gap; const scale = (v: number) => svgH - (v / maxVal) * svgH;
  return (
    <ChartCard title="P&L Waterfall" subtitle="Revenue breakdown to net income">
      <div className="overflow-x-auto">
        <svg width="100%" height={svgH + 30} viewBox={`0 0 ${svgW} ${svgH + 30}`} preserveAspectRatio="xMidYMid meet">
          {bars.map((b, i) => {
            const x = gap + i * (barW + gap); const yPos = scale(b.start + b.height); const h = (b.height / maxVal) * svgH;
            return (
              <g key={i}>
                <rect x={x} y={yPos} width={barW} height={Math.max(h, 2)} rx={4} fill={b.positive ? theme.colors[0] : theme.negative} fillOpacity={0.8} />
                <text x={x + barW / 2} y={yPos - 6} textAnchor="middle" fill={b.positive ? theme.colors[0] : theme.negative} fontSize={10} fontWeight="600">{b.value >= 0 ? '+' : ''}{(b.value / 1000).toFixed(0)}K</text>
                <text x={x + barW / 2} y={svgH + 15} textAnchor="middle" fill={theme.textMuted} fontSize={9}>{b.name}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </ChartCard>
  );
}
