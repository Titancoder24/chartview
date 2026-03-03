import { useEffect, useState } from 'react';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

const tickers = [
  { label: 'Total Revenue', target: 284500, prefix: '$', suffix: '' },
  { label: 'Active Subscribers', target: 12847, prefix: '', suffix: '' },
  { label: 'Conversion Rate', target: 324, prefix: '', suffix: '%', divider: 100 },
  { label: 'Avg Response Time', target: 142, prefix: '', suffix: 'ms' },
];

export default function NumberTickerComponent() {
  const { theme } = useTheme();
  const [values, setValues] = useState(tickers.map(() => 0));
  useEffect(() => {
    const duration = 1500;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValues(tickers.map(t => Math.round(t.target * eased)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);
  return (
    <ChartCard title="Animated Counters" subtitle="Number ticker with easing">
      <div className="grid grid-cols-2 gap-3">
        {tickers.map((t, i) => {
          const display = t.divider ? (values[i] / t.divider).toFixed(2) : values[i].toLocaleString();
          return (
            <div key={i} className="rounded-lg p-3 text-center" style={{ backgroundColor: theme.gridColor + '40' }}>
              <p className="text-lg font-bold font-mono" style={{ color: theme.textPrimary }}>{t.prefix}{display}{t.suffix}</p>
              <p className="text-xs mt-1" style={{ color: theme.textMuted }}>{t.label}</p>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}
