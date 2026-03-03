import ChartCard from '../layout/ChartCard';
import { useTheme } from '../../context/ThemeContext';
export default function CohortTableComponent({ data }: { data: any[] }) {
  const { theme } = useTheme();
  const weeks = ['W1','W2','W3','W4','W5','W6'];
  const getCellBg = (val: number) => `${theme.colors[0]}${Math.round((val / 100) * 200).toString(16).padStart(2, '0')}`;
  return (
    <ChartCard title="Cohort Retention" subtitle="Weekly user retention rates">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead><tr>
            <th className="text-left py-1 px-2 font-medium" style={{ color: theme.textMuted }}>Cohort</th>
            {weeks.map(w => <th key={w} className="text-center py-1 px-2 font-medium" style={{ color: theme.textMuted }}>{w}</th>)}
          </tr></thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td className="py-1 px-2 font-medium" style={{ color: theme.textSecondary }}>{row.cohort}</td>
                {weeks.map((w, j) => { const key = w.toLowerCase().replace('w', 'w'); const val = row[key] ?? 0;
                  return (<td key={j} className="text-center py-1 px-2"><div className="rounded-md py-1" style={{ backgroundColor: getCellBg(val) }}><span style={{ color: val > 60 ? '#fff' : theme.textPrimary }}>{val}%</span></div></td>);
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ChartCard>
  );
}
