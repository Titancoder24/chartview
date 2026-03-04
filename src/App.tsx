import { useState, Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Search, LayoutGrid, BarChart3, LineChart as LineIcon, PieChart as PieIcon, Activity, Table, Gauge, Layers, GitBranch, ChevronDown, ArrowRight } from 'lucide-react';
import { useTheme, themes } from './context/ThemeContext';
import { chartRegistry, categories } from './data/chartRegistry';
import type { Category } from './data/chartRegistry';
import {
  monthlyRevenue, weeklyTraffic, productSales, marketShare, quarterlyData,
  userGrowth, scatterData, heatmapData, funnelData, radarData,
  waterfallData, treemapData, candlestickData, sankey, kpiData,
  gaugeData, timeSeriesData, cohortData, stackedData, divergingData,
  bubbleData, progressData, pieData, horizontalBarData, multiLineData,
  sparklineData, areaComparisonData, distributionData, statusData,
  comparisonData, stepData,
} from './data/sampleData';
import ComponentDetail from './pages/ComponentDetail';
import ThemeCreator from './pages/ThemeCreator';

const Documentation = lazy(() => import('./pages/Documentation'));

const dataMap: Record<string, any> = {
  monthlyRevenue, weeklyTraffic, productSales, marketShare, quarterlyData,
  userGrowth, scatterData, heatmapData, funnelData, radarData,
  waterfallData, treemapData, candlestickData, sankey, kpiData,
  gaugeData, timeSeriesData, cohortData, stackedData, divergingData,
  bubbleData, progressData, pieData, horizontalBarData, multiLineData,
  sparklineData, areaComparisonData, distributionData, statusData,
  comparisonData, stepData,
};

const catIcons: Record<string, typeof LayoutGrid> = {
  'Lines & Areas': LineIcon, 'Bars & Columns': BarChart3, 'Pies & Radials': PieIcon,
  'Statistical': Activity, 'Custom & Specialty': GitBranch, 'Data Display': Table, 'KPI & Metrics': Gauge,
};

