const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

export default function SemiCircleGaugeComponent() {
  const value = 76;
  const r = 80;
  const circumference = Math.PI * r;
  const dashOffset = circumference * (1 - value / 100);

  return (
    <ChartCard title="Performance Score" subtitle="Overall system performance">
      <div className="flex flex-col items-center">
        <svg width="200" height="120" viewBox="0 0 200 120">
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" />
          <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#semiGrad)" strokeWidth="12" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 1.5s ease-in-out' }} />
          <defs>
            <linearGradient id="semiGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <text x="100" y="90" textAnchor="middle" fill="white" fontSize="28" fontWeight="bold">{value}</text>
          <text x="100" y="108" textAnchor="middle" fill="#6b7280" fontSize="11">out of 100</text>
        </svg>
        <div className="flex justify-between w-48 mt-2">
          <span className="text-gray-500 text-xs">Poor</span>
          <span className="text-indigo-400 text-xs font-medium">Good</span>
          <span className="text-gray-500 text-xs">Excellent</span>
        </div>
      </div>
    </ChartCard>
  );
}
