import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  Book,
  Code,
  Palette,
  Cpu,
  Package,
  ArrowLeft,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';

/* ─── Syntax-highlighted code block ─── */
function CodeBlock({ children, language = 'tsx' }: { children: string; language?: string }) {
  const highlighted = highlightSyntax(children.trim(), language);

  return (
    <div
      style={{
        backgroundColor: '#1e1e2e',
        border: '1px solid #313244',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          borderBottom: '1px solid #313244',
          backgroundColor: '#181825',
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#f38ba8',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#a6e3a1',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: '#f9e2af',
              display: 'inline-block',
            }}
          />
        </div>
        <span
          style={{
            fontSize: '11px',
            color: '#6c7086',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {language}
        </span>
      </div>
      <pre
        style={{
          margin: 0,
          padding: '20px',
          overflowX: 'auto',
          fontSize: '13px',
          lineHeight: '1.7',
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
        }}
      >
        <code dangerouslySetInnerHTML={{ __html: highlighted }} />
      </pre>
    </div>
  );
}

/* ─── Minimal monokai-style syntax highlighter ─── */
function highlightSyntax(code: string, language: string): string {
  let escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  if (language === 'bash' || language === 'shell') {
    escaped = escaped.replace(
      /^(\$\s)(.*)$/gm,
      '<span style="color:#a6e3a1">$1</span><span style="color:#cdd6f4">$2</span>'
    );
    escaped = escaped.replace(/(#.*)$/gm, '<span style="color:#6c7086">$1</span>');
    return escaped;
  }

  if (language === 'json') {
    escaped = escaped.replace(
      /("(?:[^"\\]|\\.)*")\s*:/g,
      '<span style="color:#89b4fa">$1</span>:'
    );
    escaped = escaped.replace(
      /:\s*("(?:[^"\\]|\\.)*")/g,
      ': <span style="color:#a6e3a1">$1</span>'
    );
    escaped = escaped.replace(
      /:\s*(\d+)/g,
      ': <span style="color:#fab387">$1</span>'
    );
    escaped = escaped.replace(
      /:\s*(true|false|null)/g,
      ': <span style="color:#fab387">$1</span>'
    );
    return escaped;
  }

  // TSX / TypeScript highlighting
  // Strings
  escaped = escaped.replace(
    /('(?:[^'\\]|\\.)*')/g,
    '<span style="color:#a6e3a1">$1</span>'
  );
  escaped = escaped.replace(
    /("(?:[^"\\]|\\.)*")/g,
    '<span style="color:#a6e3a1">$1</span>'
  );
  escaped = escaped.replace(
    /(`(?:[^`\\]|\\.)*`)/g,
    '<span style="color:#a6e3a1">$1</span>'
  );

  // Keywords
  const keywords =
    'import|from|export|default|function|return|const|let|var|if|else|interface|type|extends|new|class|async|await';
  escaped = escaped.replace(
    new RegExp(`\\b(${keywords})\\b`, 'g'),
    '<span style="color:#cba6f7">$1</span>'
  );

  // JSX tags
  escaped = escaped.replace(
    /(&lt;\/?)([\w.]+)/g,
    '$1<span style="color:#89b4fa">$2</span>'
  );

  // Comments
  escaped = escaped.replace(
    /(\/\/.*$)/gm,
    '<span style="color:#6c7086">$1</span>'
  );
  escaped = escaped.replace(
    /(\/\*[\s\S]*?\*\/)/g,
    '<span style="color:#6c7086">$1</span>'
  );

  // Numbers
  escaped = escaped.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span style="color:#fab387">$1</span>'
  );

  // Types (PascalCase words that aren't JSX)
  escaped = escaped.replace(
    /:\s*([A-Z]\w+)/g,
    ': <span style="color:#f9e2af">$1</span>'
  );

  return escaped;
}

/* ─── Section wrapper ─── */
function Section({
  id,
  children,
  noBorder,
}: {
  id: string;
  children: React.ReactNode;
  noBorder?: boolean;
}) {
  const { theme } = useTheme();
  return (
    <section
      id={id}
      style={{
        borderBottom: noBorder ? 'none' : `1px solid ${theme.cardBorder}`,
      }}
      className="scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">{children}</div>
    </section>
  );
}

/* ─── Props table ─── */
function PropsTable({
  rows,
}: {
  rows: { prop: string; type: string; default: string; description: string }[];
}) {
  const { theme } = useTheme();
  return (
    <div
      style={{
        borderRadius: '12px',
        border: `1px solid ${theme.cardBorder}`,
        overflow: 'hidden',
      }}
    >
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: theme.cardBg }}>
            {['Prop', 'Type', 'Default', 'Description'].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: 'left',
                  padding: '12px 16px',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
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
                backgroundColor: i % 2 === 0 ? 'transparent' : `${theme.cardBg}80`,
              }}
            >
              <td
                style={{
                  padding: '12px 16px',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: theme.accent,
                  borderBottom: `1px solid ${theme.cardBorder}`,
                }}
              >
                {row.prop}
              </td>
              <td
                style={{
                  padding: '12px 16px',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  color: theme.textSecondary,
                  borderBottom: `1px solid ${theme.cardBorder}`,
                }}
              >
                {row.type}
              </td>
              <td
                style={{
                  padding: '12px 16px',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  color: theme.textMuted,
                  borderBottom: `1px solid ${theme.cardBorder}`,
                }}
              >
                {row.default}
              </td>
              <td
                style={{
                  padding: '12px 16px',
                  fontSize: '14px',
                  color: theme.textSecondary,
                  lineHeight: '1.5',
                  borderBottom: `1px solid ${theme.cardBorder}`,
                }}
              >
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Sidebar navigation items ─── */
const navItems = [
  { id: 'getting-started', label: 'Getting Started', icon: Package },
  { id: 'components', label: 'Components', icon: Layers },
  { id: 'theming', label: 'Theming', icon: Palette },
  { id: 'mcp-integration', label: 'MCP Integration', icon: Cpu },
  { id: 'api-reference', label: 'API Reference', icon: Code },
];

/* ═══════════════════════════════════════════════════
   MAIN DOCUMENTATION PAGE
   ═══════════════════════════════════════════════════ */
export default function Documentation() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{ backgroundColor: theme.background }}
    >
      {/* ── Navigation Header ── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{
          backgroundColor: `${theme.background}e6`,
          borderBottom: `1px solid ${theme.cardBorder}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: theme.textSecondary }}
            >
              <ArrowLeft size={16} />
              Back
            </Link>
            <div
              className="hidden sm:block h-5 w-px"
              style={{ backgroundColor: theme.cardBorder }}
            />
            <span
              className="hidden sm:inline text-sm font-bold tracking-tight"
              style={{ color: theme.textPrimary }}
            >
              Signum{' '}
              <span style={{ color: theme.accent }}>UI</span>
            </span>
          </div>
          <nav className="flex items-center gap-1">
            {[
              { href: '#getting-started', label: 'Getting Started' },
              { href: '#components', label: 'Components' },
              { href: '#theming', label: 'Theming' },
              { href: '#mcp-integration', label: 'MCP Integration' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hidden md:inline-flex px-3 py-1.5 rounded-lg text-xs font-medium transition-colors hover:opacity-70"
                style={{ color: theme.textMuted }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ── Layout: Sidebar + Content ── */}
      <div className="max-w-7xl mx-auto flex">
        {/* Sticky Sidebar — desktop only */}
        <aside
          className="hidden lg:block w-56 shrink-0 sticky top-14 self-start"
          style={{ height: 'calc(100vh - 3.5rem)' }}
        >
          <nav className="py-8 pl-6 pr-4 flex flex-col gap-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
                style={{ color: theme.textSecondary }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = `${theme.accent}10`;
                  (e.currentTarget as HTMLAnchorElement).style.color = theme.accent;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLAnchorElement).style.color = theme.textSecondary;
                }}
              >
                <Icon size={15} style={{ opacity: 0.7 }} />
                {label}
              </a>
            ))}
            <div
              className="my-4 h-px"
              style={{ backgroundColor: theme.cardBorder }}
            />
            <Link
              to="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
              style={{ color: theme.textMuted }}
            >
              <Sparkles size={15} style={{ opacity: 0.7 }} />
              Browse Components
            </Link>
            <Link
              to="/themes"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all hover:opacity-80"
              style={{ color: theme.textMuted }}
            >
              <Palette size={15} style={{ opacity: 0.7 }} />
              Theme Gallery
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* ── Hero Section ── */}
          <section
            style={{ borderBottom: `1px solid ${theme.cardBorder}` }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                background: `linear-gradient(180deg, ${theme.accent}06 0%, transparent 100%)`,
              }}
            >
              <div className="max-w-4xl mx-auto px-6 pt-20 pb-16 md:pt-28 md:pb-20">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6"
                  style={{
                    backgroundColor: `${theme.accent}12`,
                    border: `1px solid ${theme.accent}25`,
                    color: theme.accent,
                  }}
                >
                  <Book size={12} />
                  v1.0 Documentation
                </div>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
                  style={{ color: theme.textPrimary }}
                >
                  Documentation
                </h1>
                <p
                  className="mt-5 text-lg md:text-xl max-w-2xl leading-relaxed"
                  style={{ color: theme.textSecondary }}
                >
                  Everything you need to build signal-grade data visualizations
                </p>

                <div className="mt-10">
                  <p
                    className="text-xs font-medium uppercase tracking-widest mb-3"
                    style={{ color: theme.textMuted }}
                  >
                    Quick Start
                  </p>
                  <CodeBlock language="bash">{`$ npm install signum-ui
$ # Import and use any of the 58 chart components
$ # Themes are applied automatically via ThemeProvider`}</CodeBlock>
                </div>
              </div>
            </div>
          </section>

          {/* ── Getting Started ── */}
          <Section id="getting-started">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ backgroundColor: `${theme.accent}12` }}
              >
                <Package size={16} style={{ color: theme.accent }} />
              </div>
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: theme.accent }}
              >
                Getting Started
              </p>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mt-3"
              style={{ color: theme.textPrimary }}
            >
              Installation
            </h2>
            <p
              className="mt-4 text-base leading-relaxed max-w-2xl"
              style={{ color: theme.textSecondary }}
            >
              Get up and running with Signum UI in under two minutes. Install the
              package, wrap your app with the ThemeProvider, and start using any
              of the 58 chart components right away.
            </p>

            {/* Step 1 */}
            <div className="mt-12">
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: theme.accent,
                    color: '#fff',
                  }}
                >
                  1
                </span>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: theme.textPrimary }}
                >
                  Install the package
                </h3>
              </div>
              <CodeBlock language="bash">{`$ npm install signum-ui`}</CodeBlock>
            </div>

            {/* Step 2 */}
            <div className="mt-10">
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: theme.accent,
                    color: '#fff',
                  }}
                >
                  2
                </span>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: theme.textPrimary }}
                >
                  Set up the provider
                </h3>
              </div>
              <CodeBlock language="tsx">{`import { ThemeProvider } from 'signum-ui';
import { AreaChart } from 'signum-ui';

function App() {
  return (
    <ThemeProvider defaultTheme="midnight">
      <Dashboard />
    </ThemeProvider>
  );
}

function Dashboard() {
  const monthlyRevenue = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 5800 },
    { month: 'Mar', revenue: 7100 },
  ];

  return <AreaChart data={monthlyRevenue} />;
}`}</CodeBlock>
            </div>

            {/* Requirements */}
            <div className="mt-10">
              <div className="flex items-baseline gap-3 mb-4">
                <span
                  className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold"
                  style={{
                    backgroundColor: theme.accent,
                    color: '#fff',
                  }}
                >
                  3
                </span>
                <h3
                  className="text-lg font-semibold"
                  style={{ color: theme.textPrimary }}
                >
                  Requirements
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'React', value: '18+' },
                  { label: 'TypeScript', value: '5+' },
                  { label: 'Node.js', value: '18+' },
                ].map((req) => (
                  <div
                    key={req.label}
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: theme.cardBg,
                      border: `1px solid ${theme.cardBorder}`,
                    }}
                  >
                    <p
                      className="text-xs font-medium uppercase tracking-wider"
                      style={{ color: theme.textMuted }}
                    >
                      {req.label}
                    </p>
                    <p
                      className="text-xl font-bold mt-1"
                      style={{ color: theme.textPrimary }}
                    >
                      {req.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* ── Components ── */}
          <Section id="components">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ backgroundColor: `${theme.accent}12` }}
              >
                <Layers size={16} style={{ color: theme.accent }} />
              </div>
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: theme.accent }}
              >
                Components
              </p>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mt-3"
              style={{ color: theme.textPrimary }}
            >
              58 Chart Components
            </h2>
            <p
              className="mt-4 text-base leading-relaxed max-w-2xl"
              style={{ color: theme.textSecondary }}
            >
              Signum UI ships 58 production-ready chart components across 7
              categories. Every component accepts a{' '}
              <code
                className="text-sm px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${theme.accent}12`,
                  color: theme.accent,
                  fontFamily: 'monospace',
                }}
              >
                data
              </code>{' '}
              prop and automatically adapts to the active theme.
            </p>

            {/* Category grid */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  name: 'Lines & Areas',
                  desc: 'Area charts, line charts, sparklines, step lines, multi-series lines, and area comparisons.',
                },
                {
                  name: 'Bars & Columns',
                  desc: 'Vertical bars, horizontal bars, stacked bars, grouped bars, diverging bars, and waterfall charts.',
                },
                {
                  name: 'Pies & Radials',
                  desc: 'Pie charts, donut charts, radial bars, progress rings, and nested radials.',
                },
                {
                  name: 'Statistical',
                  desc: 'Scatter plots, bubble charts, distribution plots, heatmaps, box plots, and correlation matrices.',
                },
                {
                  name: 'Custom & Specialty',
                  desc: 'Sankey diagrams, treemaps, funnel charts, candlestick charts, radar charts, and gauge visualizations.',
                },
                {
                  name: 'Data Display',
                  desc: 'Data tables, cohort tables, status grids, comparison tables, and structured data views.',
                },
                {
                  name: 'KPI & Metrics',
                  desc: 'KPI cards, metric tiles, score cards, progress indicators, and status badges.',
                },
              ].map((cat) => (
                <div
                  key={cat.name}
                  className="rounded-xl p-5"
                  style={{
                    backgroundColor: theme.cardBg,
                    border: `1px solid ${theme.cardBorder}`,
                  }}
                >
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: theme.textPrimary }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    className="text-sm mt-2 leading-relaxed"
                    style={{ color: theme.textMuted }}
                  >
                    {cat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Example usage */}
            <div className="mt-10">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: theme.textPrimary }}
              >
                Example Usage
              </h3>
              <CodeBlock language="tsx">{`import { AreaChart } from 'signum-ui';

function Dashboard() {
  return <AreaChart data={monthlyRevenue} />;
}`}</CodeBlock>
            </div>

            <p
              className="mt-6 text-sm leading-relaxed"
              style={{ color: theme.textSecondary }}
            >
              All 58 components accept a{' '}
              <code
                className="text-xs px-1.5 py-0.5 rounded"
                style={{
                  backgroundColor: `${theme.accent}12`,
                  color: theme.accent,
                  fontFamily: 'monospace',
                }}
              >
                data
              </code>{' '}
              prop and auto-adapt to the active theme. No extra configuration
              required.
            </p>

            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: theme.accent }}
              >
                Browse all components
                <ExternalLink size={14} />
              </Link>
            </div>
          </Section>

          {/* ── Theming ── */}
          <Section id="theming">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ backgroundColor: `${theme.accent}12` }}
              >
                <Palette size={16} style={{ color: theme.accent }} />
              </div>
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: theme.accent }}
              >
                Theming
              </p>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mt-3"
              style={{ color: theme.textPrimary }}
            >
              50 Built-in Themes
            </h2>
            <p
              className="mt-4 text-base leading-relaxed max-w-2xl"
              style={{ color: theme.textSecondary }}
            >
              Signum UI includes 50 professionally designed themes organized in
              three collections: <strong>Light</strong> (17 themes),{' '}
              <strong>Dark</strong> (24 themes), and{' '}
              <strong>Special</strong> (9 themes). Themes cascade automatically
              to every chart component.
            </p>

            {/* Theme categories */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  label: 'Light',
                  count: 17,
                  examples: 'Snow, Pearl, Ocean, Forest, Lavender',
                },
                {
                  label: 'Dark',
                  count: 24,
                  examples: 'Midnight, Dracula, Nord, Tokyo Night, Catppuccin',
                },
                {
                  label: 'Special',
                  count: 9,
                  examples: 'Candy, Retro, Hacker, Bubblegum, Monochrome',
                },
              ].map((group) => (
                <div
                  key={group.label}
                  className="rounded-xl p-5"
                  style={{
                    backgroundColor: theme.cardBg,
                    border: `1px solid ${theme.cardBorder}`,
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <h3
                      className="text-sm font-semibold"
                      style={{ color: theme.textPrimary }}
                    >
                      {group.label}
                    </h3>
                    <span
                      className="text-xs font-mono"
                      style={{ color: theme.textMuted }}
                    >
                      {group.count} themes
                    </span>
                  </div>
                  <p
                    className="text-xs mt-2 leading-relaxed"
                    style={{ color: theme.textMuted }}
                  >
                    {group.examples}
                  </p>
                </div>
              ))}
            </div>

            {/* ThemeProvider usage */}
            <div className="mt-10">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: theme.textPrimary }}
              >
                Using ThemeProvider
              </h3>
              <CodeBlock language="tsx">{`import { ThemeProvider } from 'signum-ui';

function App() {
  return (
    <ThemeProvider defaultTheme="midnight">
      <Dashboard />
    </ThemeProvider>
  );
}`}</CodeBlock>
            </div>

            {/* Custom theme */}
            <div className="mt-10">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: theme.textPrimary }}
              >
                Creating a Custom Theme
              </h3>
              <p
                className="text-sm leading-relaxed mb-4 max-w-2xl"
                style={{ color: theme.textSecondary }}
              >
                Every theme implements the{' '}
                <code
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{
                    backgroundColor: `${theme.accent}12`,
                    color: theme.accent,
                    fontFamily: 'monospace',
                  }}
                >
                  ChartTheme
                </code>{' '}
                interface. Create your own by defining all required properties:
              </p>
              <CodeBlock language="tsx">{`import type { ChartTheme } from 'signum-ui';

const myTheme: ChartTheme = {
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
};`}</CodeBlock>
            </div>

            <div className="mt-6">
              <Link
                to="/themes"
                className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
                style={{ color: theme.accent }}
              >
                Explore the Theme Gallery
                <ExternalLink size={14} />
              </Link>
            </div>
          </Section>

          {/* ── MCP Integration ── */}
          <Section id="mcp-integration">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ backgroundColor: `${theme.accent}12` }}
              >
                <Cpu size={16} style={{ color: theme.accent }} />
              </div>
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: theme.accent }}
              >
                MCP Integration
              </p>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mt-3"
              style={{ color: theme.textPrimary }}
            >
              Model Context Protocol
            </h2>
            <p
              className="mt-4 text-base leading-relaxed max-w-2xl"
              style={{ color: theme.textSecondary }}
            >
              Signum UI is designed for the AI-native web. Through the Model
              Context Protocol (MCP), AI agents and LLM pipelines can
              programmatically render charts, switch themes, and embed
              visualizations in any context without manual coding.
            </p>

            {/* How it works */}
            <div className="mt-10">
              <h3
                className="text-lg font-semibold mb-3"
                style={{ color: theme.textPrimary }}
              >
                How It Works
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    step: '1',
                    title: 'Define Tools',
                    desc: 'Register Signum chart components as MCP tool definitions available to any AI agent.',
                  },
                  {
                    step: '2',
                    title: 'Agent Requests',
                    desc: 'The LLM selects a chart type, passes data and an optional theme via the tool call.',
                  },
                  {
                    step: '3',
                    title: 'Auto-Render',
                    desc: 'The component serializes and renders in the host context: web, Electron, or headless.',
                  },
                ].map((s) => (
                  <div
                    key={s.step}
                    className="rounded-xl p-5"
                    style={{
                      backgroundColor: theme.cardBg,
                      border: `1px solid ${theme.cardBorder}`,
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mb-3"
                      style={{
                        backgroundColor: `${theme.accent}18`,
                        color: theme.accent,
                      }}
                    >
                      {s.step}
                    </span>
                    <h4
                      className="text-sm font-semibold"
                      style={{ color: theme.textPrimary }}
                    >
                      {s.title}
                    </h4>
                    <p
                      className="text-sm mt-1.5 leading-relaxed"
                      style={{ color: theme.textMuted }}
                    >
                      {s.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* MCP Server Tool */}
            <div className="mt-10">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: theme.textPrimary }}
              >
                MCP Server Tool Definition
              </h3>
              <CodeBlock language="tsx">{`// MCP server tool definition
const renderChartTool = {
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
};`}</CodeBlock>
            </div>

            {/* Agent request example */}
            <div className="mt-10">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: theme.textPrimary }}
              >
                AI Agent Request
              </h3>
              <p
                className="text-sm leading-relaxed mb-4 max-w-2xl"
                style={{ color: theme.textSecondary }}
              >
                When an AI agent decides to visualize data, it sends a
                structured tool call. Signum UI handles the rest:
              </p>
              <CodeBlock language="json">{`{
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
}`}</CodeBlock>
            </div>

            <div
              className="mt-8 rounded-xl p-5"
              style={{
                backgroundColor: `${theme.accent}08`,
                border: `1px solid ${theme.accent}20`,
              }}
            >
              <div className="flex items-start gap-3">
                <Sparkles
                  size={18}
                  className="shrink-0 mt-0.5"
                  style={{ color: theme.accent }}
                />
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: theme.textPrimary }}
                  >
                    Auto-Serialization
                  </p>
                  <p
                    className="text-sm mt-1 leading-relaxed"
                    style={{ color: theme.textSecondary }}
                  >
                    Every Signum UI component auto-serializes its output. This
                    means charts can be embedded in web apps, Electron
                    containers, notebook environments, or streamed as part of an
                    LLM response without any extra setup.
                  </p>
                </div>
              </div>
            </div>
          </Section>

          {/* ── API Reference ── */}
          <Section id="api-reference" noBorder>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ backgroundColor: `${theme.accent}12` }}
              >
                <Code size={16} style={{ color: theme.accent }} />
              </div>
              <p
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: theme.accent }}
              >
                API Reference
              </p>
            </div>
            <h2
              className="text-3xl md:text-4xl font-bold tracking-tight mt-3"
              style={{ color: theme.textPrimary }}
            >
              Props & Events
            </h2>
            <p
              className="mt-4 text-base leading-relaxed max-w-2xl"
              style={{ color: theme.textSecondary }}
            >
              All chart components share a common set of props. Here is the
              reference for the most frequently used properties.
            </p>

            {/* Common Props */}
            <div className="mt-10">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: theme.textPrimary }}
              >
                Common Chart Props
              </h3>
              <PropsTable
                rows={[
                  {
                    prop: 'data',
                    type: 'object[]',
                    default: 'required',
                    description:
                      'Accepts any array of objects. Key names are auto-mapped to axes and series. This is the only required prop.',
                  },
                  {
                    prop: 'theme',
                    type: 'string | ChartTheme',
                    default: 'inherited',
                    description:
                      'Optional. Pass a theme name or a custom ChartTheme object. When omitted, the component inherits the theme from the nearest ThemeProvider.',
                  },
                  {
                    prop: 'width',
                    type: 'number | string',
                    default: '"100%"',
                    description:
                      'Sets the width of the chart container. Accepts pixels or a CSS string.',
                  },
                  {
                    prop: 'height',
                    type: 'number | string',
                    default: '"auto"',
                    description:
                      'Sets the height of the chart container. Defaults to the aspect ratio of the chart type.',
                  },
                  {
                    prop: 'title',
                    type: 'string',
                    default: 'undefined',
                    description:
                      'Optional title rendered above the chart area with theme-aware typography.',
                  },
                  {
                    prop: 'subtitle',
                    type: 'string',
                    default: 'undefined',
                    description:
                      'Optional subtitle rendered below the title in muted text.',
                  },
                  {
                    prop: 'animated',
                    type: 'boolean',
                    default: 'true',
                    description:
                      'Enables entrance and update animations. Set to false for static rendering or SSR.',
                  },
                  {
                    prop: 'className',
                    type: 'string',
                    default: 'undefined',
                    description:
                      'Additional CSS class names applied to the root chart container.',
                  },
                ]}
              />
            </div>

            {/* Events */}
            <div className="mt-10">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: theme.textPrimary }}
              >
                Events
              </h3>
              <PropsTable
                rows={[
                  {
                    prop: 'onClick',
                    type: '(point: DataPoint) => void',
                    default: 'undefined',
                    description:
                      'Fires when a data point or segment is clicked. Receives the associated data object.',
                  },
                  {
                    prop: 'onHover',
                    type: '(point: DataPoint | null) => void',
                    default: 'undefined',
                    description:
                      'Fires on mouse enter/leave over data points. Receives null when the cursor leaves the chart.',
                  },
                ]}
              />
              <div
                className="mt-4 rounded-xl p-4"
                style={{
                  backgroundColor: theme.cardBg,
                  border: `1px solid ${theme.cardBorder}`,
                }}
              >
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: theme.textMuted }}
                >
                  <strong style={{ color: theme.textSecondary }}>
                    Coming in v2:
                  </strong>{' '}
                  Additional event handlers including{' '}
                  <code
                    className="text-xs px-1 py-0.5 rounded"
                    style={{
                      backgroundColor: `${theme.accent}12`,
                      color: theme.accent,
                      fontFamily: 'monospace',
                    }}
                  >
                    onBrush
                  </code>
                  ,{' '}
                  <code
                    className="text-xs px-1 py-0.5 rounded"
                    style={{
                      backgroundColor: `${theme.accent}12`,
                      color: theme.accent,
                      fontFamily: 'monospace',
                    }}
                  >
                    onZoom
                  </code>
                  , and{' '}
                  <code
                    className="text-xs px-1 py-0.5 rounded"
                    style={{
                      backgroundColor: `${theme.accent}12`,
                      color: theme.accent,
                      fontFamily: 'monospace',
                    }}
                  >
                    onSelectionChange
                  </code>{' '}
                  for interactive data exploration workflows.
                </p>
              </div>
            </div>
          </Section>

          {/* ── Footer ── */}
          <footer
            style={{ borderTop: `1px solid ${theme.cardBorder}` }}
          >
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <p
                    className="text-sm font-bold tracking-tight"
                    style={{ color: theme.textPrimary }}
                  >
                    Signum{' '}
                    <span style={{ color: theme.accent }}>UI</span>
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: theme.textMuted }}
                  >
                    Signal-grade visualization for the AI-native web.
                  </p>
                </div>
                <div className="flex items-center gap-6">
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
                  <a
                    href="#getting-started"
                    className="text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ color: theme.textMuted }}
                  >
                    Docs
                  </a>
                  <Link
                    to="/themes"
                    className="text-xs font-medium transition-opacity hover:opacity-70"
                    style={{ color: theme.textMuted }}
                  >
                    Theme Gallery
                  </Link>
                </div>
              </div>
              <div
                className="mt-8 pt-6"
                style={{ borderTop: `1px solid ${theme.cardBorder}` }}
              >
                <p
                  className="text-xs"
                  style={{ color: theme.textMuted }}
                >
                  MIT License. Built for dashboards, analytics, AI agents, and
                  real-time data pipelines.
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
