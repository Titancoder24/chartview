import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { charts } from '../data/chartRegistry';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../context/ThemeContext';

export default function ComponentDetail() {
  const { id } = useParams<{ id: string }>();
  const chart = charts.find(c => c.id === id);
  const { theme, themeName, setThemeName } = useTheme();
  const [copied, setCopied] = useState(false);

  if (!chart) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme.background }}>
        <div className="text-center">
          <h2 className="text-xl font-bold" style={{ color: theme.textPrimary }}>Component not found</h2>
          <Link to="/" className="text-sm mt-3 inline-block" style={{ color: theme.accent }}>Back to gallery</Link>
        </div>
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(chart.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const installCode = `npm install @signum-ui/core`;
  const importCode = `import { ${chart.name.replace(/\s+/g, '')} } from '@signum-ui/core';`;

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ backgroundColor: theme.background + 'e6', borderBottom: `1px solid ${theme.cardBorder}` }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: theme.textSecondary }}>
            <ArrowLeft size={16} />
            Back to Gallery
          </Link>
          <div className="flex items-center gap-2">
            {Object.entries(themes).map(([key, t]) => (
              <button
                key={key}
                onClick={() => setThemeName(key)}
                className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${themeName === key ? 'scale-110' : 'opacity-50 hover:opacity-80'}`}
                style={{ backgroundColor: t.colors[0], borderColor: themeName === key ? t.colors[0] : 'transparent' }}
                title={t.name}
              />
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Title */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full" style={{ backgroundColor: theme.accent + '15', color: theme.accent }}>
              {chart.category[0]}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: theme.textPrimary }}>{chart.name}</h1>
          <p className="text-base mt-2 max-w-2xl" style={{ color: theme.textSecondary }}>{chart.description}</p>
        </div>

        {/* Preview */}
        <div className="rounded-2xl p-8 mb-8" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
          <div className="max-w-lg mx-auto">
            {chart.render()}
          </div>
        </div>

        {/* Code Blocks */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Install */}
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${theme.cardBorder}` }}>
            <div className="px-4 py-2.5 flex items-center justify-between" style={{ backgroundColor: theme.gridColor + '60', borderBottom: `1px solid ${theme.cardBorder}` }}>
              <span className="text-xs font-semibold" style={{ color: theme.textSecondary }}>Install</span>
            </div>
            <div className="p-4 font-mono text-sm" style={{ backgroundColor: theme.cardBg, color: theme.textPrimary }}>
              <code>{installCode}</code>
            </div>
          </div>

          {/* Import */}
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${theme.cardBorder}` }}>
            <div className="px-4 py-2.5 flex items-center justify-between" style={{ backgroundColor: theme.gridColor + '60', borderBottom: `1px solid ${theme.cardBorder}` }}>
              <span className="text-xs font-semibold" style={{ color: theme.textSecondary }}>Import</span>
            </div>
            <div className="p-4 font-mono text-sm" style={{ backgroundColor: theme.cardBg, color: theme.textPrimary }}>
              <code>{importCode}</code>
            </div>
          </div>
        </div>

        {/* Usage Code */}
        <div className="rounded-xl overflow-hidden mt-6" style={{ border: `1px solid ${theme.cardBorder}` }}>
          <div className="px-4 py-2.5 flex items-center justify-between" style={{ backgroundColor: theme.gridColor + '60', borderBottom: `1px solid ${theme.cardBorder}` }}>
            <span className="text-xs font-semibold" style={{ color: theme.textSecondary }}>Usage</span>
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer" style={{ color: theme.textMuted, backgroundColor: theme.gridColor + '80' }}>
              {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
            </button>
          </div>
          <pre className="p-5 font-mono text-sm overflow-x-auto leading-relaxed" style={{ backgroundColor: theme.cardBg, color: theme.accent }}>
            <code>{chart.code}</code>
          </pre>
        </div>

        {/* Props */}
        <div className="rounded-xl overflow-hidden mt-6" style={{ border: `1px solid ${theme.cardBorder}` }}>
          <div className="px-4 py-2.5" style={{ backgroundColor: theme.gridColor + '60', borderBottom: `1px solid ${theme.cardBorder}` }}>
            <span className="text-xs font-semibold" style={{ color: theme.textSecondary }}>Theme Support</span>
          </div>
          <div className="p-5" style={{ backgroundColor: theme.cardBg }}>
            <p className="text-sm mb-3" style={{ color: theme.textSecondary }}>
              This component automatically adapts to the active theme. Wrap your app with <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: theme.gridColor, color: theme.accent }}>&lt;ThemeProvider&gt;</code> and use <code className="px-1.5 py-0.5 rounded text-xs" style={{ backgroundColor: theme.gridColor, color: theme.accent }}>setThemeName()</code> to switch themes.
            </p>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(themes).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setThemeName(key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${themeName === key ? 'ring-2 ring-offset-1' : 'opacity-70 hover:opacity-100'}`}
                  style={{ backgroundColor: t.background, color: t.textPrimary, border: `1px solid ${t.cardBorder}` }}
                >
                  <div className="flex gap-0.5">
                    {t.colors.slice(0, 3).map((c, i) => <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c }} />)}
                  </div>
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
