import { useTheme } from '../../context/ThemeContext';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function ChartCard({ title, subtitle, children, className = '' }: ChartCardProps) {
  const { theme } = useTheme();
  return (
    <div
      className={`rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${className}`}
      style={{
        backgroundColor: theme.cardBg,
        borderWidth: '1px',
        borderColor: theme.cardBorder,
        boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)',
      }}
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{title}</h3>
        {subtitle && <p className="text-xs mt-1" style={{ color: theme.textMuted }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
