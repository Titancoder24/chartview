import { TrendingUp, TrendingDown } from 'lucide-react';

const ChartCard = ({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <div className="bg-[#0a0f1a] border border-[#1e293b] rounded-2xl p-6 hover:border-[#334155] transition-all duration-300">
    <div className="mb-4">
      <h3 className="text-white text-sm font-semibold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

export default function DataTableComponent({ data }: { data: any[] }) {
  return (
    <ChartCard title="Sales Breakdown" subtitle="Product performance table">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#1e293b]">
              <th className="text-left text-gray-500 text-xs font-medium pb-3">Product</th>
              <th className="text-right text-gray-500 text-xs font-medium pb-3">Sales</th>
              <th className="text-right text-gray-500 text-xs font-medium pb-3">Growth</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-[#111827] hover:bg-[#111827] transition-colors">
                <td className="py-3 text-gray-300">{row.product}</td>
                <td className="py-3 text-right text-white font-medium">${(row.sales / 1000).toFixed(0)}K</td>
                <td className="py-3 text-right">
                  <span className={`inline-flex items-center gap-1 text-xs font-medium ${row.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {row.growth >= 0 ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                    {row.growth >= 0 ? '+' : ''}{row.growth}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}
