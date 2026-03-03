const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

function Shimmer({ className, style }: { className: string; style?: React.CSSProperties }) {
  return (
    <div className={`relative overflow-hidden rounded-md bg-[#111827] ${className}`} style={style}>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#1e293b] to-transparent animate-[shimmer_2s_infinite]" />
    </div>
  );
}

export default function LoadingSkeletonComponent() {
  return (
    <ChartCard title="Loading Skeleton" subtitle="Chart placeholder states">
      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Shimmer className="w-10 h-10 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-3 w-3/4" />
            <Shimmer className="h-3 w-1/2" />
          </div>
        </div>
        <div className="flex items-end gap-2 h-32 mt-4">
          {Array.from({ length: 12 }, (_, i) => (
            <Shimmer key={i} className="flex-1" style={{ height: `${30 + Math.random() * 70}%` }} />
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          <Shimmer className="h-3 w-20" />
          <Shimmer className="h-3 w-16" />
          <Shimmer className="h-3 w-24" />
        </div>
      </div>
    </ChartCard>
  );
}
