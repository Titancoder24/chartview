const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const bullets = [
  { label: 'Revenue', actual: 78, target: 85, ranges: [40, 65, 100], color: '#6366f1' },
  { label: 'Profit', actual: 62, target: 70, ranges: [30, 55, 100], color: '#8b5cf6' },
  { label: 'Satisfaction', actual: 88, target: 90, ranges: [50, 75, 100], color: '#a78bfa' },
  { label: 'New Users', actual: 45, target: 60, ranges: [25, 50, 100], color: '#7c3aed' },
];

export default function BulletChartComponent() {
  return (
    <ChartCard title="Bullet Charts" subtitle="Performance against targets">
      <div className="space-y-5">
        {bullets.map((b, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1.5">
              <span className="text-gray-400 text-xs">{b.label}</span>
              <span className="text-gray-500 text-xs">{b.actual}% / {b.target}%</span>
            </div>
            <div className="relative h-5 rounded-md overflow-hidden">
              <div className="absolute inset-0 flex">
                <div className="h-full" style={{ width: `${b.ranges[0]}%`, backgroundColor: 'rgba(30,41,59,0.8)' }} />
                <div className="h-full" style={{ width: `${b.ranges[1] - b.ranges[0]}%`, backgroundColor: 'rgba(30,41,59,0.5)' }} />
                <div className="h-full" style={{ width: `${b.ranges[2] - b.ranges[1]}%`, backgroundColor: 'rgba(30,41,59,0.3)' }} />
              </div>
              <div className="absolute top-1 bottom-1 left-0 rounded-sm" style={{ width: `${b.actual}%`, backgroundColor: b.color }} />
              <div className="absolute top-0 bottom-0 w-0.5 bg-white" style={{ left: `${b.target}%` }} />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
