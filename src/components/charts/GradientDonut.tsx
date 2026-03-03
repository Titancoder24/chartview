const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

export default function GradientDonutComponent() {
  const value = 73;
  const r = 70;
  const circumference = 2 * Math.PI * r;
  const dashOffset = circumference * (1 - value / 100);

  return (
    <ChartCard title="Completion Rate" subtitle="Gradient ring progress">
      <div className="flex flex-col items-center">
        <svg width="180" height="180" viewBox="0 0 180 180">
          <defs>
            <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <circle cx="90" cy="90" r={r} fill="none" stroke="#1e293b" strokeWidth="10" />
          <circle cx="90" cy="90" r={r} fill="none" stroke="url(#ringGrad)" strokeWidth="10"
            strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset}
            transform="rotate(-90 90 90)"
            style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }} />
          <text x="90" y="82" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold">{value}%</text>
          <text x="90" y="102" textAnchor="middle" fill="#6b7280" fontSize="11">Completed</text>
        </svg>
      </div>
    </ChartCard>
  );
}
