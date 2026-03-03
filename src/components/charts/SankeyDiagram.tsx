const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#7c3aed', '#818cf8', '#c4b5fd', '#4f46e5', '#22c55e', '#3b82f6', '#ef4444'];

interface SankeyData {
  nodes: string[];
  links: { source: number; target: number; value: number }[];
}

export default function SankeyDiagramComponent({ data }: { data: SankeyData }) {
  const { nodes, links } = data;
  const columns: number[][] = [[], [], []];
  const nodeCol: Record<number, number> = {};

  nodes.forEach((_, i) => {
    const isSource = links.some(l => l.source === i);
    const isTarget = links.some(l => l.target === i);
    const col = !isTarget ? 0 : !isSource ? 2 : 1;
    columns[col].push(i);
    nodeCol[i] = col;
  });

  const nodeValues: Record<number, number> = {};
  nodes.forEach((_, i) => {
    const outVal = links.filter(l => l.source === i).reduce((s, l) => s + l.value, 0);
    const inVal = links.filter(l => l.target === i).reduce((s, l) => s + l.value, 0);
    nodeValues[i] = Math.max(outVal, inVal);
  });

  const svgW = 500, svgH = 280;
  const colX = [30, 220, 410];
  const nodeW = 18;
  const maxVal = Math.max(...Object.values(nodeValues));

  const nodeY: Record<number, number> = {};
  const nodeH: Record<number, number> = {};
  columns.forEach((col) => {
    const totalH = col.reduce((s, ni) => s + (nodeValues[ni] / maxVal) * 180, 0);
    const gap = (svgH - 40 - totalH) / (col.length + 1);
    let y = 20 + gap;
    col.forEach(ni => {
      const h = Math.max((nodeValues[ni] / maxVal) * 180, 8);
      nodeY[ni] = y;
      nodeH[ni] = h;
      y += h + gap;
    });
  });

  return (
    <ChartCard title="Traffic Flow" subtitle="Sankey diagram of user journeys">
      <svg width="100%" height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="xMidYMid meet">
        {links.map((link, i) => {
          const sx = colX[nodeCol[link.source]] + nodeW;
          const tx = colX[nodeCol[link.target]];
          const sy = nodeY[link.source] + nodeH[link.source] / 2;
          const ty = nodeY[link.target] + nodeH[link.target] / 2;
          const thick = Math.max((link.value / maxVal) * 30, 2);
          return (
            <path key={i} d={`M${sx},${sy} C${sx + 80},${sy} ${tx - 80},${ty} ${tx},${ty}`}
              fill="none" stroke={COLORS[link.source % COLORS.length]} strokeWidth={thick} strokeOpacity={0.2} />
          );
        })}
        {nodes.map((name, i) => {
          if (nodeY[i] === undefined) return null;
          return (
            <g key={i}>
              <rect x={colX[nodeCol[i]]} y={nodeY[i]} width={nodeW} height={nodeH[i]} rx={4} fill={COLORS[i % COLORS.length]} fillOpacity={0.8} />
              <text x={colX[nodeCol[i]] + (nodeCol[i] === 2 ? nodeW + 6 : nodeCol[i] === 0 ? -6 : nodeW + 6)}
                y={nodeY[i] + nodeH[i] / 2} textAnchor={nodeCol[i] === 0 ? 'end' : 'start'} dominantBaseline="middle"
                fill="#9ca3af" fontSize={9}>{name}</text>
            </g>
          );
        })}
      </svg>
    </ChartCard>
  );
}
