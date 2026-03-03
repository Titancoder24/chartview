import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#7c3aed'];

const CustomContent = (props: any) => {
  const { x, y, width, height, index, name } = props;
  if (width < 30 || height < 20) return null;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={4} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} stroke="#0a0f1a" strokeWidth={2} />
      {width > 50 && height > 30 && (
        <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={11} fontWeight="500">
          {name}
        </text>
      )}
    </g>
  );
};

const tooltip = {
  contentStyle: { background: '#111827', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '12px', color: '#e5e7eb' },
};

export default function TreemapChartComponent({ data }: { data: any[] }) {
  return (
    <ChartCard title="Sector Allocation" subtitle="Treemap of market sectors">
      <ResponsiveContainer width="100%" height={240}>
        <Treemap data={data} dataKey="size" nameKey="name" content={<CustomContent />}>
          <Tooltip {...tooltip} />
        </Treemap>
      </ResponsiveContainer>
    </ChartCard>
  );
}
