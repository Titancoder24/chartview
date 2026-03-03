import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';

function AnimatedNumber({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const dur = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * ease));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target]);
  return <span>{prefix}{val.toLocaleString()}{suffix}</span>;
}

const counters = [
  { label: 'Total Downloads', value: 1284930, prefix: '', suffix: '' },
  { label: 'GitHub Stars', value: 48200, prefix: '', suffix: '' },
  { label: 'Contributors', value: 842, prefix: '', suffix: '' },
  { label: 'Weekly Active', value: 95400, prefix: '', suffix: '' },
];

export default function NumberTickerComponent() {
  const { theme } = useTheme();
  return (
    <ChartCard title="Live Counters" subtitle="Animated number tickers">
      <div className="grid grid-cols-2 gap-4">
        {counters.map((c, i) => (
          <div key={i} className="text-center py-4">
            <p className="text-3xl font-bold tabular-nums" style={{ color: theme.textPrimary }}>
              <AnimatedNumber target={c.value} prefix={c.prefix} suffix={c.suffix} />
            </p>
            <p className="text-xs mt-1 flex items-center justify-center gap-1" style={{ color: theme.textMuted }}>
              {c.label} <ArrowUpRight size={10} style={{ color: theme.positive }} />
            </p>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}
