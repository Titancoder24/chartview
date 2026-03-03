import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Palette, Copy, Check, RotateCcw } from 'lucide-react';
import { useTheme, themes } from '../context/ThemeContext';
import type { ChartTheme } from '../context/ThemeContext';
import { charts } from '../data/chartRegistry';

const defaultCustom: ChartTheme = { ...themes.light };

function ColorInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const { theme } = useTheme();
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs font-medium" style={{ color: theme.textSecondary }}>{label}</span>
      <div className="flex items-center gap-2">
        <input type="color" value={value} onChange={e => onChange(e.target.value)} className="w-7 h-7 rounded-md border-0 cursor-pointer bg-transparent p-0" />
        <input type="text" value={value} onChange={e => onChange(e.target.value)} className="w-20 text-xs font-mono px-2 py-1.5 rounded-md border outline-none" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, color: theme.textPrimary }} />
      </div>
    </div>
  );
}

export default function ThemeCreator() {
  const { theme, themeName, setThemeName, setCustomTheme } = useTheme();
  const [custom, setCustom] = useState<ChartTheme>({ ...defaultCustom });
  const [isCustomActive, setIsCustomActive] = useState(false);
  const [copied, setCopied] = useState(false);

  const previewCharts = charts.slice(0, 6);

  const updateColor = (key: keyof ChartTheme, value: string) => {
    const updated = { ...custom, [key]: value };
    setCustom(updated);
    if (isCustomActive) setCustomTheme(updated);
  };

  const updatePaletteColor = (index: number, value: string) => {
    const newColors = [...custom.colors];
    newColors[index] = value;
    const updated = { ...custom, colors: newColors };
    setCustom(updated);
    if (isCustomActive) setCustomTheme(updated);
  };

  const applyCustom = () => {
    setIsCustomActive(true);
    setCustomTheme(custom);
  };

  const selectPreset = (key: string) => {
    setIsCustomActive(false);
    setCustomTheme(null);
    setThemeName(key);
    setCustom({ ...themes[key] });
  };

  const resetCustom = () => {
    const base = themes[themeName] || themes.light;
    setCustom({ ...base });
    if (isCustomActive) setCustomTheme({ ...base });
  };

  const exportTheme = () => {
    const obj = isCustomActive ? custom : themes[themeName];
    const code = `const customTheme = ${JSON.stringify(obj, null, 2)};`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.background }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl" style={{ backgroundColor: theme.background + 'e6', borderBottom: `1px solid ${theme.cardBorder}` }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: theme.textSecondary }}>
            <ArrowLeft size={16} />
            Back to Gallery
          </Link>
          <div className="flex items-center gap-2">
            <Palette size={16} style={{ color: theme.accent }} />
            <span className="text-sm font-semibold" style={{ color: theme.textPrimary }}>Theme Creator</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-[340px_1fr] gap-8">
          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Preset Themes */}
            <div className="rounded-xl p-5" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: theme.textPrimary }}>Preset Themes</h3>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(themes).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => selectPreset(key)}
                    className={`p-3 rounded-xl text-center transition-all cursor-pointer ${!isCustomActive && themeName === key ? 'ring-2' : 'opacity-70 hover:opacity-100'}`}
                    style={{ backgroundColor: t.background, border: `1px solid ${t.cardBorder}` }}
                  >
                    <div className="flex justify-center gap-1 mb-2">
                      {t.colors.slice(0, 3).map((c, i) => <div key={i} className="w-3 h-3 rounded-full" style={{ backgroundColor: c }} />)}
                    </div>
                    <span className="text-[10px] font-medium" style={{ color: t.textPrimary }}>{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Palette */}
            <div className="rounded-xl p-5" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: theme.textPrimary }}>Chart Palette</h3>
              <div className="space-y-3">
                {custom.colors.map((color, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-xs w-16" style={{ color: theme.textMuted }}>Color {i + 1}</span>
                    <div className="flex items-center gap-2 flex-1">
                      <input type="color" value={color} onChange={e => updatePaletteColor(i, e.target.value)} className="w-7 h-7 rounded-md border-0 cursor-pointer bg-transparent p-0" />
                      <input type="text" value={color} onChange={e => updatePaletteColor(i, e.target.value)} className="flex-1 text-xs font-mono px-2 py-1.5 rounded-md border outline-none" style={{ backgroundColor: theme.cardBg, borderColor: theme.cardBorder, color: theme.textPrimary }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* UI Colors */}
            <div className="rounded-xl p-5" style={{ backgroundColor: theme.cardBg, border: `1px solid ${theme.cardBorder}` }}>
              <h3 className="text-sm font-semibold mb-4" style={{ color: theme.textPrimary }}>UI Colors</h3>
              <div className="space-y-3">
                <ColorInput label="Background" value={custom.background} onChange={v => updateColor('background', v)} />
                <ColorInput label="Card" value={custom.cardBg} onChange={v => updateColor('cardBg', v)} />
                <ColorInput label="Border" value={custom.cardBorder} onChange={v => updateColor('cardBorder', v)} />
                <ColorInput label="Text" value={custom.textPrimary} onChange={v => updateColor('textPrimary', v)} />
                <ColorInput label="Muted" value={custom.textMuted} onChange={v => updateColor('textMuted', v)} />
                <ColorInput label="Grid" value={custom.gridColor} onChange={v => updateColor('gridColor', v)} />
                <ColorInput label="Accent" value={custom.accent} onChange={v => updateColor('accent', v)} />
                <ColorInput label="Positive" value={custom.positive} onChange={v => updateColor('positive', v)} />
                <ColorInput label="Negative" value={custom.negative} onChange={v => updateColor('negative', v)} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button onClick={applyCustom} className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all cursor-pointer hover:opacity-90" style={{ backgroundColor: theme.accent }}>
                Apply Theme
              </button>
              <button onClick={resetCustom} className="p-2.5 rounded-xl transition-all cursor-pointer hover:opacity-80" style={{ border: `1px solid ${theme.cardBorder}`, color: theme.textSecondary }}>
                <RotateCcw size={16} />
              </button>
              <button onClick={exportTheme} className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer" style={{ border: `1px solid ${theme.cardBorder}`, color: theme.textSecondary }}>
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Export</>}
              </button>
            </div>
          </div>

          {/* Live Preview */}
          <div>
            <h3 className="text-sm font-semibold mb-4" style={{ color: theme.textPrimary }}>Live Preview</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {previewCharts.map(chart => (
                <div key={chart.id}>{chart.render()}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
