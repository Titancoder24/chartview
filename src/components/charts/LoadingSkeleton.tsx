import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

export default function LoadingSkeletonComponent() {
  const { theme } = useTheme();
  const Bone = ({ className }: { className: string }) => (
    <div className={`rounded animate-pulse ${className}`} style={{ backgroundColor: theme.gridColor }} />
  );
  return (
    <ChartCard title="Loading State" subtitle="Skeleton placeholder pattern">
      <div className="space-y-3">
        <div className="flex gap-3">
          <Bone className="w-16 h-16 rounded-xl" />
          <div className="flex-1 space-y-2 py-1">
            <Bone className="h-3 w-3/4" />
            <Bone className="h-3 w-1/2" />
            <Bone className="h-3 w-1/3" />
          </div>
        </div>
        <Bone className="h-32 w-full rounded-xl" />
        <div className="flex gap-2">
          <Bone className="h-8 flex-1 rounded-lg" />
          <Bone className="h-8 flex-1 rounded-lg" />
          <Bone className="h-8 flex-1 rounded-lg" />
        </div>
      </div>
    </ChartCard>
  );
}
