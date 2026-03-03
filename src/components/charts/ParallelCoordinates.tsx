import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

const axes = ['Speed', 'Power', 'Efficiency', 'Cost', 'Quality'];
const items = [
  { name: 'Alpha', values: [85, 72, 90, 55, 88] },
  { name: 'Beta', values: [72, 88, 65, 78, 75] },
  { name: 'Gamma', values: [90, 60, 82, 42, 95] },
  { name: 'Delta', values: [65, 95, 78, 88, 68] },
];

export default function ParallelCoordinatesComponent() {
  const { theme } = useTheme();
  const svgW = 440, svgH = 200;
  const pad = 40;
  const axisGap = (svgW - pad * 2) / (axes.length - 1);
  const yScale = (v: number) => svgH - 30 - ((v / 100) * (svgH - 60));
  return (
    <ChartCard title="Parallel Coordinates" subtitle="Multi-dimensional product comparison">
      <svg width="100%" height={svgH + 20} viewBox={`0 0 ${svgW} ${svgH + 20}`} preserveAspectRatio="xMidYMid meet">
        {axes.map((ax, i) => {
          const x = pad + i * axisGap;
          return (
            <g key={i}>
              <line x1={x} y1={20} x2={x} y2={svgH - 30} stroke={theme.gridColor} strokeWidth={1} />
              <text x={x} y={svgH} textAnchor="middle" fill={theme.textMuted} fontSize={9}>{ax}</text>
            </g>
          );
        })}
        {items.map((item, i) => {
          const points = item.values.map((v, j) => `${pad + j * axisGap},${yScale(v)}`).join(' ');
          return (
            <polyline key={i} points={points} fill="none" stroke={theme.colors[i % theme.colors.length]} strokeWidth={1.5} strokeOpacity={0.6}
              strokeLinecap="round" strokeLinejoin="round" />
          );
        })}
        {items.map((item, i) =>
          item.values.map((v, j) => (
            <circle key={`${i}-${j}`} cx={pad + j * axisGap} cy={yScale(v)} r={3} fill={theme.colors[i % theme.colors.length]} />
          ))
        )}
      </svg>
      <div className="flex gap-4 mt-2 justify-center">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.colors[i % theme.colors.length] }} />
            <span className="text-xs" style={{ color: theme.textMuted }}>{item.name}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
