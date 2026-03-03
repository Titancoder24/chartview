import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

const boxData = [
  { name: 'Q1', min: 12, q1: 28, median: 42, q3: 58, max: 78 },
  { name: 'Q2', min: 18, q1: 32, median: 48, q3: 62, max: 82 },
  { name: 'Q3', min: 22, q1: 38, median: 55, q3: 68, max: 88 },
  { name: 'Q4', min: 15, q1: 35, median: 52, q3: 72, max: 92 },
];

export default function BoxPlotComponent() {
  const { theme } = useTheme();
  const svgW = 400, svgH = 200;
  const maxVal = 100;
  const barW = 40;
  const scale = (v: number) => svgH - 20 - ((v / maxVal) * (svgH - 40));

  return (
    <ChartCard title="Box Plot" subtitle="Statistical distribution by quarter">
      <svg width="100%" height={svgH + 30} viewBox={`0 0 ${svgW} ${svgH + 30}`} preserveAspectRatio="xMidYMid meet">
        {boxData.map((d, i) => {
          const x = 60 + i * 80;
          return (
            <g key={i}>
              <line x1={x + barW / 2} y1={scale(d.max)} x2={x + barW / 2} y2={scale(d.min)} stroke={theme.textMuted} strokeWidth={1.5} />
              <line x1={x + 8} y1={scale(d.max)} x2={x + barW - 8} y2={scale(d.max)} stroke={theme.textMuted} strokeWidth={1.5} />
              <line x1={x + 8} y1={scale(d.min)} x2={x + barW - 8} y2={scale(d.min)} stroke={theme.textMuted} strokeWidth={1.5} />
              <rect x={x} y={scale(d.q3)} width={barW} height={scale(d.q1) - scale(d.q3)}
                rx={4} fill={`${theme.colors[0]}4d`} stroke={theme.colors[0]} strokeWidth={1.5} />
              <line x1={x} y1={scale(d.median)} x2={x + barW} y2={scale(d.median)} stroke={theme.colors[2]} strokeWidth={2} />
              <text x={x + barW / 2} y={svgH + 10} textAnchor="middle" fill={theme.textMuted} fontSize={11}>{d.name}</text>
            </g>
          );
        })}
      </svg>
    </ChartCard>
  );
}
