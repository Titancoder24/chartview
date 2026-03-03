import { useState, Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Search, LayoutGrid, BarChart3, LineChart as LineIcon, PieChart as PieIcon, Activity, Table, Gauge, Layers, GitBranch, Sparkles, Palette, ChevronDown, Book, ArrowRight } from 'lucide-react';
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

const categoryIcons: Record<string, typeof LayoutGrid> = {
  'Lines & Areas': LineIcon,
  'Bars & Columns': BarChart3,
  'Pies & Radials': PieIcon,
  'Statistical': Activity,
  'Custom & Specialty': GitBranch,
  'Data Display': Table,
  'KPI & Metrics': Gauge,
};

function Gallery() {
  const { theme, themeName, setThemeName } = useTheme();
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  const filtered = chartRegistry.filter(c => {
    const matchCat = activeCategory === 'all' || c.category === activeCategory;
    const matchSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const themeNames = Object.keys(themes);

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: theme.background }}>
      {/* Top Nav */}
      <nav className="border-b" style={{ borderColor: theme.cardBorder, backgroundColor: theme.background }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.colors[0] }}>
                <Sparkles size={14} color="#fff" />
              </div>
              <span className="text-base font-bold tracking-tight" style={{ color: theme.textPrimary }}>Signum UI</span>
            </Link>
            <div className="hidden md:flex items-center gap-1">
              <Link to="/" className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ color: theme.colors[0], backgroundColor: `${theme.colors[0]}10` }}>Components</Link>
              <Link to="/docs" className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:opacity-70" style={{ color: theme.textMuted }}>Documentation</Link>
              <Link to="/themes" className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:opacity-70" style={{ color: theme.textMuted }}>Themes</Link>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all"
              style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.textSecondary }}
            >
              <div className="flex gap-0.5">
                {theme.colors.slice(0, 4).map((c, i) => (
                  <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="hidden sm:inline">{themes[themeName]?.name || themeName}</span>
              <ChevronDown size={11} />
            </button>
            {showThemeDropdown && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowThemeDropdown(false)} />
                <div className="absolute right-0 top-full mt-2 w-60 max-h-80 overflow-y-auto rounded-xl shadow-2xl z-50 p-1.5"
                  style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
                  {themeNames.map(name => (
                    <button
                      key={name}
                      onClick={() => { setThemeName(name); setShowThemeDropdown(false); }}
                      className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-left transition-all cursor-pointer hover:opacity-80"
                      style={{
                        backgroundColor: name === themeName ? `${theme.colors[0]}15` : 'transparent',
                        color: name === themeName ? theme.colors[0] : theme.textSecondary,
                      }}
                    >
                      <div className="flex gap-0.5 shrink-0">
                        {themes[name].colors.slice(0, 3).map((c, i) => (
                          <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                        ))}
                      </div>
                      <span className="truncate">{themes[name].name}</span>
                      {name === themeName && <div className="ml-auto w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: theme.colors[0] }} />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 50% at 50% -10%, ${theme.colors[0]}12, transparent)` }} />
        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{ backgroundColor: `${theme.colors[0]}10`, border: `1px solid ${theme.colors[0]}20` }}>
            <Sparkles size={13} style={{ color: theme.colors[0] }} />
            <span className="text-xs font-semibold tracking-wide" style={{ color: theme.colors[0] }}>58 Premium Chart Components</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-none" style={{ color: theme.textPrimary }}>
            Signal-Grade{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]}, ${theme.colors[2] || theme.colors[0]})`, WebkitBackgroundClip: 'text' }}>
              Visualization
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light" style={{ color: theme.textSecondary }}>
            Beautiful, themeable chart components for dashboards, analytics platforms, AI agents, and real-time data pipelines.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-mono"
              style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.textMuted }}>
              <span style={{ color: theme.positive }}>$</span> npm install signum-ui
            </div>
            <Link to="/docs" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: theme.colors[0], color: '#fff' }}>
              <Book size={14} />
              Read the Docs
            </Link>
            <Link to="/themes" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-90"
              style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.textSecondary }}>
              <Palette size={14} />
              50 Themes
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-lg mx-auto mt-14">
            {[
              { label: 'Components', value: '58' },
              { label: 'Themes', value: '50' },
              { label: 'Categories', value: '7' },
              { label: 'TypeScript', value: '100%' },
            ].map(s => (
              <div key={s.label}>
                <p className="text-2xl md:text-3xl font-bold tabular-nums" style={{ color: theme.textPrimary }}>{s.value}</p>
                <p className="text-xs mt-0.5 font-medium" style={{ color: theme.textMuted }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div style={{ borderTop: `1px solid ${theme.cardBorder}` }} />

      {/* Filters */}
      <div className="sticky top-0 z-50 backdrop-blur-xl" style={{ backgroundColor: `${theme.background}e6`, borderBottom: `1px solid ${theme.cardBorder}` }}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className="relative w-full md:w-56 shrink-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.textMuted }} />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none transition-colors"
                style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.textPrimary } as any}
              />
            </div>

            <div className="flex flex-wrap gap-1.5 flex-1">
              <button
                onClick={() => setActiveCategory('all')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: activeCategory === 'all' ? `${theme.colors[0]}15` : theme.cardBg,
                  color: activeCategory === 'all' ? theme.colors[0] : theme.textMuted,
                  border: `1px solid ${activeCategory === 'all' ? `${theme.colors[0]}30` : theme.cardBorder}`,
                }}
              >
                <LayoutGrid size={11} />
                All
              </button>
              {categories.map(cat => {
                const Icon = categoryIcons[cat] || Layers;
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat as Category)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
                    style={{
                      backgroundColor: isActive ? `${theme.colors[0]}15` : theme.cardBg,
                      color: isActive ? theme.colors[0] : theme.textMuted,
                      border: `1px solid ${isActive ? `${theme.colors[0]}30` : theme.cardBorder}`,
                    }}
                  >
                    <Icon size={11} />
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-medium shrink-0 px-2.5 py-1 rounded-md" style={{ color: theme.textMuted, backgroundColor: `${theme.gridColor}80` }}>
              {filtered.length} component{filtered.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(entry => {
            const Comp = entry.component;
            const data = entry.dataKey ? dataMap[entry.dataKey] : undefined;
            return (
              <Link key={entry.id} to={`/component/${entry.id}`} className="group block rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
                <div className="p-1">
                  <Suspense fallback={
                    <div className="rounded-xl p-6 h-72 animate-pulse" style={{ backgroundColor: theme.gridColor }} />
                  }>
                    {data !== undefined ? <Comp data={data} /> : <Comp />}
                  </Suspense>
                </div>
                <div className="px-5 pb-4 pt-1 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{entry.name}</p>
                    <p className="text-xs mt-0.5" style={{ color: theme.textMuted }}>{entry.category}</p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: theme.colors[0] }}>
                    View <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: theme.gridColor }}>
              <Search size={24} style={{ color: theme.textMuted }} />
            </div>
            <p className="text-lg font-semibold" style={{ color: theme.textPrimary }}>No components found</p>
            <p className="text-sm mt-1" style={{ color: theme.textMuted }}>Try adjusting your search or filters.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="mt-4 text-sm font-medium hover:underline cursor-pointer" style={{ color: theme.colors[0] }}>
              Clear all filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16" style={{ borderTop: `1px solid ${theme.cardBorder}` }}>
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: theme.colors[0] }}>
                  <Sparkles size={12} color="#fff" />
                </div>
                <span className="font-bold text-sm" style={{ color: theme.textPrimary }}>Signum UI</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: theme.gridColor, color: theme.textMuted }}>v1.0.0</span>
              </div>
              <p className="text-xs leading-relaxed max-w-sm" style={{ color: theme.textMuted }}>
                Signal-grade data visualization for the AI-native web. 58 premium chart components with 50 built-in themes.
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: theme.textMuted }}>Product</p>
                <div className="flex flex-col gap-1.5">
                  <Link to="/" className="text-xs hover:underline" style={{ color: theme.textSecondary }}>Components</Link>
                  <Link to="/themes" className="text-xs hover:underline" style={{ color: theme.textSecondary }}>Themes</Link>
                  <Link to="/docs" className="text-xs hover:underline" style={{ color: theme.textSecondary }}>Documentation</Link>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: theme.textMuted }}>Resources</p>
                <div className="flex flex-col gap-1.5">
                  <Link to="/docs#getting-started" className="text-xs hover:underline" style={{ color: theme.textSecondary }}>Getting Started</Link>
                  <Link to="/docs#mcp" className="text-xs hover:underline" style={{ color: theme.textSecondary }}>MCP Integration</Link>
                  <Link to="/docs#api" className="text-xs hover:underline" style={{ color: theme.textSecondary }}>API Reference</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${theme.cardBorder}` }}>
            <p className="text-[11px]" style={{ color: theme.textMuted }}>MIT License. Built with React, TypeScript, and Recharts.</p>
          </div>
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
