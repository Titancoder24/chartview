import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

const sectors = [
  { label: 'Sales', value: 80 },
  { label: 'Marketing', value: 65 },
  { label: 'Support', value: 72 },
  { label: 'Engineering', value: 90 },
  { label: 'Design', value: 58 },
  { label: 'HR', value: 45 },
];

export default function PolarAreaChartComponent() {
  const { theme } = useTheme();
  const cx = 120, cy = 120, maxR = 90;
  const angleStep = (2 * Math.PI) / sectors.length;
  return (
    <ChartCard title="Polar Area" subtitle="Department performance">
      <div className="flex justify-center">
        <svg width="240" height="240" viewBox="0 0 240 240">
          {sectors.map((s, i) => {
            const startAngle = i * angleStep - Math.PI / 2;
            const endAngle = startAngle + angleStep;
            const r = (s.value / 100) * maxR;
            const x1 = cx + r * Math.cos(startAngle);
            const y1 = cy + r * Math.sin(startAngle);
            const x2 = cx + r * Math.cos(endAngle);
            const y2 = cy + r * Math.sin(endAngle);
            const largeArc = angleStep > Math.PI ? 1 : 0;
            const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${largeArc},1 ${x2},${y2} Z`;
            return <path key={i} d={d} fill={theme.colors[i % theme.colors.length]} fillOpacity={0.6} stroke={theme.cardBg} strokeWidth={2} />;
          })}
          {sectors.map((s, i) => {
            const angle = i * angleStep - Math.PI / 2 + angleStep / 2;
            const lr = maxR + 12;
            const lx = cx + lr * Math.cos(angle);
            const ly = cy + lr * Math.sin(angle);
            return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fill={theme.textMuted} fontSize={8}>{s.label}</text>;
          })}
        </svg>
      </div>
    </ChartCard>
  );
}
