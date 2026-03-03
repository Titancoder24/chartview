import { useState, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
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
import { useTheme } from '../context/ThemeContext';

const dataMap: Record<string, any> = {
  monthlyRevenue,
  weeklyTraffic,
  productSales,
  marketShare,
  quarterlyData,
  userGrowth,
  scatterData,
  heatmapData,
  funnelData,
  radarData,
  waterfallData,
  treemapData,
  candlestickData,
  sankey,
  kpiData,
  gaugeData,
  timeSeriesData,
  cohortData,
  stackedData,
  divergingData,
  bubbleData,
  progressData,
  pieData,
  horizontalBarData,
  multiLineData,
  sparklineData,
  areaComparisonData,
  distributionData,
  statusData,
  comparisonData,
  stepData,
};

export default function ComponentDetail() {
  const { id } = useParams<{ id: string }>();
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const entry = chartRegistry.find((item) => item.id === id);

  if (!entry) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{ backgroundColor: theme.background }}
      >
        <p className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>
          Component not found
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-80"
          style={{ color: theme.colors[0] }}
        >
          <ArrowLeft size={16} />
          Back to gallery
        </Link>
      </div>
    );
  }

  const Component = entry.component;
  const sampleData = entry.dataKey ? dataMap[entry.dataKey] : undefined;

  const codeSnippet = `import { ${entry.name} } from 'signum-ui';

<${entry.name}${entry.dataKey ? ' data={sampleData}' : ''} />`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback silently
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <header
        className="border-b"
        style={{ borderColor: theme.cardBorder }}
      >
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors hover:opacity-80"
            style={{
              borderColor: theme.cardBorder,
              backgroundColor: theme.cardBg,
              color: theme.textPrimary,
            }}
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: theme.textPrimary }}>
              {entry.name}
            </h1>
            <p className="text-sm mt-0.5" style={{ color: theme.textMuted }}>
              {entry.description}
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-10">
        {/* Live Preview */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: theme.textMuted }}>
            Live Preview
          </h2>
          <div
            className="rounded-2xl border p-8"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.cardBorder,
              boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)',
            }}
          >
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  <div
                    className="w-8 h-8 border-2 rounded-full animate-spin"
                    style={{
                      borderColor: theme.cardBorder,
                      borderTopColor: theme.colors[0],
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
        </section>

        {/* Code Snippet */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: theme.textMuted }}>
              Usage
            </h2>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer"
              style={{
                backgroundColor: copied ? theme.colors[0] : theme.cardBg,
                color: copied ? '#ffffff' : theme.textMuted,
                border: `1px solid ${copied ? theme.colors[0] : theme.cardBorder}`,
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copied!' : 'Copy code'}
            </button>
          </div>
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: `1px solid ${theme.cardBorder}` }}
          >
            <pre
              className="p-6 text-sm leading-relaxed overflow-x-auto"
              style={{
                backgroundColor: '#1e1e2e',
                color: '#cdd6f4',
                fontFamily: "'SF Mono', 'Fira Code', 'JetBrains Mono', monospace",
              }}
            >
              <code>
                <span style={{ color: '#c678dd' }}>import</span>
                {' { '}
                <span style={{ color: '#e06c75' }}>{entry.name}</span>
                {' } '}
                <span style={{ color: '#c678dd' }}>from</span>
                {' '}
                <span style={{ color: '#98c379' }}>'signum-ui'</span>
                {';'}
                {'\n\n'}
                <span style={{ color: '#e06c75' }}>{'<'}{entry.name}</span>
                {entry.dataKey && (
                  <>
                    {' '}
                    <span style={{ color: '#d19a66' }}>data</span>
                    <span style={{ color: '#56b6c2' }}>{'='}</span>
                    <span style={{ color: '#c678dd' }}>{'{'}</span>
                    <span style={{ color: '#e5c07b' }}>sampleData</span>
                    <span style={{ color: '#c678dd' }}>{'}'}</span>
                  </>
                )}
                {' '}
                <span style={{ color: '#e06c75' }}>{'/>'}</span>
              </code>
            </pre>
          </div>
        </section>

        {/* Install Instructions */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: theme.textMuted }}>
            Installation
          </h2>
          <div
            className="rounded-2xl border p-6 space-y-5"
            style={{
              backgroundColor: theme.cardBg,
              borderColor: theme.cardBorder,
            }}
          >
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                1. Install the package
              </p>
              <div
                className="rounded-lg px-4 py-3 text-sm font-mono"
                style={{
                  backgroundColor: '#1e1e2e',
                  color: '#cdd6f4',
                }}
              >
                <span style={{ color: '#98c379' }}>$</span>{' '}
                npm install signum-ui
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                2. Import the component
              </p>
              <div
                className="rounded-lg px-4 py-3 text-sm font-mono"
                style={{
                  backgroundColor: '#1e1e2e',
                  color: '#cdd6f4',
                }}
              >
                <span style={{ color: '#c678dd' }}>import</span>
                {' { '}
                <span style={{ color: '#e06c75' }}>{entry.name}</span>
                {' } '}
                <span style={{ color: '#c678dd' }}>from</span>
                {' '}
                <span style={{ color: '#98c379' }}>'signum-ui'</span>
                {';'}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: theme.textPrimary }}>
                3. Use it in your app
              </p>
              <div
                className="rounded-lg px-4 py-3 text-sm font-mono"
                style={{
                  backgroundColor: '#1e1e2e',
                  color: '#cdd6f4',
                }}
              >
                <span style={{ color: '#e06c75' }}>{'<'}{entry.name}</span>
                {entry.dataKey ? (
                  <>
                    {' '}
                    <span style={{ color: '#d19a66' }}>data</span>
                    <span style={{ color: '#56b6c2' }}>{'='}</span>
                    <span style={{ color: '#c678dd' }}>{'{'}</span>
                    <span style={{ color: '#e5c07b' }}>yourData</span>
                    <span style={{ color: '#c678dd' }}>{'}'}</span>
                  </>
                ) : null}
                {' '}
                <span style={{ color: '#e06c75' }}>{'/>'}</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
