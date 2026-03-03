import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

const segments = [
  { label: 'Organic', value: 35 },
  { label: 'Paid', value: 25 },
  { label: 'Social', value: 18 },
  { label: 'Email', value: 12 },
  { label: 'Referral', value: 7 },
  { label: 'Direct', value: 3 },
];

export default function PolarAreaChartComponent() {
  const { theme } = useTheme();
  const cx = 110, cy = 110;
  const maxR = 90;
  const maxVal = Math.max(...segments.map(s => s.value));
  const angleStep = (2 * Math.PI) / segments.length;

  return (
    <ChartCard title="Polar Area Chart" subtitle="Traffic sources by magnitude">
      <div className="flex justify-center">
        <svg width="220" height="220" viewBox="0 0 220 220">
          {[0.25, 0.5, 0.75, 1].map((t, i) => (
            <circle key={i} cx={cx} cy={cy} r={maxR * t} fill="none" stroke={theme.gridColor} strokeWidth={0.5} />
          ))}
          {segments.map((seg, i) => {
            const r = (seg.value / maxVal) * maxR;
            const startAngle = i * angleStep - Math.PI / 2;
            const endAngle = (i + 1) * angleStep - Math.PI / 2;
            const x1 = cx + r * Math.cos(startAngle);
            const y1 = cy + r * Math.sin(startAngle);
            const x2 = cx + r * Math.cos(endAngle);
            const y2 = cy + r * Math.sin(endAngle);
            const largeArc = angleStep > Math.PI ? 1 : 0;
            return (
              <path key={i}
                d={`M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={theme.colors[i % theme.colors.length]} fillOpacity={0.6} stroke={theme.colors[i % theme.colors.length]} strokeWidth={1} />
            );
          })}
          {segments.map((seg, i) => {
            const midAngle = (i + 0.5) * angleStep - Math.PI / 2;
            const labelR = maxR + 15;
            const lx = cx + labelR * Math.cos(midAngle);
            const ly = cy + labelR * Math.sin(midAngle);
            return (
              <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill={theme.textMuted} fontSize={8}>
                {seg.label}
              </text>
            );
          })}
        </svg>
      </div>
    </ChartCard>
  );
}
