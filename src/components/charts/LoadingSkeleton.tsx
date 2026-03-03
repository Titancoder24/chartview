import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

function Shimmer({ className, style, shimmerColor }: { className: string; style?: React.CSSProperties; shimmerColor: string }) {
  return (
    <div className={`relative overflow-hidden rounded-md ${className}`} style={{ ...style, backgroundColor: shimmerColor }}>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite]" />
    </div>
  );
}

export default function LoadingSkeletonComponent() {
  const { theme } = useTheme();
  return (
    <ChartCard title="Loading Skeleton" subtitle="Chart placeholder states">
      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Shimmer className="w-10 h-10 rounded-xl" shimmerColor={theme.gridColor} />
          <div className="flex-1 space-y-2">
            <Shimmer className="h-3 w-3/4" shimmerColor={theme.gridColor} />
            <Shimmer className="h-3 w-1/2" shimmerColor={theme.gridColor} />
          </div>
        </div>
        <div className="flex items-end gap-2 h-32 mt-4">
          {Array.from({ length: 12 }, (_, i) => (
            <Shimmer key={i} className="flex-1" style={{ height: `${30 + Math.random() * 70}%` }} shimmerColor={theme.gridColor} />
          ))}
        </div>
        <div className="flex gap-4 mt-3">
          <Shimmer className="h-3 w-20" shimmerColor={theme.gridColor} />
          <Shimmer className="h-3 w-16" shimmerColor={theme.gridColor} />
          <Shimmer className="h-3 w-24" shimmerColor={theme.gridColor} />
        </div>
      </div>
    </ChartCard>
  );
}
