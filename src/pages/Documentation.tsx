import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { ArrowLeft, ExternalLink } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Navigation definitions                                             */
/* ------------------------------------------------------------------ */

const NAV_SECTIONS = [
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'components', label: 'Components' },
  { id: 'theming', label: 'Theming' },
  { id: 'mcp', label: 'MCP Integration' },
  { id: 'api', label: 'API Reference' },
] as const;

/* ------------------------------------------------------------------ */
/*  Code Block                                                         */
/* ------------------------------------------------------------------ */

function CodeBlock({ children, filename }: { children: string; filename?: string }) {
  const { theme } = useTheme();
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ backgroundColor: '#0f0f0f', border: `1px solid ${theme.cardBorder}` }}
    >
      {filename && (
        <div
          className="px-4 py-2 flex items-center gap-2"
          style={{ borderBottom: `1px solid ${theme.cardBorder}` }}
        >
          <span
            className="text-[11px] font-mono"
            style={{ color: theme.textMuted }}
          >
            {filename}
          </span>
        </div>
      )}
      <pre
        className="p-5 text-[13px] leading-relaxed overflow-x-auto"
        style={{ color: '#e2e8f0', fontFamily: 'var(--font-mono, ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace)' }}
      >
        <code>{children.trim()}</code>
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inline code                                                        */
/* ------------------------------------------------------------------ */

function InlineCode({ children }: { children: string }) {
  const { theme } = useTheme();
  return (
    <code
      className="text-[13px] px-1.5 py-0.5 rounded-md font-mono"
      style={{
        backgroundColor: `${theme.accent}10`,
        color: theme.accent,
      }}
    >
      {children}
    </code>
  );
}

/* ------------------------------------------------------------------ */
/*  Props table                                                        */
/* ------------------------------------------------------------------ */

