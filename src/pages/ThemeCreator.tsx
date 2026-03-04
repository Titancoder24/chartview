import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Palette, Check, Search, Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme, themes } from '../context/ThemeContext';
import type { ChartTheme } from '../context/ThemeContext';

const lightThemeKeys = [
  'light', 'snow', 'pearl', 'sunset', 'ocean', 'forest', 'lavender', 'rose',
  'sand', 'mint', 'sky', 'coral', 'sage', 'slate', 'cream', 'berry', 'arctic',
];

const darkThemeKeys = [
  'dark', 'midnight', 'obsidian', 'carbon', 'ember', 'aurora', 'neon', 'dracula',
  'nord', 'monokai', 'synthwave', 'nightOwl', 'matrix', 'solarized', 'oneDark',
  'tokyo', 'catppuccin', 'github', 'deepSea', 'wine', 'copper', 'amethyst',
  'steel', 'volcano',
];

const specialThemeKeys = [
  'candy', 'retro', 'pastel', 'hacker', 'bubblegum', 'monochrome', 'warmNight',
  'ice', 'grayscale',
];

type CategoryFilter = 'all' | 'light' | 'dark' | 'special';

const categoryMeta: Record<CategoryFilter, { label: string; icon: typeof Palette; keys: string[] }> = {
  all: { label: 'All', icon: Palette, keys: [...lightThemeKeys, ...darkThemeKeys, ...specialThemeKeys] },
  light: { label: 'Light', icon: Sun, keys: lightThemeKeys },
  dark: { label: 'Dark', icon: Moon, keys: darkThemeKeys },
  special: { label: 'Special', icon: Sparkles, keys: specialThemeKeys },
};

interface ThemeCardProps {
  themeKey: string;
  themeData: ChartTheme;
  isActive: boolean;
  currentAccent: string;
  onSelect: () => void;
}

function ThemeCard({ themeKey, themeData, isActive, currentAccent, onSelect }: ThemeCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: themeData.cardBg,
        border: `1px solid ${isActive ? currentAccent : hovered ? themeData.textMuted : themeData.cardBorder}`,
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.2s ease',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: isActive
          ? `0 0 0 1px ${currentAccent}`
          : hovered
            ? '0 4px 20px rgba(0,0,0,0.08)'
            : 'none',
      }}
    >
      {/* Preview strip */}
      <div
        style={{
          display: 'flex',
          borderRadius: '10px',
          overflow: 'hidden',
          height: '40px',
          border: `1px solid ${themeData.cardBorder}`,
        }}
      >
        <div style={{ flex: 1, backgroundColor: themeData.background }} />
        <div style={{ flex: 1, backgroundColor: themeData.cardBg }} />
        <div style={{ flex: 1, backgroundColor: themeData.gridColor }} />
        <div style={{ flex: 1, backgroundColor: themeData.accent }} />
      </div>

      {/* Name + key */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: themeData.textPrimary,
              letterSpacing: '-0.01em',
              lineHeight: 1.3,
            }}
          >
            {themeData.name}
          </div>
          <div
            style={{
              fontSize: '12px',
              color: themeData.textMuted,
              marginTop: '2px',
            }}
          >
            {themeKey}
          </div>
        </div>

        {isActive && (
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              backgroundColor: currentAccent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Check size={13} color="#fff" strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Color palette dots */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {themeData.colors.slice(0, 6).map((color, i) => (
          <div
            key={i}
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              backgroundColor: color,
              border: `1px solid ${themeData.cardBorder}`,
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Apply button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = themeData.accent;
            (e.currentTarget as HTMLButtonElement).style.color = '#fff';
            (e.currentTarget as HTMLButtonElement).style.borderColor = themeData.accent;
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = themeData.textSecondary;
            (e.currentTarget as HTMLButtonElement).style.borderColor = themeData.cardBorder;
          }
        }}
        style={{
          marginTop: 'auto',
          padding: '8px 0',
          borderRadius: '10px',
          border: isActive ? `1px solid ${themeData.accent}` : `1px solid ${themeData.cardBorder}`,
          backgroundColor: isActive ? themeData.accent : 'transparent',
          color: isActive ? '#fff' : themeData.textSecondary,
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'all 0.15s ease',
          letterSpacing: '-0.01em',
        }}
      >
        {isActive ? 'Applied' : 'Apply'}
      </button>
    </div>
  );
}

