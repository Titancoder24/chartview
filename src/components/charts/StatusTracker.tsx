import { CheckCircle, AlertTriangle, Wrench } from 'lucide-react';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';
interface StatusItem { service: string; status: string; uptime: number }
const icons: Record<string, any> = { operational: CheckCircle, degraded: AlertTriangle, maintenance: Wrench };
const statusColors: Record<string, string> = { operational: '#10b981', degraded: '#f59e0b', maintenance: '#3b82f6' };
export default function StatusTrackerComponent({ data }: { data: StatusItem[] }) {
  const { theme } = useTheme();
  return (
    <ChartCard title="Service Status" subtitle="Infrastructure health monitor">
      <div className="space-y-2.5">
        {data.map((s, i) => {
          const Icon = icons[s.status] || CheckCircle; const color = statusColors[s.status] || theme.positive;
          return (
            <div key={i} className="flex items-center justify-between py-1.5 rounded-lg px-2" style={{ backgroundColor: theme.gridColor + '40' }}>
              <div className="flex items-center gap-2">
                <Icon size={14} style={{ color }} />
                <span className="text-xs font-medium" style={{ color: theme.textPrimary }}>{s.service}</span>
              </div>
              <span className="text-xs font-mono" style={{ color: theme.textMuted }}>{s.uptime}%</span>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
