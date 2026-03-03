import { useState, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Search, LayoutGrid, BarChart3, LineChart as LineIcon, PieChart as PieIcon, Activity, Table, Gauge, Layers, GitBranch, Sparkles, Palette, ChevronDown } from 'lucide-react';
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
      {/* Hero */}
      <header className="relative overflow-hidden" style={{ borderBottom: `1px solid ${theme.cardBorder}` }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${theme.colors[0]}08, transparent)` }} />
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ backgroundColor: `${theme.colors[0]}15`, border: `1px solid ${theme.colors[0]}30` }}>
            <Sparkles size={14} style={{ color: theme.colors[0] }} />
            <span className="text-xs font-medium" style={{ color: theme.colors[0] }}>58 Premium Components</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight" style={{ color: theme.textPrimary }}>
            Signum{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${theme.colors[0]}, ${theme.colors[1]}, ${theme.colors[0]})`, WebkitBackgroundClip: 'text' }}>
              UI
            </span>
          </h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: theme.textMuted }}>
            Signal-grade data visualization for the modern web. Premium chart components
            built for dashboards, analytics, AI agents, and real-time data pipelines.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono"
              style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.textMuted }}>
              <span style={{ color: theme.colors[0] }}>$</span> npm install signum-ui
            </div>
            <Link to="/themes" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-80"
              style={{ backgroundColor: theme.colors[0], color: '#fff' }}>
              <Palette size={14} />
              50 Themes
            </Link>
          </div>
          <div className="flex justify-center gap-8 mt-8 text-sm">
            {[
              { label: 'Components', value: '58' },
              { label: 'Themes', value: '50' },
              { label: 'Categories', value: '7' },
              { label: 'Accessible', value: 'A11y' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="font-bold text-xl" style={{ color: theme.textPrimary }}>{s.value}</p>
                <p className="text-xs" style={{ color: theme.textMuted }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="sticky top-0 z-50 backdrop-blur-xl" style={{ backgroundColor: `${theme.background}e6`, borderBottom: `1px solid ${theme.cardBorder}` }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="relative w-full md:w-64 shrink-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.textMuted }} />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none transition-colors"
                style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.textPrimary, placeholder: theme.textMuted } as any}
              />
            </div>

            <div className="flex flex-wrap gap-2 flex-1">
              <button
                onClick={() => setActiveCategory('all')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: activeCategory === 'all' ? `${theme.colors[0]}15` : theme.cardBg,
                  color: activeCategory === 'all' ? theme.colors[0] : theme.textMuted,
                  border: `1px solid ${activeCategory === 'all' ? `${theme.colors[0]}40` : theme.cardBorder}`,
                }}
              >
                <LayoutGrid size={12} />
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
                      border: `1px solid ${isActive ? `${theme.colors[0]}40` : theme.cardBorder}`,
                    }}
                  >
                    <Icon size={12} />
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Theme Switcher */}
            <div className="relative shrink-0">
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all"
                style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.textSecondary }}
              >
                <div className="flex gap-1">
                  {theme.colors.slice(0, 4).map((c, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
                {themes[themeName]?.name || themeName}
                <ChevronDown size={12} />
              </button>
              {showThemeDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowThemeDropdown(false)} />
                  <div className="absolute right-0 top-full mt-2 w-64 max-h-80 overflow-y-auto rounded-xl shadow-xl z-50 p-2"
                    style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
                    {themeNames.map(name => (
                      <button
                        key={name}
                        onClick={() => { setThemeName(name); setShowThemeDropdown(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-left transition-all cursor-pointer hover:opacity-80"
                        style={{
                          backgroundColor: name === themeName ? `${theme.colors[0]}15` : 'transparent',
                          color: name === themeName ? theme.colors[0] : theme.textSecondary,
                        }}
                      >
                        <div className="flex gap-1 shrink-0">
                          {themes[name].colors.slice(0, 3).map((c, i) => (
                            <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
                          ))}
                        </div>
                        {themes[name].name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="text-xs shrink-0" style={{ color: theme.textMuted }}>
              {filtered.length} component{filtered.length !== 1 ? 's' : ''}
            </span>
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
              <Link key={entry.id} to={`/component/${entry.id}`} className="block transition-transform hover:scale-[1.02] duration-200">
                <Suspense fallback={
                  <div className="rounded-2xl p-6 h-72 animate-pulse" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }} />
                }>
                  {data !== undefined ? <Comp data={data} /> : <Comp />}
                </Suspense>
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: theme.textMuted }}>No components match your search.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="mt-3 text-sm hover:underline cursor-pointer" style={{ color: theme.colors[0] }}>
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${theme.cardBorder}` }} className="mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm" style={{ color: theme.textPrimary }}>Signum UI</span>
            <span className="text-xs" style={{ color: theme.textMuted }}>v1.0.0</span>
          </div>
          <p className="text-xs" style={{ color: theme.textMuted }}>Signal-grade visualization for the AI-native web. MIT License.</p>
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
    </Routes>
  );
}
