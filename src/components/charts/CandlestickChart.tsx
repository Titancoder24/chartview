import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

interface Candle { date: string; open: number; high: number; low: number; close: number; volume: number }

export default function CandlestickChartComponent({ data }: { data: Candle[] }) {
  const { theme } = useTheme();
  const svgW = 440, svgH = 200;
  const allVals = data.flatMap(d => [d.high, d.low]);
  const minVal = Math.min(...allVals);
  const maxVal = Math.max(...allVals);
  const range = maxVal - minVal || 1;
  const candleW = Math.min(24, (svgW - 40) / data.length - 4);
  const y = (v: number) => 15 + ((maxVal - v) / range) * (svgH - 30);

  return (
    <ChartCard title="Stock Price" subtitle="OHLC candlestick chart">
      <svg width="100%" height={svgH + 25} viewBox={`0 0 ${svgW} ${svgH + 25}`} preserveAspectRatio="xMidYMid meet">
        {data.map((d, i) => {
          const x = 20 + i * ((svgW - 40) / data.length) + ((svgW - 40) / data.length - candleW) / 2;
          const bull = d.close >= d.open;
          const color = bull ? theme.positive : theme.negative;
          const bodyTop = y(Math.max(d.open, d.close));
          const bodyH = Math.max(Math.abs(y(d.open) - y(d.close)), 1);
          return (
            <g key={i}>
              <line x1={x + candleW / 2} y1={y(d.high)} x2={x + candleW / 2} y2={y(d.low)} stroke={color} strokeWidth={1.5} />
              <rect x={x} y={bodyTop} width={candleW} height={bodyH} rx={2} fill={bull ? color : color} fillOpacity={bull ? 0.3 : 0.8} stroke={color} strokeWidth={1} />
              <text x={x + candleW / 2} y={svgH + 15} textAnchor="middle" fill={theme.textMuted} fontSize={8}>{d.date.split(' ')[1]}</text>
            </g>
          );
        })}
      </svg>
    </ChartCard>
  );
}
