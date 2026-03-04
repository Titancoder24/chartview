import { useState, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Sparkles, Code, Palette, ExternalLink } from 'lucide-react';
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

/* ── Code Block ─────────────────────────────────────────────────────────────── */

function CodeBlock({
  code,
  label,
}: {
  code: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="relative group rounded-lg overflow-hidden"
      style={{ border: '1px solid #252525' }}
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ backgroundColor: '#141414', borderBottom: '1px solid #252525' }}
      >
        {label && (
          <span
            className="text-[11px] font-mono tracking-wide"
            style={{ color: '#555' }}
          >
            {label}
          </span>
        )}
        {!label && <span />}

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium transition-all duration-150 cursor-pointer opacity-0 group-hover:opacity-100 focus:opacity-100"
          style={{
            backgroundColor: copied ? '#22c55e' : '#1f1f1f',
            color: copied ? '#fff' : '#888',
            border: `1px solid ${copied ? '#22c55e' : '#333'}`,
          }}
        >
          {copied ? <Check size={10} /> : <Copy size={10} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Code content */}
      <pre
        className="px-5 py-4 text-[13px] leading-relaxed overflow-x-auto"
        style={{
          backgroundColor: '#0f0f0f',
          color: '#e4e4e7',
          fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', 'Cascadia Code', monospace",
          margin: 0,
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* ── Props Table Row ────────────────────────────────────────────────────────── */

function PropRow({
  prop,
  type,
  defaultVal,
  description,
  isLast,
}: {
  prop: string;
  type: string;
  defaultVal: string;
  description: string;
  isLast?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <tr style={{ borderBottom: isLast ? 'none' : `1px solid ${theme.cardBorder}` }}>
      <td className="px-5 py-3.5">
        <code
          className="text-xs font-mono px-1.5 py-0.5 rounded"
          style={{ backgroundColor: theme.gridColor, color: theme.accent }}
        >
          {prop}
        </code>
      </td>
      <td
        className="px-5 py-3.5 text-xs font-mono"
        style={{ color: theme.textSecondary }}
      >
        {type}
      </td>
      <td
        className="px-5 py-3.5 text-xs"
        style={{ color: theme.textMuted }}
      >
        {defaultVal}
      </td>
      <td
        className="px-5 py-3.5 text-sm leading-relaxed"
        style={{ color: theme.textSecondary }}
      >
        {description}
      </td>
    </tr>
  );
}

/* ── Main Component ─────────────────────────────────────────────────────────── */

export default function ComponentDetail() {
  const { id } = useParams<{ id: string }>();
  const { theme, themeName, setThemeName } = useTheme();

  const entry = chartRegistry.find((item) => item.id === id);

  /* ── 404 State ──────────────────────────────────────────────────────────── */

  if (!entry) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: theme.background }}
      >
        <div className="flex flex-col items-center gap-6 max-w-md text-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: theme.gridColor }}
          >
            <Code size={28} style={{ color: theme.textMuted }} />
          </div>
          <div>
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ color: theme.textPrimary }}
            >
              Component not found
            </h1>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: theme.textMuted }}
            >
              The component you are looking for does not exist or may have been moved.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: theme.accent, color: '#fff' }}
          >
            <ArrowLeft size={14} />
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  /* ── Data ────────────────────────────────────────────────────────────────── */

  const Component = entry.component;
  const sampleData = entry.dataKey ? dataMap[entry.dataKey] : undefined;

  const installCode = 'npm install signum-ui';

  const usageCode = entry.dataKey
    ? `import { ${entry.name} } from 'signum-ui';\n\nfunction Dashboard() {\n  return (\n    <${entry.name}\n      data={${entry.dataKey}}\n    />\n  );\n}`
    : `import { ${entry.name} } from 'signum-ui';\n\nfunction Dashboard() {\n  return <${entry.name} />;\n}`;

  const relatedCharts = chartRegistry
    .filter((c) => c.category === entry.category && c.id !== entry.id)
    .slice(0, 3);

  /* ── Render ─────────────────────────────────────────────────────────────── */

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      {/* ── Top Navigation ──────────────────────────────────────────────────── */}
      <nav
        style={{
          borderBottom: `1px solid ${theme.cardBorder}`,
          backgroundColor: theme.background,
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Left: logo + breadcrumb */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: theme.accent }}
              >
                <Sparkles size={14} color="#fff" />
              </div>
              <span
                className="text-sm font-semibold tracking-tight"
                style={{ color: theme.textPrimary }}
              >
                Signum UI
              </span>
            </Link>

            <span
              className="text-sm select-none"
              style={{ color: theme.cardBorder }}
            >
              /
            </span>

            <span
              className="text-sm"
              style={{ color: theme.textMuted }}
            >
              {entry.name}
            </span>
          </div>

          {/* Right: back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-80"
            style={{
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`,
              color: theme.textSecondary,
            }}
          >
            <ArrowLeft size={12} />
            All Components
          </Link>
        </div>
      </nav>

      {/* ── Page Content ────────────────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6">
        {/* ── Hero Header ─────────────────────────────────────────────────── */}
        <header className="pt-16 pb-12">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full"
              style={{
                backgroundColor: `${theme.accent}14`,
                color: theme.accent,
              }}
            >
              {entry.category}
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ color: theme.textPrimary, lineHeight: 1.1 }}
          >
            {entry.name}
          </h1>

          <p
            className="mt-4 text-lg leading-relaxed max-w-2xl"
            style={{ color: theme.textSecondary }}
          >
            {entry.description}
          </p>
        </header>

        {/* ── Live Preview ────────────────────────────────────────────────── */}
        <section className="mb-16">
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${theme.cardBorder}` }}
          >
            {/* Preview toolbar */}
            <div
              className="flex items-center justify-between px-5 py-3"
              style={{
                backgroundColor: theme.cardBg,
                borderBottom: `1px solid ${theme.cardBorder}`,
              }}
            >
              <span
                className="text-xs font-medium"
                style={{ color: theme.textMuted }}
              >
                Preview
              </span>

              {/* Theme selector */}
              <div className="flex items-center gap-2">
                <Palette size={12} style={{ color: theme.textMuted }} />
                <select
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                  className="text-xs rounded-md px-2 py-1 cursor-pointer focus:outline-none appearance-none"
                  style={{
                    backgroundColor: theme.gridColor,
                    color: theme.textSecondary,
                    border: `1px solid ${theme.cardBorder}`,
                  }}
                >
                  {Object.entries(themes).map(([key, t]) => (
                    <option key={key} value={key}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preview canvas */}
            <div className="p-8 sm:p-10" style={{ backgroundColor: theme.background }}>
              <Suspense
                fallback={
                  <div className="flex items-center justify-center h-64">
                    <div
                      className="w-6 h-6 rounded-full animate-spin"
                      style={{
                        border: `2px solid ${theme.cardBorder}`,
                        borderTopColor: theme.accent,
                      }}
                    />
                  </div>
                }
              >
                {sampleData !== undefined ? (
                  <Component data={sampleData} />
                ) : (
                  <Component />
                )}
              </Suspense>
            </div>
          </div>
        </section>

        {/* ── Usage / Code ────────────────────────────────────────────────── */}
        <section className="mb-16">
          <h2
            className="text-xl font-semibold tracking-tight mb-6"
            style={{ color: theme.textPrimary }}
          >
            Usage
          </h2>

          <div className="space-y-4">
            {/* Install */}
            <div>
              <p
                className="text-xs font-medium uppercase tracking-wider mb-2"
                style={{ color: theme.textMuted }}
              >
                Install
              </p>
              <CodeBlock code={installCode} label="terminal" />
            </div>

            {/* Import + JSX */}
            <div>
              <p
                className="text-xs font-medium uppercase tracking-wider mb-2"
                style={{ color: theme.textMuted }}
              >
                Component
              </p>
              <CodeBlock code={usageCode} label="tsx" />
            </div>
          </div>
        </section>

        {/* ── Props Table ─────────────────────────────────────────────────── */}
        <section className="mb-16">
          <h2
            className="text-xl font-semibold tracking-tight mb-6"
            style={{ color: theme.textPrimary }}
          >
            Props
          </h2>

          <div
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${theme.cardBorder}` }}
          >
            <table className="w-full text-left">
              <thead>
                <tr
                  style={{
                    backgroundColor: theme.cardBg,
                    borderBottom: `1px solid ${theme.cardBorder}`,
                  }}
                >
                  {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider"
                      style={{ color: theme.textMuted }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entry.dataKey && (
                  <PropRow
                    prop="data"
                    type="any[]"
                    defaultVal="required"
                    description="Array of data objects to render in the chart."
                                     />
                )}
                <PropRow
                  prop="className"
                  type="string"
                  defaultVal='""'
                  description="Additional CSS classes applied to the root wrapper element."
                                 />
                <PropRow
                  prop="theme"
                  type="ChartTheme"
                  defaultVal="inherited"
                  description="Override the theme provided by ThemeContext."
                                   isLast
                />
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Related Components ──────────────────────────────────────────── */}
        {relatedCharts.length > 0 && (
          <section className="pb-20">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-semibold tracking-tight"
                style={{ color: theme.textPrimary }}
              >
                Related
              </h2>
              <Link
                to="/"
                className="inline-flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-70"
                style={{ color: theme.accent }}
              >
                View all
                <ExternalLink size={11} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedCharts.map((related) => {
                const RelComponent = related.component;
                const relData = related.dataKey
                  ? dataMap[related.dataKey]
                  : undefined;

                return (
                  <Link
                    key={related.id}
                    to={`/component/${related.id}`}
                    className="group block rounded-xl transition-all duration-200"
                    style={{
                      backgroundColor: theme.cardBg,
                      border: `1px solid ${theme.cardBorder}`,
                    }}
                  >
                    {/* Mini preview */}
                    <div
                      className="p-3 overflow-hidden"
                      style={{
                        borderBottom: `1px solid ${theme.cardBorder}`,
                      }}
                    >
                      <div className="pointer-events-none">
                        <Suspense
                          fallback={
                            <div
                              className="h-36 rounded-lg animate-pulse"
                              style={{ backgroundColor: theme.gridColor }}
                            />
                          }
                        >
                          {relData !== undefined ? (
                            <RelComponent data={relData} />
                          ) : (
                            <RelComponent />
                          )}
                        </Suspense>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div className="px-4 py-3 flex items-center justify-between">
                      <div>
                        <p
                          className="text-sm font-medium"
                          style={{ color: theme.textPrimary }}
                        >
                          {related.name}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: theme.textMuted }}
                        >
                          {related.category}
                        </p>
                      </div>
                      <ArrowLeft
                        size={14}
                        className="rotate-180 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: theme.textMuted }}
                      />
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
