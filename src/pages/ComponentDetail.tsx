import { useState, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Sparkles, Code, Package, Terminal, Palette } from 'lucide-react';
import { chartRegistry } from '../data/chartRegistry';
import {
  monthlyRevenue, weeklyTraffic, productSales, marketShare, quarterlyData,
  userGrowth, scatterData, heatmapData, funnelData, radarData,
  waterfallData, treemapData, candlestickData, sankey, kpiData,
  gaugeData, timeSeriesData, cohortData, stackedData, divergingData,
  bubbleData, progressData, pieData, horizontalBarData, multiLineData,
  sparklineData, areaComparisonData, distributionData, statusData,
  comparisonData, stepData,
} from '../data/sampleData';
import { useTheme, themes } from '../context/ThemeContext';

const dataMap: Record<string, any> = {
  monthlyRevenue, weeklyTraffic, productSales, marketShare, quarterlyData,
  userGrowth, scatterData, heatmapData, funnelData, radarData,
  waterfallData, treemapData, candlestickData, sankey, kpiData,
  gaugeData, timeSeriesData, cohortData, stackedData, divergingData,
  bubbleData, progressData, pieData, horizontalBarData, multiLineData,
  sparklineData, areaComparisonData, distributionData, statusData,
  comparisonData, stepData,
};

function CodeBlock({ code, label, onCopy, copied }: { code: string; label?: string; onCopy: () => void; copied: boolean }) {
  return (
    <div className="relative rounded-xl overflow-hidden group" style={{ border: '1px solid #2a2a3e' }}>
      <div className="flex items-center justify-between px-4 py-2.5" style={{ backgroundColor: '#1a1a2e', borderBottom: '1px solid #2a2a3e' }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ff5f57' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#febc2e' }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#28c840' }} />
          </div>
          {label && <span className="text-[11px] font-mono" style={{ color: '#5c5c7a' }}>{label}</span>}
        </div>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer opacity-60 hover:opacity-100"
          style={{ backgroundColor: copied ? '#28c840' : '#2a2a3e', color: copied ? '#fff' : '#8b8ba7' }}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-5 text-[13px] leading-relaxed overflow-x-auto" style={{ backgroundColor: '#1e1e2e', color: '#cdd6f4', fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace" }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}

