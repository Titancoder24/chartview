import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

const groups = [
  { name: 'Group A', widths: [2, 8, 18, 28, 35, 38, 35, 28, 18, 8, 2] },
  { name: 'Group B', widths: [4, 12, 22, 30, 25, 18, 25, 30, 22, 12, 4] },
  { name: 'Group C', widths: [1, 5, 15, 32, 38, 40, 38, 32, 15, 5, 1] },
];

export default function ViolinPlotComponent() {
  const { theme } = useTheme();
  const svgW = 400, svgH = 220, violinH = 160, maxW = 40;
  return (
    <ChartCard title="Violin Plot" subtitle="Distribution shape comparison">
      <svg width="100%" height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="xMidYMid meet">
        {groups.map((g, gi) => {
          const cx = 80 + gi * 120;
          const step = violinH / (g.widths.length - 1);
          const leftPath = g.widths.map((w, i) => `${cx - (w / 40) * maxW},${20 + i * step}`);
          const rightPath = g.widths.map((w, i) => `${cx + (w / 40) * maxW},${20 + i * step}`).reverse();
          const path = `M ${leftPath.join(' L ')} L ${rightPath.join(' L ')} Z`;
          const color = theme.colors[gi % theme.colors.length];
          return (
            <g key={gi}>
              <path d={path} fill={color} fillOpacity={0.25} stroke={color} strokeWidth={1.5} />
              <line x1={cx} y1={20} x2={cx} y2={20 + violinH} stroke={color} strokeWidth={1} strokeOpacity={0.3} />
              <circle cx={cx} cy={20 + violinH / 2} r={3} fill={theme.textPrimary} />
              <text x={cx} y={svgH - 5} textAnchor="middle" fill={theme.textMuted} fontSize={11}>{g.name}</text>
            </g>
          );
        })}
      </svg>
    </ChartCard>
  );
}
