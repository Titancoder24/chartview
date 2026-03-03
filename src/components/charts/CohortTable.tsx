const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

function getRetentionColor(val: number) {
  const t = val / 100;
  return `rgba(99, 102, 241, ${0.1 + t * 0.8})`;
}

export default function CohortTableComponent({ data }: { data: any[] }) {
  const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6'];
  return (
    <ChartCard title="Cohort Retention" subtitle="Weekly retention by signup cohort">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left text-gray-500 pb-2 pr-3">Cohort</th>
              {weeks.map(w => <th key={w} className="text-center text-gray-500 pb-2 px-1">{w}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td className="text-gray-400 py-1 pr-3">{row.cohort}</td>
                {weeks.map((w, wi) => {
                  const key = `w${wi + 1}` as keyof typeof row;
                  const val = row[key] as number;
                  return (
                    <td key={w} className="py-1 px-1">
                      <div className="text-center rounded-md py-1.5 text-white font-medium transition-all duration-200 hover:scale-105"
                        style={{ backgroundColor: getRetentionColor(val) }}>
                        {val}%
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}