function PropsTable({ rows }: { rows: { prop: string; type: string; default: string; desc: string }[] }) {
  const { theme } = useTheme();
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: `1px solid ${theme.cardBorder}` }}
    >
      <div className="overflow-x-auto">
        <table className="w-full" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: theme.cardBg }}>
              {['Prop', 'Type', 'Default', 'Description'].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-[11px] font-semibold uppercase tracking-wider"
                  style={{
                    color: theme.textMuted,
                    borderBottom: `1px solid ${theme.cardBorder}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.prop}
                style={{
                  backgroundColor: i % 2 === 0 ? 'transparent' : `${theme.cardBg}60`,
                }}
              >
                <td
                  className="px-4 py-3 text-[13px] font-semibold font-mono whitespace-nowrap"
                  style={{ color: theme.accent, borderBottom: `1px solid ${theme.cardBorder}` }}
                >
                  {row.prop}
                </td>
                <td
                  className="px-4 py-3 text-[13px] font-mono whitespace-nowrap"
                  style={{ color: theme.textSecondary, borderBottom: `1px solid ${theme.cardBorder}` }}
                >
                  {row.type}
                </td>
                <td
                  className="px-4 py-3 text-[13px] font-mono"
                  style={{ color: theme.textMuted, borderBottom: `1px solid ${theme.cardBorder}` }}
                >
                  {row.default}
                </td>
                <td
                  className="px-4 py-3 text-sm leading-relaxed"
                  style={{ color: theme.textSecondary, borderBottom: `1px solid ${theme.cardBorder}` }}
                >
                  {row.desc}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sidebar nav link                                                   */
/* ------------------------------------------------------------------ */

function SidebarLink({ id, label, active }: { id: string; label: string; active: boolean }) {
  const { theme } = useTheme();
  return (
    <a
      href={`#${id}`}
      className="block px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
      style={{
        color: active ? theme.accent : theme.textMuted,
        backgroundColor: active ? `${theme.accent}08` : 'transparent',
      }}
    >
      {label}
    </a>
  );
}

/* ================================================================== */
/*  DOCUMENTATION PAGE                                                 */
/* ================================================================== */

export default function Documentation() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('getting-started');

  /* --- scroll-spy --- */
  const handleScroll = useCallback(() => {
    const offsets = NAV_SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      return { id, top: el ? el.getBoundingClientRect().top : Infinity };
    });
    const current = offsets.reduce((best, cur) =>
      cur.top <= 120 && cur.top > best.top ? cur : best,
      { id: offsets[0].id, top: -Infinity },
    );
    setActiveSection(current.id);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.documentElement.style.scrollBehavior = '';
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  /* --- helpers --- */
  const sectionHeading = (title: string, subtitle: string) => (
    <>
      <h2
        className="text-2xl font-bold tracking-tight mb-3"
        style={{ color: theme.textPrimary }}
      >
        {title}
      </h2>
      <p
        className="text-base leading-relaxed mb-8 max-w-2xl"
        style={{ color: theme.textSecondary }}
      >
        {subtitle}
      </p>
    </>
  );

  /* ================================================================ */

  return (
    <div
      className="min-h-screen transition-colors duration-200"
      style={{ backgroundColor: theme.background }}
    >
      {/* ── Top nav bar ── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{
          backgroundColor: `${theme.background}e6`,
          borderBottom: `1px solid ${theme.cardBorder}`,
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: theme.textSecondary }}
            >
              <ArrowLeft size={15} />
              Components
            </Link>
            <div className="hidden sm:block h-4 w-px" style={{ backgroundColor: theme.cardBorder }} />
            <span className="hidden sm:inline text-sm font-bold tracking-tight" style={{ color: theme.textPrimary }}>
              Signum <span style={{ color: theme.accent }}>UI</span>
            </span>
            <div className="hidden sm:block h-4 w-px" style={{ backgroundColor: theme.cardBorder }} />
            <span className="hidden sm:inline text-[13px]" style={{ color: theme.textMuted }}>
              Documentation
            </span>
          </div>
          <div className="flex items-center gap-1">
            {NAV_SECTIONS.slice(0, 4).map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="hidden md:inline-flex px-3 py-1.5 rounded-lg text-xs font-medium transition-opacity hover:opacity-70"
                style={{ color: theme.textMuted }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* ── Two-column layout ── */}
      <div className="max-w-[1400px] mx-auto flex">

        {/* ── Sticky sidebar (desktop) ── */}
        <aside
          className="hidden lg:block w-56 shrink-0 sticky top-14 self-start"
          style={{ height: 'calc(100vh - 3.5rem)' }}
        >
          <nav className="py-10 pl-6 pr-4 flex flex-col gap-0.5">
            <p
              className="text-[11px] font-semibold uppercase tracking-widest mb-4 px-3"
              style={{ color: theme.textMuted }}
            >
              On this page
            </p>
            {NAV_SECTIONS.map(({ id, label }) => (
              <SidebarLink key={id} id={id} label={label} active={activeSection === id} />
            ))}

            <div className="my-5 h-px" style={{ backgroundColor: theme.cardBorder }} />

            <p
              className="text-[11px] font-semibold uppercase tracking-widest mb-4 px-3"
              style={{ color: theme.textMuted }}
            >
              Links
            </p>
            <Link
              to="/"
              className="block px-3 py-1.5 rounded-lg text-[13px] font-medium transition-opacity hover:opacity-70"
              style={{ color: theme.textMuted }}
            >
              Browse Components
            </Link>
            <Link
              to="/themes"
              className="block px-3 py-1.5 rounded-lg text-[13px] font-medium transition-opacity hover:opacity-70"
              style={{ color: theme.textMuted }}
            >
              Theme Gallery
            </Link>
            <a
              href="https://github.com/signum-ui"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-opacity hover:opacity-70"
              style={{ color: theme.textMuted }}
            >
              GitHub
              <ExternalLink size={11} />
            </a>
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0">

          {/* ============================================================ */}
          {/*  GETTING STARTED                                              */}
          {/* ============================================================ */}
          <section id="getting-started" className="scroll-mt-16" style={{ borderBottom: `1px solid ${theme.cardBorder}` }}>
            <div className="max-w-3xl mx-auto px-6 py-20 md:py-24">
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-6" style={{ color: theme.accent }}>
                Getting Started
              </p>
              {sectionHeading(
                'Installation',
                'Get up and running with Signum UI in under two minutes. Install the package, wrap your app with the ThemeProvider, and start rendering any of the 58 chart components.',
              )}

              {/* Install */}
              <h3 className="text-sm font-semibold mb-3 mt-12" style={{ color: theme.textPrimary }}>
                1. Install the package
              </h3>
              <CodeBlock filename="terminal">
{`npm install signum-ui`}
              </CodeBlock>

              {/* Provider setup */}
              <h3 className="text-sm font-semibold mb-3 mt-10" style={{ color: theme.textPrimary }}>
                2. Set up the provider
              </h3>
              <CodeBlock filename="App.tsx">
{`import { ThemeProvider } from 'signum-ui';
import { AreaChart } from 'signum-ui';

function App() {
  return (
    <ThemeProvider defaultTheme="midnight">
      <Dashboard />
    </ThemeProvider>
  );
}

function Dashboard() {
  const data = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 5800 },
    { month: 'Mar', revenue: 7100 },
  ];

  return <AreaChart data={data} />;
}`}
              </CodeBlock>

              {/* Requirements */}
              <h3 className="text-sm font-semibold mb-4 mt-10" style={{ color: theme.textPrimary }}>
                3. Requirements
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: 'React', value: '18+' },
                  { label: 'TypeScript', value: '5+' },
                  { label: 'Node.js', value: '18+' },
                ].map((req) => (
                  <div
                    key={req.label}
                    className="rounded-lg px-4 py-3"
                    style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}
                  >
                    <p className="text-[11px] font-medium uppercase tracking-wider" style={{ color: theme.textMuted }}>
                      {req.label}
                    </p>
                    <p className="text-lg font-bold mt-0.5" style={{ color: theme.textPrimary }}>
                      {req.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/*  COMPONENTS                                                   */}
          {/* ============================================================ */}
          <section id="components" className="scroll-mt-16" style={{ borderBottom: `1px solid ${theme.cardBorder}` }}>
            <div className="max-w-3xl mx-auto px-6 py-20 md:py-24">
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-6" style={{ color: theme.accent }}>
                Components
              </p>
              {sectionHeading(
                '58 Chart Components',
                'Production-ready visualizations across 7 categories. Every component accepts a data prop and automatically adapts to the active theme.',
              )}

              {/* Category grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Lines & Areas', desc: 'Area, line, sparkline, step line, multi-series, and area comparison charts.' },
                  { name: 'Bars & Columns', desc: 'Vertical, horizontal, stacked, grouped, diverging, and waterfall charts.' },
                  { name: 'Pies & Radials', desc: 'Pie, donut, radial bar, progress ring, and nested radial charts.' },
                  { name: 'Statistical', desc: 'Scatter, bubble, distribution, heatmap, box plot, and correlation matrix.' },
                  { name: 'Specialty', desc: 'Sankey, treemap, funnel, candlestick, radar, and gauge visualizations.' },
                  { name: 'Data Display', desc: 'Data tables, cohort tables, status grids, and comparison tables.' },
                  { name: 'KPI & Metrics', desc: 'KPI cards, metric tiles, score cards, progress indicators, and status badges.' },
                ].map((cat) => (
                  <div
                    key={cat.name}
                    className="rounded-lg px-4 py-4"
                    style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}
                  >
                    <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{cat.name}</p>
                    <p className="text-[13px] mt-1.5 leading-relaxed" style={{ color: theme.textMuted }}>{cat.desc}</p>
                  </div>
                ))}
              </div>

              {/* Basic usage */}
              <h3 className="text-sm font-semibold mb-3 mt-10" style={{ color: theme.textPrimary }}>
                Basic usage
              </h3>
              <CodeBlock filename="Dashboard.tsx">
{`import { AreaChart, BarChart, PieChart } from 'signum-ui';

function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <AreaChart data={revenueData} />
      <BarChart data={salesData} />
      <PieChart data={marketShareData} />
    </div>
  );
}`}
              </CodeBlock>

              <p className="text-sm leading-relaxed mt-6" style={{ color: theme.textSecondary }}>
                All 58 components accept a <InlineCode>data</InlineCode> prop and auto-adapt to the active theme. No extra configuration required.
              </p>

              <div className="mt-5">
                <Link
                  to="/"
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: theme.accent }}
                >
                  Browse all components
                  <ExternalLink size={13} />
                </Link>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/*  THEMING                                                      */}
          {/* ============================================================ */}
          <section id="theming" className="scroll-mt-16" style={{ borderBottom: `1px solid ${theme.cardBorder}` }}>
            <div className="max-w-3xl mx-auto px-6 py-20 md:py-24">
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-6" style={{ color: theme.accent }}>
                Theming
              </p>
              {sectionHeading(
                '50 Built-in Themes',
                'Professionally designed themes across three collections. Themes cascade automatically to every chart component via ThemeProvider.',
              )}

              {/* Theme collections */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Light', count: 17, examples: 'Snow, Pearl, Ocean, Forest, Lavender, Sky' },
                  { label: 'Dark', count: 24, examples: 'Midnight, Dracula, Nord, Tokyo Night, Catppuccin' },
                  { label: 'Special', count: 9, examples: 'Candy, Retro, Hacker, Bubblegum, Monochrome' },
                ].map((g) => (
                  <div
                    key={g.label}
                    className="rounded-lg px-4 py-4"
                    style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}
                  >
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{g.label}</p>
                      <span className="text-[11px] font-mono" style={{ color: theme.textMuted }}>{g.count}</span>
                    </div>
                    <p className="text-[12px] mt-1.5 leading-relaxed" style={{ color: theme.textMuted }}>{g.examples}</p>
                  </div>
                ))}
              </div>

              {/* ThemeProvider */}
              <h3 className="text-sm font-semibold mb-3 mt-10" style={{ color: theme.textPrimary }}>
                ThemeProvider usage
              </h3>
              <CodeBlock filename="App.tsx">
{`import { ThemeProvider } from 'signum-ui';

function App() {
  return (
    <ThemeProvider defaultTheme="midnight">
      <Dashboard />
    </ThemeProvider>
  );
}`}
              </CodeBlock>

              {/* Accessing theme */}
              <h3 className="text-sm font-semibold mb-3 mt-10" style={{ color: theme.textPrimary }}>
                Accessing the theme
              </h3>
              <CodeBlock filename="Component.tsx">
{`import { useTheme } from 'signum-ui';

function Component() {
  const { theme, themeName, setThemeName } = useTheme();

  return (
    <div style={{ color: theme.textPrimary }}>
      Current theme: {themeName}
      <button onClick={() => setThemeName('dracula')}>
        Switch to Dracula
      </button>
    </div>
  );
}`}
              </CodeBlock>

              {/* Custom theme */}
              <h3 className="text-sm font-semibold mb-3 mt-10" style={{ color: theme.textPrimary }}>
                Creating a custom theme
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
                Every theme implements the <InlineCode>ChartTheme</InlineCode> interface. Create your own by defining all required properties:
              </p>
              <CodeBlock filename="custom-theme.ts">
{`import type { ChartTheme } from 'signum-ui';

const brandTheme: ChartTheme = {
  name: 'Brand',
  colors: ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#7c3aed', '#4f46e5'],
  background: '#ffffff',
  cardBg: '#ffffff',
  cardBorder: '#e5e7eb',
  textPrimary: '#111827',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  gridColor: '#f3f4f6',
  tooltipBg: '#ffffff',
  tooltipBorder: '#e5e7eb',
  accent: '#6366f1',
  positive: '#10b981',
  negative: '#ef4444',
};`}
              </CodeBlock>

              <div className="mt-5">
                <Link
                  to="/themes"
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: theme.accent }}
                >
                  Explore the Theme Gallery
                  <ExternalLink size={13} />
                </Link>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/*  MCP INTEGRATION                                              */}
          {/* ============================================================ */}
          <section id="mcp" className="scroll-mt-16" style={{ borderBottom: `1px solid ${theme.cardBorder}` }}>
            <div className="max-w-3xl mx-auto px-6 py-20 md:py-24">
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-6" style={{ color: theme.accent }}>
                MCP Integration
              </p>
              {sectionHeading(
                'Model Context Protocol',
                'Signum UI is designed for the AI-native web. Through MCP, AI agents can programmatically render charts, switch themes, and embed visualizations without manual coding.',
              )}

              {/* How it works */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { step: '1', title: 'Define Tools', desc: 'Register Signum chart components as MCP tool definitions available to any AI agent.' },
                  { step: '2', title: 'Agent Requests', desc: 'The LLM selects a chart type and passes data and an optional theme via the tool call.' },
                  { step: '3', title: 'Auto-Render', desc: 'The component serializes and renders in the host context: web, Electron, or headless.' },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="rounded-lg px-4 py-4"
                    style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}
                  >
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mb-3"
                      style={{ backgroundColor: `${theme.accent}14`, color: theme.accent }}
                    >
                      {s.step}
                    </span>
                    <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>{s.title}</p>
                    <p className="text-[13px] mt-1 leading-relaxed" style={{ color: theme.textMuted }}>{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* Tool definition */}
              <h3 className="text-sm font-semibold mb-3 mt-10" style={{ color: theme.textPrimary }}>
                MCP server tool definition
              </h3>
              <CodeBlock filename="mcp-server.ts">
{`const renderChartTool = {
  name: 'render_chart',
  description: 'Renders a Signum UI chart component with data and theme',
  inputSchema: {
    type: 'object',
    properties: {
      type: { type: 'string', description: 'Chart component name' },
      data: { type: 'array', description: 'Array of data objects' },
      theme: { type: 'string', description: 'Theme name (optional)' },
    },
    required: ['type', 'data'],
  },
};`}
              </CodeBlock>

              {/* Agent request */}
              <h3 className="text-sm font-semibold mb-3 mt-10" style={{ color: theme.textPrimary }}>
                AI agent request
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
                When an AI agent decides to visualize data, it sends a structured tool call. Signum UI handles the rest:
              </p>
              <CodeBlock filename="tool-call.json">
{`{
  "tool": "render_chart",
  "params": {
    "type": "AreaChart",
    "data": [
      { "month": "Jan", "revenue": 4200 },
      { "month": "Feb", "revenue": 5800 },
      { "month": "Mar", "revenue": 7100 },
      { "month": "Apr", "revenue": 6300 }
    ],
    "theme": "midnight"
  }
}`}
              </CodeBlock>

              {/* Embedding */}
              <h3 className="text-sm font-semibold mb-3 mt-10" style={{ color: theme.textPrimary }}>
                Embedding in any context
              </h3>
              <CodeBlock filename="embed.tsx">
{`import { renderToString } from 'signum-ui/server';

// Server-side rendering for headless environments
const svg = await renderToString({
  type: 'AreaChart',
  data: revenueData,
  theme: 'midnight',
  width: 600,
  height: 300,
});

// Embed in Markdown, HTML emails, or LLM responses
const markdown = \`![Revenue Chart](data:image/svg+xml,\${encodeURIComponent(svg)})\`;`}
              </CodeBlock>

              {/* Callout */}
              <div
                className="mt-8 rounded-lg px-5 py-4"
                style={{
                  backgroundColor: `${theme.accent}06`,
                  border: `1px solid ${theme.accent}18`,
                }}
              >
                <p className="text-sm font-semibold" style={{ color: theme.textPrimary }}>
                  Auto-Serialization
                </p>
                <p className="text-[13px] mt-1 leading-relaxed" style={{ color: theme.textSecondary }}>
                  Every Signum UI component auto-serializes its output. Charts can be embedded in web apps, Electron containers, notebook environments, or streamed as part of an LLM response without any extra setup.
                </p>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/*  API REFERENCE                                                */}
          {/* ============================================================ */}
          <section id="api" className="scroll-mt-16">
            <div className="max-w-3xl mx-auto px-6 py-20 md:py-24">
              <p className="text-[11px] font-semibold uppercase tracking-widest mb-6" style={{ color: theme.accent }}>
                API Reference
              </p>
              {sectionHeading(
                'Props & Events',
                'All chart components share a common set of props. Here is the reference for the most frequently used properties.',
              )}

              {/* Common props */}
              <h3 className="text-sm font-semibold mb-4" style={{ color: theme.textPrimary }}>
                Common chart props
              </h3>
              <PropsTable
                rows={[
                  { prop: 'data', type: 'object[]', default: 'required', desc: 'Array of data objects. Key names are auto-mapped to axes and series.' },
                  { prop: 'theme', type: 'string | ChartTheme', default: 'inherited', desc: 'Theme name or custom ChartTheme object. Inherits from nearest ThemeProvider when omitted.' },
                  { prop: 'width', type: 'number | string', default: '"100%"', desc: 'Width of the chart container. Accepts pixels or a CSS string value.' },
                  { prop: 'height', type: 'number | string', default: '"auto"', desc: 'Height of the chart container. Defaults to the aspect ratio of the chart type.' },
                  { prop: 'title', type: 'string', default: 'undefined', desc: 'Optional title rendered above the chart area with theme-aware typography.' },
                  { prop: 'subtitle', type: 'string', default: 'undefined', desc: 'Optional subtitle rendered below the title in muted text.' },
                  { prop: 'animated', type: 'boolean', default: 'true', desc: 'Enables entrance and update animations. Set to false for static rendering or SSR.' },
                  { prop: 'className', type: 'string', default: 'undefined', desc: 'Additional CSS class names applied to the root chart container.' },
                ]}
              />

              {/* Events */}
              <h3 className="text-sm font-semibold mb-4 mt-12" style={{ color: theme.textPrimary }}>
                Events
              </h3>
              <PropsTable
                rows={[
                  { prop: 'onClick', type: '(point: DataPoint) => void', default: 'undefined', desc: 'Fires when a data point or segment is clicked.' },
                  { prop: 'onHover', type: '(point: DataPoint | null) => void', default: 'undefined', desc: 'Fires on mouse enter/leave over data points. Receives null when cursor leaves.' },
                ]}
              />

              {/* ChartTheme interface */}
              <h3 className="text-sm font-semibold mb-3 mt-12" style={{ color: theme.textPrimary }}>
                ChartTheme interface
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: theme.textSecondary }}>
                The complete type definition for theme objects:
              </p>
              <CodeBlock filename="types.ts">
{`interface ChartTheme {
  name: string;
  colors: string[];        // Array of 6 chart colors
  background: string;      // Page background
  cardBg: string;          // Card background
  cardBorder: string;      // Card and divider borders
  textPrimary: string;     // Headings and emphasis
  textSecondary: string;   // Body text
  textMuted: string;       // Captions and hints
  gridColor: string;       // Chart grid lines
  tooltipBg: string;       // Tooltip background
  tooltipBorder: string;   // Tooltip border
  accent: string;          // Brand / accent color
  positive: string;        // Success / growth
  negative: string;        // Error / decline
}`}
              </CodeBlock>

              {/* Upcoming */}
              <div
                className="mt-8 rounded-lg px-5 py-4"
                style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}
              >
                <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                  <span className="font-semibold" style={{ color: theme.textSecondary }}>Coming in v2: </span>
                  Additional event handlers including <InlineCode>onBrush</InlineCode>, <InlineCode>onZoom</InlineCode>, and <InlineCode>onSelectionChange</InlineCode> for interactive data exploration workflows.
                </p>
              </div>
            </div>
          </section>

          {/* ── Footer ── */}
          <footer style={{ borderTop: `1px solid ${theme.cardBorder}` }}>
            <div className="max-w-3xl mx-auto px-6 py-14">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-bold tracking-tight" style={{ color: theme.textPrimary }}>
                    Signum <span style={{ color: theme.accent }}>UI</span>
                  </p>
                  <p className="text-xs mt-1" style={{ color: theme.textMuted }}>
                    Signal-grade visualization for the AI-native web.
                  </p>
                </div>
                <div className="flex items-center gap-5">
                  <a
                    href="https://github.com/signum-ui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ color: theme.textMuted }}
                  >
                    GitHub
                    <ExternalLink size={11} />
                  </a>
                  <Link
                    to="/"
                    className="text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ color: theme.textMuted }}
                  >
                    Components
                  </Link>
                  <Link
                    to="/themes"
                    className="text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ color: theme.textMuted }}
                  >
                    Themes
                  </Link>
                </div>
              </div>
              <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${theme.cardBorder}` }}>
                <p className="text-xs" style={{ color: theme.textMuted }}>
                  MIT License. Built for dashboards, analytics, AI agents, and real-time data pipelines.
                </p>
              </div>
            </div>
          </footer>

        </main>
      </div>
    </div>
  );
}
