const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

interface FunnelItem {
  stage: string;
  value: number;
  color: string;
}

export default function FunnelChartComponent({ data }: { data: FunnelItem[] }) {
  const max = data[0]?.value || 1;
  return (
    <ChartCard title="Conversion Funnel" subtitle="User journey stages">
      <div className="space-y-2">
        {data.map((item, i) => {
          const pct = (item.value / max) * 100;
          const convRate = i > 0 ? ((item.value / data[i - 1].value) * 100).toFixed(1) : '100';
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="w-20 text-xs text-gray-400 text-right">{item.stage}</div>
              <div className="flex-1 relative">
                <div className="h-9 rounded-lg bg-[#111827] overflow-hidden">
                  <div
                    className="h-full rounded-lg flex items-center px-3 transition-all duration-700"
                    style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${item.color}, ${item.color}88)` }}
                  >
                    <span className="text-white text-xs font-semibold">{item.value.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <div className="w-12 text-xs text-gray-500">{convRate}%</div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
