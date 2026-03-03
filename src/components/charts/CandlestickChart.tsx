const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

interface Candle { date: string; open: number; high: number; low: number; close: number; volume: number }

export default function CandlestickChartComponent({ data }: { data: Candle[] }) {
  const allValues = data.flatMap(d => [d.high, d.low]);
  const min = Math.min(...allValues) - 2;
  const max = Math.max(...allValues) + 2;
  const range = max - min;
  const svgH = 200;
  const candleW = 16;
  const gap = 6;
  const svgW = data.length * (candleW + gap) + gap;

  const toY = (v: number) => svgH - ((v - min) / range) * svgH;

  return (
    <ChartCard title="Stock Price" subtitle="OHLC candlestick chart">
      <div className="overflow-x-auto">
        <svg width="100%" height={svgH + 30} viewBox={`0 0 ${svgW} ${svgH + 30}`} preserveAspectRatio="xMidYMid meet">
          {data.map((d, i) => {
            const x = gap + i * (candleW + gap);
            const bull = d.close >= d.open;
            const color = bull ? '#22c55e' : '#ef4444';
            const bodyTop = toY(Math.max(d.open, d.close));
            const bodyBottom = toY(Math.min(d.open, d.close));
            const bodyH = Math.max(bodyBottom - bodyTop, 1);
            return (
              <g key={i}>
                <line x1={x + candleW / 2} y1={toY(d.high)} x2={x + candleW / 2} y2={toY(d.low)} stroke={color} strokeWidth={1.5} />
                <rect x={x} y={bodyTop} width={candleW} height={bodyH} rx={2} fill={bull ? color : color} fillOpacity={bull ? 0.3 : 0.8} stroke={color} strokeWidth={1} />
                <text x={x + candleW / 2} y={svgH + 15} textAnchor="middle" fill="#6b7280" fontSize={8}>{d.date.slice(4)}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </ChartCard>
  );
}
