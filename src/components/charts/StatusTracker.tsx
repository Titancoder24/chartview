import { CheckCircle, AlertTriangle, Wrench } from 'lucide-react';

const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

interface StatusItem { service: string; status: string; uptime: number }

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; bg: string; label: string }> = {
  operational: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/10', label: 'Operational' },
  degraded: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-400/10', label: 'Degraded' },
  maintenance: { icon: Wrench, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Maintenance' },
};

export default function StatusTrackerComponent({ data }: { data: StatusItem[] }) {
  return (
    <ChartCard title="Service Status" subtitle="Infrastructure health monitor">
      <div className="space-y-2">
        {data.map((item, i) => {
          const cfg = statusConfig[item.status] || statusConfig.operational;
          const Icon = cfg.icon;
          return (
            <div key={i} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#111827] transition-colors">
              <div className="flex items-center gap-3">
                <Icon size={14} className={cfg.color} />
                <span className="text-gray-300 text-sm">{item.service}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-xs">{item.uptime}%</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
