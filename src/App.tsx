import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Search, LayoutGrid, BarChart3, LineChart as LineIcon, PieChart as PieIcon, Activity, Table, Gauge, Layers, GitBranch, Sparkles, Palette, ChevronRight } from 'lucide-react';
import { ThemeProvider, useTheme, themes } from './context/ThemeContext';
import type { Category } from './data/chartRegistry';
import { charts } from './data/chartRegistry';
import ComponentDetail from './pages/ComponentDetail';
import ThemeCreator from './pages/ThemeCreator';

const categories: { key: Category; label: string; icon: typeof LayoutGrid }[] = [
  { key: 'all', label: 'All', icon: LayoutGrid },
  { key: 'line', label: 'Line & Area', icon: LineIcon },
  { key: 'bar', label: 'Bar Charts', icon: BarChart3 },
  { key: 'circular', label: 'Circular', icon: PieIcon },
  { key: 'scatter', label: 'Scatter', icon: Activity },
  { key: 'analytical', label: 'Analytical', icon: Table },
  { key: 'distribution', label: 'Distribution', icon: Layers },
  { key: 'utility', label: 'Utility', icon: Gauge },
  { key: 'custom', label: 'Advanced', icon: GitBranch },
];

function Gallery() {
  const { theme, themeName, setThemeName } = useTheme();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = charts.filter(c => {
    const matchCat = activeCategory === 'all' || c.category.includes(activeCategory);
    const matchSearch = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: theme.background }}>
      {/* Hero */}
      <header className="relative overflow-hidden" style={{ borderBottom: `1px solid ${theme.cardBorder}` }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 0%, ${theme.accent}08 0%, transparent 70%)` }} />
        <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-12">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: theme.accent + '15' }}>
                <Sparkles size={16} style={{ color: theme.accent }} />
              </div>
              <span className="text-lg font-bold tracking-tight" style={{ color: theme.textPrimary }}>Signum UI</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/themes" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all hover:opacity-80" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.textSecondary }}>
                <Palette size={13} />
                Theme Creator
              </Link>
              <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
                {Object.entries(themes).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => setThemeName(key)}
                    className={`w-5 h-5 rounded-md transition-all cursor-pointer ${themeName === key ? 'ring-2 ring-offset-1 scale-110' : 'opacity-40 hover:opacity-70'}`}
                    style={{ backgroundColor: t.colors[0], }}
                    title={t.name}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-5" style={{ backgroundColor: theme.accent + '10', border: `1px solid ${theme.accent}20` }}>
              <span className="text-xs font-medium" style={{ color: theme.accent }}>v1.0 — {charts.length} Components</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.1]" style={{ color: theme.textPrimary }}>
              Signal-grade charts for{' '}
              <span style={{ color: theme.accent }}>modern apps</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed max-w-xl" style={{ color: theme.textSecondary }}>
              Premium data visualization components with built-in theming, designed for dashboards, analytics, AI agents, and real-time data pipelines.
            </p>
            <div className="flex items-center gap-4 mt-7">
              <code className="px-4 py-2.5 rounded-xl text-sm font-mono" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.textSecondary }}>
                <span style={{ color: theme.accent }}>$</span> npm install @signum-ui/core
              </code>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="sticky top-0 z-50 backdrop-blur-xl transition-colors duration-300" style={{ backgroundColor: theme.background + 'e6', borderBottom: `1px solid ${theme.cardBorder}` }}>
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
            <div className="relative w-full md:w-56 shrink-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: theme.textMuted }} />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none transition-colors"
                style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}`, color: theme.textPrimary, placeholder: theme.textMuted } as any}
              />
            </div>

            <div className="flex flex-wrap gap-1.5 flex-1">
              {categories.map(cat => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer"
                    style={{
                      backgroundColor: isActive ? theme.accent + '12' : 'transparent',
                      color: isActive ? theme.accent : theme.textMuted,
                      border: `1px solid ${isActive ? theme.accent + '30' : 'transparent'}`,
                    }}
                  >
                    <Icon size={12} />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <span className="text-xs shrink-0" style={{ color: theme.textMuted }}>
              {filtered.length} component{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(chart => (
            <Link key={chart.id} to={`/component/${chart.id}`} className="group block">
              <div className="relative">
                {chart.render()}
                {/* Hover Overlay */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-5"
                  style={{ background: `linear-gradient(to top, ${theme.cardBg}cc, transparent 60%)` }}>
                  <span className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full shadow-lg" style={{ backgroundColor: theme.accent, color: '#fff' }}>
                    View Details <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: theme.textMuted }}>No components match your search.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="mt-3 text-sm cursor-pointer hover:underline" style={{ color: theme.accent }}>
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${theme.cardBorder}` }} className="mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold" style={{ color: theme.textPrimary }}>Signum UI</span>
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
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/component/:id" element={<ComponentDetail />} />
          <Route path="/themes" element={<ThemeCreator />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
