const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const rangeData = [
  { label: 'Jan', lo: 18, hi: 42 },
  { label: 'Feb', lo: 22, hi: 48 },
  { label: 'Mar', lo: 28, hi: 55 },
  { label: 'Apr', lo: 32, hi: 58 },
  { label: 'May', lo: 38, hi: 65 },
  { label: 'Jun', lo: 42, hi: 72 },
  { label: 'Jul', lo: 45, hi: 78 },
  { label: 'Aug', lo: 40, hi: 75 },
  { label: 'Sep', lo: 35, hi: 62 },
  { label: 'Oct', lo: 28, hi: 52 },
  { label: 'Nov', lo: 22, hi: 45 },
  { label: 'Dec', lo: 15, hi: 38 },
];

export default function RangeBarComponent() {
  const max = 90;
  return (
    <ChartCard title="Temperature Range" subtitle="Monthly high-low range bars">
      <div className="flex items-end gap-2 h-48 px-2">
        {rangeData.map((d, i) => {
          const bottom = (d.lo / max) * 100;
          const top = (d.hi / max) * 100;
          return (
            <div key={i} className="flex-1 flex flex-col items-center relative h-full">
              <div className="absolute w-full flex flex-col items-center" style={{ bottom: `${bottom}%`, height: `${top - bottom}%` }}>
                <div className="w-3 h-full rounded-full" style={{ background: 'linear-gradient(180deg, #6366f1, #8b5cf6)' }} />
              </div>
              <span className="absolute -bottom-5 text-gray-500 text-[9px]">{d.label}</span>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
