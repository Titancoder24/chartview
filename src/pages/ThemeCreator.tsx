import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { themes } from '../context/ThemeContext';
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

interface ThemeCardProps {
  themeKey: string;
  themeData: ChartTheme;
  isActive: boolean;
  activeAccent: string;
  onSelect: () => void;
}

function ThemeCard({ themeKey, themeData, isActive, activeAccent, onSelect }: ThemeCardProps) {
  return (
    <div
      style={{
        backgroundColor: themeData.cardBg,
        border: `2px solid ${isActive ? activeAccent : themeData.cardBorder}`,
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        boxShadow: isActive
          ? `0 0 0 1px ${activeAccent}, 0 4px 12px rgba(0,0,0,0.1)`
          : '0 1px 4px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = isActive
          ? `0 0 0 1px ${activeAccent}, 0 8px 24px rgba(0,0,0,0.15)`
          : '0 4px 16px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = isActive
          ? `0 0 0 1px ${activeAccent}, 0 4px 12px rgba(0,0,0,0.1)`
          : '0 1px 4px rgba(0,0,0,0.06)';
      }}
      onClick={onSelect}
    >
      {isActive && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: activeAccent,
            color: '#fff',
            fontSize: '11px',
            fontWeight: 600,
            padding: '2px 8px',
            borderRadius: '9999px',
            letterSpacing: '0.025em',
          }}
        >
          Active
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span
          style={{
            color: themeData.textPrimary,
            fontSize: '16px',
            fontWeight: 600,
            letterSpacing: '-0.01em',
          }}
        >
          {themeData.name}
        </span>
        <span
          style={{
            color: themeData.textMuted,
            fontSize: '12px',
          }}
        >
          {themeKey}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {themeData.colors.map((color, i) => (
          <div
            key={i}
            style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: color,
              border: `1px solid ${themeData.cardBorder}`,
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          gap: '8px',
          fontSize: '11px',
          color: themeData.textSecondary,
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '2px',
              backgroundColor: themeData.positive,
            }}
          />
          positive
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '2px',
              backgroundColor: themeData.negative,
            }}
          />
          negative
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span
            style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              borderRadius: '2px',
              backgroundColor: themeData.accent,
            }}
          />
          accent
        </span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        style={{
          marginTop: 'auto',
          padding: '8px 16px',
          borderRadius: '8px',
          border: isActive ? 'none' : `1px solid ${themeData.cardBorder}`,
          backgroundColor: isActive ? themeData.accent : 'transparent',
          color: isActive ? '#fff' : themeData.textPrimary,
          fontSize: '13px',
          fontWeight: 500,
          cursor: 'pointer',
          transition: 'background-color 0.15s ease, color 0.15s ease',
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
            (e.currentTarget as HTMLButtonElement).style.color = themeData.textPrimary;
            (e.currentTarget as HTMLButtonElement).style.borderColor = themeData.cardBorder;
          }
        }}
      >
        {isActive ? 'Currently Active' : 'Use Theme'}
      </button>
    </div>
  );
}

interface ThemeSectionProps {
  title: string;
  description: string;
  themeKeys: string[];
  currentThemeName: string;
  currentTheme: ChartTheme;
  onSelectTheme: (key: string) => void;
}

function ThemeSection({
  title,
  description,
  themeKeys,
  currentThemeName,
  currentTheme,
  onSelectTheme,
}: ThemeSectionProps) {
  return (
    <section style={{ marginBottom: '48px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: currentTheme.textPrimary,
            margin: 0,
            letterSpacing: '-0.02em',
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: currentTheme.textSecondary,
            margin: '4px 0 0 0',
          }}
        >
          {description}
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        {themeKeys.map((key) => {
          const themeData = themes[key];
          if (!themeData) return null;
          return (
            <ThemeCard
              key={key}
              themeKey={key}
              themeData={themeData}
              isActive={currentThemeName === key}
              activeAccent={currentTheme.accent}
              onSelect={() => onSelectTheme(key)}
            />
          );
        })}
      </div>
    </section>
  );
}

export default function ThemeCreator() {
  const { theme, themeName, setThemeName } = useTheme();

  const totalThemes = useMemo(() => Object.keys(themes).length, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: theme.background,
        padding: '32px 40px',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Back Button */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: theme.textSecondary,
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 500,
            marginBottom: '24px',
            padding: '6px 12px',
            borderRadius: '8px',
            border: `1px solid ${theme.cardBorder}`,
            backgroundColor: theme.cardBg,
            transition: 'color 0.15s ease, border-color 0.15s ease',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = theme.accent;
            (e.currentTarget as HTMLAnchorElement).style.borderColor = theme.accent;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.color = theme.textSecondary;
            (e.currentTarget as HTMLAnchorElement).style.borderColor = theme.cardBorder;
          }}
        >
          <ArrowLeft size={16} />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <h1
            style={{
              fontSize: '36px',
              fontWeight: 800,
              color: theme.textPrimary,
              margin: 0,
              letterSpacing: '-0.03em',
            }}
          >
            Theme Gallery
          </h1>
          <p
            style={{
              fontSize: '16px',
              color: theme.textSecondary,
              margin: '8px 0 0 0',
            }}
          >
            {totalThemes} built-in themes for your charts
          </p>
          <div
            style={{
              marginTop: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: theme.cardBg,
              border: `1px solid ${theme.cardBorder}`,
              fontSize: '13px',
              color: theme.textSecondary,
            }}
          >
            Current theme:
            <span
              style={{
                fontWeight: 600,
                color: theme.accent,
              }}
            >
              {theme.name}
            </span>
            <div
              style={{
                display: 'flex',
                gap: '3px',
                marginLeft: '4px',
              }}
            >
              {theme.colors.slice(0, 4).map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Light Themes */}
        <ThemeSection
          title="Light Themes"
          description={`${lightThemeKeys.length} themes with bright backgrounds, ideal for daytime use and presentations.`}
          themeKeys={lightThemeKeys}
          currentThemeName={themeName}
          currentTheme={theme}
          onSelectTheme={setThemeName}
        />

        {/* Dark Themes */}
        <ThemeSection
          title="Dark Themes"
          description={`${darkThemeKeys.length} themes with dark backgrounds, great for low-light environments and developer tools.`}
          themeKeys={darkThemeKeys}
          currentThemeName={themeName}
          currentTheme={theme}
          onSelectTheme={setThemeName}
        />

        {/* Special Themes */}
        <ThemeSection
          title="Special Themes"
          description={`${specialThemeKeys.length} unique and creative themes for when you want something different.`}
          themeKeys={specialThemeKeys}
          currentThemeName={themeName}
          currentTheme={theme}
          onSelectTheme={setThemeName}
        />
      </div>
    </div>
  );
}
