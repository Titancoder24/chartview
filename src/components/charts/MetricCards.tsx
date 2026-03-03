import { TrendingUp, Users, ShoppingCart, Activity } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const metrics = [
  { icon: TrendingUp, label: 'Revenue', value: '$48.2K', desc: '+12% from last month' },
  { icon: Users, label: 'Users', value: '2,420', desc: '+180 this week' },
  { icon: ShoppingCart, label: 'Orders', value: '1,210', desc: 'Avg $39.80' },
  { icon: Activity, label: 'Uptime', value: '99.98%', desc: 'Last 30 days' },
];

export default function MetricCardsComponent() {
  const { theme } = useTheme();
  return (
    <div className="grid grid-cols-2 gap-3">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        return (
          <div key={i} className="rounded-xl p-4 transition-all" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors[i % theme.colors.length] + '18' }}>
                <Icon size={14} style={{ color: theme.colors[i % theme.colors.length] }} />
              </div>
              <span className="text-xs" style={{ color: theme.textMuted }}>{m.label}</span>
            </div>
            <p className="text-lg font-bold" style={{ color: theme.textPrimary }}>{m.value}</p>
            <p className="text-xs mt-1" style={{ color: theme.textMuted }}>{m.desc}</p>
          </div>
        );
      })}
    </div>
  );
}