export default function ComponentDetail() {
  const { id } = useParams<{ id: string }>();
  const { theme, themeName, setThemeName } = useTheme();
  const [copiedUsage, setCopiedUsage] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);

  const entry = chartRegistry.find((item) => item.id === id);

  if (!entry) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: theme.background }}>
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ backgroundColor: theme.gridColor }}>
          <Code size={32} style={{ color: theme.textMuted }} />
        </div>
        <p className="text-xl font-bold" style={{ color: theme.textPrimary }}>Component not found</p>
        <p className="text-sm" style={{ color: theme.textMuted }}>The component you're looking for doesn't exist.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium mt-2" style={{ backgroundColor: theme.colors[0], color: '#fff' }}>
          <ArrowLeft size={14} /> Back to Gallery
        </Link>
      </div>
    );
  }

  const Component = entry.component;
  const sampleData = entry.dataKey ? dataMap[entry.dataKey] : undefined;

  const usageCode = entry.dataKey
    ? `import { ${entry.name} } from 'signum-ui';\n\nfunction Dashboard() {\n  return (\n    <${entry.name} data={yourData} />\n  );\n}`
    : `import { ${entry.name} } from 'signum-ui';\n\nfunction Dashboard() {\n  return <${entry.name} />;\n}`;

  const handleCopyUsage = async () => {
    await navigator.clipboard.writeText(usageCode);
    setCopiedUsage(true);
    setTimeout(() => setCopiedUsage(false), 2000);
  };

  const handleCopyInstall = async () => {
    await navigator.clipboard.writeText('npm install signum-ui');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const categoryCharts = chartRegistry.filter(c => c.category === entry.category && c.id !== entry.id).slice(0, 3);

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      {/* Nav */}
      <nav className="border-b" style={{ borderColor: theme.cardBorder }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors[0] }}>
                <Sparkles size={14} color="#fff" />
              </div>
              <span className="text-base font-bold tracking-tight" style={{ color: theme.textPrimary }}>Signum UI</span>
            </Link>
            <span style={{ color: theme.cardBorder }}>/</span>
            <span className="text-sm font-medium" style={{ color: theme.textMuted }}>{entry.name}</span>
          </div>
          <Link to="/" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
            style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.textMuted }}>
            <ArrowLeft size={13} />
            All Components
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="pt-12 pb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md"
              style={{ backgroundColor: `${theme.colors[0]}15`, color: theme.colors[0] }}>
              {entry.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: theme.textPrimary }}>
            {entry.name}
          </h1>
          <p className="mt-3 text-lg leading-relaxed max-w-2xl" style={{ color: theme.textSecondary }}>
            {entry.description}
          </p>
        </div>

        {/* Live Preview */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${theme.colors[0]}15` }}>
              <Code size={12} style={{ color: theme.colors[0] }} />
            </div>
            <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textMuted }}>Live Preview</h2>
          </div>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: theme.cardBorder, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: theme.cardBg, borderBottom: `1px solid ${theme.cardBorder}` }}>
              <span className="text-[11px] font-medium" style={{ color: theme.textMuted }}>Preview</span>
              <div className="flex items-center gap-2">
                <Palette size={11} style={{ color: theme.textMuted }} />
                <select
                  value={themeName}
                  onChange={e => setThemeName(e.target.value)}
                  className="text-[11px] rounded-md px-2 py-1 cursor-pointer focus:outline-none"
                  style={{ backgroundColor: theme.gridColor, color: theme.textSecondary, border: 'none' }}
                >
                  {Object.entries(themes).map(([key, t]) => (
                    <option key={key} value={key}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="p-8" style={{ backgroundColor: theme.background }}>
              <Suspense fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: theme.cardBorder, borderTopColor: theme.colors[0] }} />
                </div>
              }>
                {sampleData !== undefined ? <Component data={sampleData} /> : <Component />}
              </Suspense>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${theme.colors[0]}15` }}>
              <Package size={12} style={{ color: theme.colors[0] }} />
            </div>
            <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textMuted }}>Installation</h2>
          </div>
          <div className="rounded-2xl border p-6 space-y-6" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder }}>
            <div>
              <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
                <Terminal size={14} style={{ color: theme.colors[0] }} />
                Step 1 - Install the package
              </p>
              <CodeBlock code="npm install signum-ui" label="terminal" onCopy={handleCopyInstall} copied={copiedInstall} />
            </div>
            <div>
              <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: theme.textPrimary }}>
                <Code size={14} style={{ color: theme.colors[0] }} />
                Step 2 - Import and use
              </p>
              <CodeBlock code={usageCode} label="tsx" onCopy={handleCopyUsage} copied={copiedUsage} />
            </div>
          </div>
        </section>

        {/* Props / API */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${theme.colors[0]}15` }}>
              <Terminal size={12} style={{ color: theme.colors[0] }} />
            </div>
            <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textMuted }}>API Reference</h2>
          </div>
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: theme.cardBorder }}>
            <table className="w-full text-left">
              <thead>
                <tr style={{ backgroundColor: theme.cardBg, borderBottom: `1px solid ${theme.cardBorder}` }}>
                  <th className="px-5 py-3 text-xs font-semibold" style={{ color: theme.textMuted }}>Prop</th>
                  <th className="px-5 py-3 text-xs font-semibold" style={{ color: theme.textMuted }}>Type</th>
                  <th className="px-5 py-3 text-xs font-semibold" style={{ color: theme.textMuted }}>Default</th>
                  <th className="px-5 py-3 text-xs font-semibold" style={{ color: theme.textMuted }}>Description</th>
                </tr>
              </thead>
              <tbody>
                {entry.dataKey && (
                  <tr style={{ borderBottom: `1px solid ${theme.cardBorder}` }}>
                    <td className="px-5 py-3"><code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: theme.gridColor, color: theme.colors[0] }}>data</code></td>
                    <td className="px-5 py-3 text-xs font-mono" style={{ color: theme.textSecondary }}>any[]</td>
                    <td className="px-5 py-3 text-xs" style={{ color: theme.textMuted }}>required</td>
                    <td className="px-5 py-3 text-xs leading-relaxed" style={{ color: theme.textSecondary }}>Array of data objects to render</td>
                  </tr>
                )}
                <tr style={{ borderBottom: `1px solid ${theme.cardBorder}` }}>
                  <td className="px-5 py-3"><code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: theme.gridColor, color: theme.colors[0] }}>className</code></td>
                  <td className="px-5 py-3 text-xs font-mono" style={{ color: theme.textSecondary }}>string</td>
                  <td className="px-5 py-3 text-xs" style={{ color: theme.textMuted }}>""</td>
                  <td className="px-5 py-3 text-xs leading-relaxed" style={{ color: theme.textSecondary }}>Additional CSS classes for the wrapper</td>
                </tr>
                <tr>
                  <td className="px-5 py-3"><code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: theme.gridColor, color: theme.colors[0] }}>theme</code></td>
                  <td className="px-5 py-3 text-xs font-mono" style={{ color: theme.textSecondary }}>ChartTheme</td>
                  <td className="px-5 py-3 text-xs" style={{ color: theme.textMuted }}>inherited</td>
                  <td className="px-5 py-3 text-xs leading-relaxed" style={{ color: theme.textSecondary }}>Override context theme</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Related Components */}
        {categoryCharts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textMuted }}>More in {entry.category}</h2>
              <Link to="/" className="text-xs font-medium hover:underline" style={{ color: theme.colors[0] }}>View all</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {categoryCharts.map(related => {
                const Rel = related.component;
                const relData = related.dataKey ? dataMap[related.dataKey] : undefined;
                return (
                  <Link key={related.id} to={`/component/${related.id}`}
                    className="group block rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
                    <div className="p-1">
                      <Suspense fallback={<div className="h-48 rounded-xl animate-pulse" style={{ backgroundColor: theme.gridColor }} />}>
                        {relData !== undefined ? <Rel data={relData} /> : <Rel />}
                      </Suspense>
                    </div>
                    <div className="px-4 pb-3 pt-1">
                      <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{related.name}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
