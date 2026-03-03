const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

interface ProgressItem { label: string; progress: number; color: string }

export default function ProgressBarsComponent({ data }: { data: ProgressItem[] }) {
  return (
    <ChartCard title="Project Milestones" subtitle="Progress tracking across workstreams">
      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1.5">
              <span className="text-gray-300 text-xs font-medium">{item.label}</span>
              <span className="text-gray-400 text-xs">{item.progress}%</span>
            </div>
            <div className="h-2 rounded-full bg-[#111827] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: `${item.progress}%`, background: `linear-gradient(90deg, ${item.color}, ${item.color}cc)` }}
              />
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
