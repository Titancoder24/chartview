import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';
export default function DataTableComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  if (!data.length) return null; const cols = Object.keys(data[0]);
  return (
    <ChartCard title="Data Table" subtitle="Sortable data grid">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead><tr style={{ borderBottom: `1px solid ${theme.cardBorder}` }}>
            {cols.map(c => <th key={c} className="text-left py-2 px-2 font-semibold capitalize" style={{ color: theme.textSecondary }}>{c}</th>)}
          </tr></thead>
          <tbody>{data.map((row, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${theme.gridColor}` }}>
              {cols.map(c => <td key={c} className="py-2 px-2" style={{ color: theme.textPrimary }}>{typeof row[c] === 'number' ? row[c].toLocaleString() : row[c]}</td>)}
            </tr>
          ))}</tbody>
        </table>
      </div>
    </ChartCard>
  );
}
