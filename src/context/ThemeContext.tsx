import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface ChartTheme {
  name: string;
  colors: string[];
  background: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  gridColor: string;
  tooltipBg: string;
  tooltipBorder: string;
  accent: string;
  positive: string;
  negative: string;
}

export const themes: Record<string, ChartTheme> = {
  light: {
    name: 'Light',
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
  },
  dark: {
    name: 'Dark',
    colors: ['#818cf8', '#a78bfa', '#c4b5fd', '#6366f1', '#7c3aed', '#4f46e5'],
    background: '#0a0a0b',
    cardBg: '#111113',
    cardBorder: '#27272a',
    textPrimary: '#fafafa',
    textSecondary: '#a1a1aa',
    textMuted: '#71717a',
    gridColor: '#27272a',
    tooltipBg: '#18181b',
    tooltipBorder: '#27272a',
    accent: '#818cf8',
    positive: '#34d399',
    negative: '#f87171',
  },
  midnight: {
    name: 'Midnight',
    colors: ['#60a5fa', '#38bdf8', '#7dd3fc', '#93c5fd', '#3b82f6', '#2563eb'],
    background: '#020617',
    cardBg: '#0f172a',
    cardBorder: '#1e293b',
    textPrimary: '#f1f5f9',
    textSecondary: '#94a3b8',
    textMuted: '#64748b',
    gridColor: '#1e293b',
    tooltipBg: '#0f172a',
    tooltipBorder: '#1e293b',
    accent: '#60a5fa',
    positive: '#34d399',
    negative: '#fb7185',
  },
  sunset: {
    name: 'Sunset',
    colors: ['#f97316', '#fb923c', '#fdba74', '#ea580c', '#c2410c', '#f59e0b'],
    background: '#fffbeb',
    cardBg: '#ffffff',
    cardBorder: '#fde68a',
    textPrimary: '#78350f',
    textSecondary: '#92400e',
    textMuted: '#b45309',
    gridColor: '#fef3c7',
    tooltipBg: '#ffffff',
    tooltipBorder: '#fde68a',
    accent: '#f97316',
    positive: '#16a34a',
    negative: '#dc2626',
  },
  ocean: {
    name: 'Ocean',
    colors: ['#06b6d4', '#22d3ee', '#67e8f9', '#0891b2', '#0e7490', '#14b8a6'],
    background: '#ecfeff',
    cardBg: '#ffffff',
    cardBorder: '#a5f3fc',
    textPrimary: '#164e63',
    textSecondary: '#0e7490',
    textMuted: '#0891b2',
    gridColor: '#cffafe',
    tooltipBg: '#ffffff',
    tooltipBorder: '#a5f3fc',
    accent: '#06b6d4',
    positive: '#10b981',
    negative: '#f43f5e',
  },
  forest: {
    name: 'Forest',
    colors: ['#10b981', '#34d399', '#6ee7b7', '#059669', '#047857', '#22c55e'],
    background: '#f0fdf4',
    cardBg: '#ffffff',
    cardBorder: '#bbf7d0',
    textPrimary: '#14532d',
    textSecondary: '#166534',
    textMuted: '#15803d',
    gridColor: '#dcfce7',
    tooltipBg: '#ffffff',
    tooltipBorder: '#bbf7d0',
    accent: '#10b981',
    positive: '#10b981',
    negative: '#ef4444',
  },
};

interface ThemeContextType {
  theme: ChartTheme;
  themeName: string;
  setThemeName: (name: string) => void;
  customTheme: ChartTheme | null;
  setCustomTheme: (theme: ChartTheme | null) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  themeName: 'light',
  setThemeName: () => {},
  customTheme: null,
  setCustomTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState('light');
  const [customTheme, setCustomTheme] = useState<ChartTheme | null>(null);
  const theme = customTheme || themes[themeName] || themes.light;

  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName, customTheme, setCustomTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