/* ── Shared Nav ── */
function Navbar({ activePage }: { activePage: string }) {
  const { theme, themeName, setThemeName } = useTheme();
  const [open, setOpen] = useState(false);
  const themeNames = Object.keys(themes);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl" style={{ backgroundColor: `${theme.background}cc`, borderBottom: `1px solid ${theme.cardBorder}` }}>
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill={theme.colors[0]} /><path d="M7 17V10l5-5 5 5v7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="text-[15px] font-semibold tracking-tight" style={{ color: theme.textPrimary }}>Signum UI</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {[
              { to: '/', label: 'Components', key: 'components' },
              { to: '/docs', label: 'Docs', key: 'docs' },
              { to: '/themes', label: 'Themes', key: 'themes' },
            ].map(item => (
              <Link key={item.key} to={item.to}
                className="px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors"
                style={{ color: activePage === item.key ? theme.textPrimary : theme.textMuted }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button onClick={() => setOpen(!open)}
              className="flex items-center gap-2 h-8 px-3 rounded-lg text-[12px] font-medium cursor-pointer transition-colors"
              style={{ border: `1px solid ${theme.cardBorder}`, color: theme.textSecondary, backgroundColor: theme.cardBg }}>
              <div className="flex -space-x-0.5">
                {theme.colors.slice(0, 4).map((c, i) => <div key={i} className="w-2.5 h-2.5 rounded-full ring-1" style={{ backgroundColor: c, ringColor: theme.cardBg } as any} />)}
              </div>
              <span className="hidden sm:inline">{themes[themeName]?.name}</span>
              <ChevronDown size={12} />
            </button>
            {open && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                <div className="absolute right-0 mt-2 w-56 max-h-72 overflow-y-auto rounded-lg shadow-lg z-50 py-1"
                  style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
                  {themeNames.map(n => (
                    <button key={n} onClick={() => { setThemeName(n); setOpen(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 text-[12px] text-left cursor-pointer transition-colors"
                      style={{ color: n === themeName ? theme.colors[0] : theme.textSecondary, backgroundColor: n === themeName ? `${theme.colors[0]}08` : 'transparent' }}>
                      <div className="flex gap-0.5 shrink-0">
                        {themes[n].colors.slice(0, 3).map((c, i) => <div key={i} className="w-[7px] h-[7px] rounded-full" style={{ backgroundColor: c }} />)}
                      </div>
                      <span className="truncate">{themes[n].name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ── Homepage ── */
function Gallery() {
  const { theme } = useTheme();
  const [cat, setCat] = useState<Category | 'all'>('all');
  const [q, setQ] = useState('');

  const filtered = chartRegistry.filter(c => {
    if (cat !== 'all' && c.category !== cat) return false;
    if (q && !c.name.toLowerCase().includes(q.toLowerCase()) && !c.description.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      <Navbar activePage="components" />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${theme.colors[0]}08, transparent)` }} />
        <div className="max-w-[1400px] mx-auto px-6 pt-24 pb-20">
          <div className="max-w-3xl">
            <p className="text-[13px] font-semibold mb-4 tracking-wide" style={{ color: theme.colors[0] }}>
              CHART COMPONENT LIBRARY
            </p>
            <h1 className="text-[52px] md:text-[64px] font-extrabold tracking-[-0.04em] leading-[1.05]" style={{ color: theme.textPrimary }}>
              Build beautiful dashboards,{' '}
              <span style={{ color: theme.textMuted }}>faster.</span>
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed max-w-xl" style={{ color: theme.textSecondary }}>
              58 production-ready chart components. 50 themes. Zero config. Works with any data source — analytics, AI agents, real-time pipelines.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <div className="h-10 px-4 rounded-lg flex items-center gap-2 text-[13px] font-mono"
                style={{ backgroundColor: '#0f0f0f', color: '#a1a1aa', border: `1px solid ${theme.cardBorder}` }}>
                <span style={{ color: theme.colors[0] }}>$</span> npm install signum-ui
              </div>
              <Link to="/docs" className="h-10 px-5 rounded-lg flex items-center gap-2 text-[13px] font-medium transition-opacity hover:opacity-90"
                style={{ backgroundColor: theme.colors[0], color: '#fff' }}>
                Get Started <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-14 z-40 backdrop-blur-xl" style={{ backgroundColor: `${theme.background}cc`, borderBottom: `1px solid ${theme.cardBorder}` }}>
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex flex-col md:flex-row items-start md:items-center gap-3">
          <div className="relative w-full md:w-52 shrink-0">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.textMuted }} />
            <input type="text" placeholder="Search..." value={q} onChange={e => setQ(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-lg text-[13px] focus:outline-none"
              style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.textPrimary }}
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {(['all', ...categories] as const).map(c => {
              const Icon = c === 'all' ? LayoutGrid : (catIcons[c] || Layers);
              const active = cat === c;
              return (
                <button key={c} onClick={() => setCat(c as any)}
                  className="h-8 px-3 rounded-md flex items-center gap-1.5 text-[12px] font-medium transition-colors cursor-pointer"
                  style={{
                    backgroundColor: active ? `${theme.colors[0]}12` : 'transparent',
                    color: active ? theme.colors[0] : theme.textMuted,
                  }}>
                  <Icon size={12} />
                  {c === 'all' ? 'All' : c}
                </button>
              );
            })}
          </div>
          <span className="text-[12px] ml-auto shrink-0" style={{ color: theme.textMuted }}>{filtered.length} components</span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(entry => {
            const Comp = entry.component;
            const data = entry.dataKey ? dataMap[entry.dataKey] : undefined;
            return (
              <Link key={entry.id} to={`/component/${entry.id}`}
                className="group block rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: `1px solid ${theme.cardBorder}`, backgroundColor: theme.cardBg }}>
                <div className="p-1">
                  <Suspense fallback={<div className="h-64 rounded-lg animate-pulse" style={{ backgroundColor: theme.gridColor }} />}>
                    {data !== undefined ? <Comp data={data} /> : <Comp />}
                  </Suspense>
                </div>
                <div className="px-4 pb-3 pt-1 flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-semibold" style={{ color: theme.textPrimary }}>{entry.name}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: theme.textMuted }}>{entry.category}</p>
                  </div>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: theme.textMuted }} />
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-[15px] font-medium" style={{ color: theme.textPrimary }}>No results</p>
            <p className="text-[13px] mt-1" style={{ color: theme.textMuted }}>Try a different search term or category.</p>
            <button onClick={() => { setQ(''); setCat('all'); }} className="mt-4 text-[13px] font-medium cursor-pointer" style={{ color: theme.colors[0] }}>Reset filters</button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${theme.cardBorder}` }}>
        <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="6" fill={theme.colors[0]} /><path d="M7 17V10l5-5 5 5v7" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-[14px] font-semibold" style={{ color: theme.textPrimary }}>Signum UI</span>
            </div>
            <p className="text-[12px] leading-relaxed" style={{ color: theme.textMuted }}>
              Open-source chart library for React. 58 components, 50 themes, fully typed.
            </p>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: theme.textMuted }}>Product</p>
              {[{ to: '/', l: 'Components' }, { to: '/docs', l: 'Documentation' }, { to: '/themes', l: 'Themes' }].map(x => (
                <Link key={x.to} to={x.to} className="block text-[12px] py-1 transition-colors hover:opacity-70" style={{ color: theme.textSecondary }}>{x.l}</Link>
              ))}
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider mb-3" style={{ color: theme.textMuted }}>Resources</p>
              {[{ to: '/docs#getting-started', l: 'Getting Started' }, { to: '/docs#mcp', l: 'MCP Integration' }, { to: '/docs#api', l: 'API Reference' }].map(x => (
                <Link key={x.to} to={x.to} className="block text-[12px] py-1 transition-colors hover:opacity-70" style={{ color: theme.textSecondary }}>{x.l}</Link>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 pb-6">
          <p className="text-[11px]" style={{ color: theme.textMuted }}>MIT License. Built with React, TypeScript, Recharts.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Gallery />} />
      <Route path="/component/:id" element={<ComponentDetail />} />
      <Route path="/themes" element={<ThemeCreator />} />
      <Route path="/docs" element={
        <Suspense fallback={<div className="min-h-screen" />}>
          <Documentation />
        </Suspense>
      } />
    </Routes>
  );
}