export default function ThemeCreator() {
  const { theme, themeName, setThemeName } = useTheme();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const totalThemes = useMemo(() => Object.keys(themes).length, []);

  const filteredKeys = useMemo(() => {
    const keys = categoryMeta[activeCategory].keys;
    if (!searchQuery.trim()) return keys;
    const q = searchQuery.toLowerCase();
    return keys.filter((key) => {
      const t = themes[key];
      return t && (t.name.toLowerCase().includes(q) || key.toLowerCase().includes(q));
    });
  }, [activeCategory, searchQuery]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.background,
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* ── Top Nav ── */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: theme.background,
          borderBottom: `1px solid ${theme.cardBorder}`,
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            padding: '0 32px',
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Link
              to="/"
              style={{
                fontSize: '15px',
                fontWeight: 700,
                color: theme.textPrimary,
                textDecoration: 'none',
                letterSpacing: '-0.03em',
              }}
            >
              Signum UI
            </Link>
            <span style={{ color: theme.textMuted, fontSize: '14px', fontWeight: 400 }}>/</span>
            <span style={{ color: theme.textSecondary, fontSize: '14px', fontWeight: 500 }}>
              Themes
            </span>
          </div>

          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: theme.textSecondary,
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500,
              padding: '6px 12px',
              borderRadius: '8px',
              border: `1px solid ${theme.cardBorder}`,
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = theme.textMuted;
              (e.currentTarget as HTMLAnchorElement).style.color = theme.textPrimary;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = theme.cardBorder;
              (e.currentTarget as HTMLAnchorElement).style.color = theme.textSecondary;
            }}
          >
            <ArrowLeft size={14} />
            Back
          </Link>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '48px 32px 80px' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: theme.textPrimary,
              margin: 0,
              letterSpacing: '-0.04em',
              lineHeight: 1.2,
            }}
          >
            Theme Gallery
          </h1>
          <p
            style={{
              fontSize: '15px',
              color: theme.textSecondary,
              margin: '8px 0 0 0',
              lineHeight: 1.5,
            }}
          >
            Browse and apply from {totalThemes} built-in themes.
            Currently using{' '}
            <span style={{ fontWeight: 600, color: theme.accent }}>{theme.name}</span>.
          </p>
        </div>

        {/* Search + Category Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '36px',
          }}
        >
          {/* Search */}
          <div
            style={{
              position: 'relative',
              flex: '1 1 240px',
              maxWidth: '320px',
            }}
          >
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: theme.textMuted,
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder="Search themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '10px',
                border: `1px solid ${theme.cardBorder}`,
                backgroundColor: theme.cardBg,
                color: theme.textPrimary,
                fontSize: '13px',
                outline: 'none',
                transition: 'border-color 0.15s ease',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = theme.accent;
              }}
              onBlur={(e) => {
                (e.currentTarget as HTMLInputElement).style.borderColor = theme.cardBorder;
              }}
            />
          </div>

          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '2px',
              padding: '3px',
              borderRadius: '12px',
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`,
            }}
          >
            {(Object.keys(categoryMeta) as CategoryFilter[]).map((cat) => {
              const meta = categoryMeta[cat];
              const Icon = meta.icon;
              const isSelected = activeCategory === cat;
              const count = cat === 'all' ? totalThemes : meta.keys.length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '6px 14px',
                    borderRadius: '9px',
                    border: 'none',
                    backgroundColor: isSelected ? theme.accent : 'transparent',
                    color: isSelected ? '#fff' : theme.textSecondary,
                    fontSize: '13px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Icon size={13} />
                  {meta.label}
                  <span
                    style={{
                      fontSize: '11px',
                      opacity: isSelected ? 0.85 : 0.6,
                      fontWeight: 400,
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results count */}
        {searchQuery.trim() && (
          <p
            style={{
              fontSize: '13px',
              color: theme.textMuted,
              margin: '0 0 20px 0',
            }}
          >
            {filteredKeys.length} {filteredKeys.length === 1 ? 'theme' : 'themes'} found
          </p>
        )}

        {/* Theme Grid */}
        {filteredKeys.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {filteredKeys.map((key) => {
              const themeData = themes[key];
              if (!themeData) return null;
              return (
                <ThemeCard
                  key={key}
                  themeKey={key}
                  themeData={themeData}
                  isActive={themeName === key}
                  currentAccent={theme.accent}
                  onSelect={() => setThemeName(key)}
                />
              );
            })}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 20px',
              color: theme.textMuted,
              fontSize: '14px',
            }}
          >
            No themes match your search.
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: `1px solid ${theme.cardBorder}`,
          padding: '24px 32px',
        }}
      >
        <div
          style={{
            maxWidth: '1320px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '13px', color: theme.textMuted }}>
            {totalThemes} themes available
          </span>
          <Link
            to="/"
            style={{
              fontSize: '13px',
              color: theme.textSecondary,
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = theme.accent;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = theme.textSecondary;
            }}
          >
            Back to components
          </Link>
        </div>
      </footer>
    </div>
  );
}
