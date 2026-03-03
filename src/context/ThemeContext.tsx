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
  // ── LIGHT THEMES ──
  light: {
    name: 'Light', colors: ['#6366f1','#8b5cf6','#a78bfa','#c4b5fd','#7c3aed','#4f46e5'],
    background: '#ffffff', cardBg: '#ffffff', cardBorder: '#e5e7eb',
    textPrimary: '#111827', textSecondary: '#6b7280', textMuted: '#9ca3af',
    gridColor: '#f3f4f6', tooltipBg: '#ffffff', tooltipBorder: '#e5e7eb',
    accent: '#6366f1', positive: '#10b981', negative: '#ef4444',
  },
  snow: {
    name: 'Snow', colors: ['#3b82f6','#60a5fa','#93c5fd','#2563eb','#1d4ed8','#bfdbfe'],
    background: '#f8fafc', cardBg: '#ffffff', cardBorder: '#e2e8f0',
    textPrimary: '#0f172a', textSecondary: '#475569', textMuted: '#94a3b8',
    gridColor: '#f1f5f9', tooltipBg: '#ffffff', tooltipBorder: '#e2e8f0',
    accent: '#3b82f6', positive: '#22c55e', negative: '#ef4444',
  },
  pearl: {
    name: 'Pearl', colors: ['#ec4899','#f472b6','#f9a8d4','#db2777','#be185d','#fbcfe8'],
    background: '#fdf2f8', cardBg: '#ffffff', cardBorder: '#fce7f3',
    textPrimary: '#831843', textSecondary: '#9d174d', textMuted: '#be185d',
    gridColor: '#fce7f3', tooltipBg: '#ffffff', tooltipBorder: '#fce7f3',
    accent: '#ec4899', positive: '#10b981', negative: '#e11d48',
  },
  sunset: {
    name: 'Sunset', colors: ['#f97316','#fb923c','#fdba74','#ea580c','#c2410c','#f59e0b'],
    background: '#fffbeb', cardBg: '#ffffff', cardBorder: '#fde68a',
    textPrimary: '#78350f', textSecondary: '#92400e', textMuted: '#b45309',
    gridColor: '#fef3c7', tooltipBg: '#ffffff', tooltipBorder: '#fde68a',
    accent: '#f97316', positive: '#16a34a', negative: '#dc2626',
  },
  ocean: {
    name: 'Ocean', colors: ['#06b6d4','#22d3ee','#67e8f9','#0891b2','#0e7490','#14b8a6'],
    background: '#ecfeff', cardBg: '#ffffff', cardBorder: '#a5f3fc',
    textPrimary: '#164e63', textSecondary: '#0e7490', textMuted: '#0891b2',
    gridColor: '#cffafe', tooltipBg: '#ffffff', tooltipBorder: '#a5f3fc',
    accent: '#06b6d4', positive: '#10b981', negative: '#f43f5e',
  },
  forest: {
    name: 'Forest', colors: ['#10b981','#34d399','#6ee7b7','#059669','#047857','#22c55e'],
    background: '#f0fdf4', cardBg: '#ffffff', cardBorder: '#bbf7d0',
    textPrimary: '#14532d', textSecondary: '#166534', textMuted: '#15803d',
    gridColor: '#dcfce7', tooltipBg: '#ffffff', tooltipBorder: '#bbf7d0',
    accent: '#10b981', positive: '#10b981', negative: '#ef4444',
  },
  lavender: {
    name: 'Lavender', colors: ['#a855f7','#c084fc','#d8b4fe','#9333ea','#7e22ce','#e9d5ff'],
    background: '#faf5ff', cardBg: '#ffffff', cardBorder: '#e9d5ff',
    textPrimary: '#581c87', textSecondary: '#6b21a8', textMuted: '#7e22ce',
    gridColor: '#f3e8ff', tooltipBg: '#ffffff', tooltipBorder: '#e9d5ff',
    accent: '#a855f7', positive: '#22c55e', negative: '#ef4444',
  },
  rose: {
    name: 'Rose', colors: ['#f43f5e','#fb7185','#fda4af','#e11d48','#be123c','#fecdd3'],
    background: '#fff1f2', cardBg: '#ffffff', cardBorder: '#fecdd3',
    textPrimary: '#881337', textSecondary: '#9f1239', textMuted: '#be123c',
    gridColor: '#ffe4e6', tooltipBg: '#ffffff', tooltipBorder: '#fecdd3',
    accent: '#f43f5e', positive: '#10b981', negative: '#e11d48',
  },
  sand: {
    name: 'Sand', colors: ['#d97706','#f59e0b','#fbbf24','#b45309','#92400e','#fde68a'],
    background: '#fefce8', cardBg: '#ffffff', cardBorder: '#fef08a',
    textPrimary: '#713f12', textSecondary: '#854d0e', textMuted: '#a16207',
    gridColor: '#fef9c3', tooltipBg: '#ffffff', tooltipBorder: '#fef08a',
    accent: '#d97706', positive: '#16a34a', negative: '#dc2626',
  },
  mint: {
    name: 'Mint', colors: ['#14b8a6','#2dd4bf','#5eead4','#0d9488','#0f766e','#99f6e4'],
    background: '#f0fdfa', cardBg: '#ffffff', cardBorder: '#99f6e4',
    textPrimary: '#134e4a', textSecondary: '#115e59', textMuted: '#0f766e',
    gridColor: '#ccfbf1', tooltipBg: '#ffffff', tooltipBorder: '#99f6e4',
    accent: '#14b8a6', positive: '#10b981', negative: '#ef4444',
  },
  sky: {
    name: 'Sky', colors: ['#0ea5e9','#38bdf8','#7dd3fc','#0284c7','#0369a1','#bae6fd'],
    background: '#f0f9ff', cardBg: '#ffffff', cardBorder: '#bae6fd',
    textPrimary: '#0c4a6e', textSecondary: '#075985', textMuted: '#0369a1',
    gridColor: '#e0f2fe', tooltipBg: '#ffffff', tooltipBorder: '#bae6fd',
    accent: '#0ea5e9', positive: '#10b981', negative: '#ef4444',
  },
  coral: {
    name: 'Coral', colors: ['#f97316','#f43f5e','#fb923c','#e11d48','#ea580c','#fda4af'],
    background: '#fff7ed', cardBg: '#ffffff', cardBorder: '#fed7aa',
    textPrimary: '#7c2d12', textSecondary: '#9a3412', textMuted: '#c2410c',
    gridColor: '#ffedd5', tooltipBg: '#ffffff', tooltipBorder: '#fed7aa',
    accent: '#f97316', positive: '#10b981', negative: '#e11d48',
  },
  sage: {
    name: 'Sage', colors: ['#84cc16','#a3e635','#bef264','#65a30d','#4d7c0f','#d9f99d'],
    background: '#f7fee7', cardBg: '#ffffff', cardBorder: '#d9f99d',
    textPrimary: '#365314', textSecondary: '#3f6212', textMuted: '#4d7c0f',
    gridColor: '#ecfccb', tooltipBg: '#ffffff', tooltipBorder: '#d9f99d',
    accent: '#84cc16', positive: '#22c55e', negative: '#ef4444',
  },
  slate: {
    name: 'Slate', colors: ['#64748b','#94a3b8','#cbd5e1','#475569','#334155','#e2e8f0'],
    background: '#f8fafc', cardBg: '#ffffff', cardBorder: '#e2e8f0',
    textPrimary: '#0f172a', textSecondary: '#334155', textMuted: '#64748b',
    gridColor: '#f1f5f9', tooltipBg: '#ffffff', tooltipBorder: '#e2e8f0',
    accent: '#64748b', positive: '#10b981', negative: '#ef4444',
  },
  cream: {
    name: 'Cream', colors: ['#b45309','#d97706','#f59e0b','#92400e','#78350f','#fcd34d'],
    background: '#fffbf0', cardBg: '#fffdf7', cardBorder: '#e8dcc8',
    textPrimary: '#44270a', textSecondary: '#6b4423', textMuted: '#92643e',
    gridColor: '#f5edd8', tooltipBg: '#fffdf7', tooltipBorder: '#e8dcc8',
    accent: '#b45309', positive: '#16a34a', negative: '#dc2626',
  },
  berry: {
    name: 'Berry', colors: ['#7c3aed','#ec4899','#a855f7','#db2777','#6d28d9','#f472b6'],
    background: '#fdf4ff', cardBg: '#ffffff', cardBorder: '#f0abfc',
    textPrimary: '#4a044e', textSecondary: '#701a75', textMuted: '#86198f',
    gridColor: '#fae8ff', tooltipBg: '#ffffff', tooltipBorder: '#f0abfc',
    accent: '#a855f7', positive: '#10b981', negative: '#e11d48',
  },
  arctic: {
    name: 'Arctic', colors: ['#6366f1','#06b6d4','#818cf8','#22d3ee','#4f46e5','#67e8f9'],
    background: '#eff6ff', cardBg: '#ffffff', cardBorder: '#bfdbfe',
    textPrimary: '#1e3a5f', textSecondary: '#3b6998', textMuted: '#6b93b8',
    gridColor: '#dbeafe', tooltipBg: '#ffffff', tooltipBorder: '#bfdbfe',
    accent: '#6366f1', positive: '#10b981', negative: '#ef4444',
  },

  // ── DARK THEMES ──
  dark: {
    name: 'Dark', colors: ['#818cf8','#a78bfa','#c4b5fd','#6366f1','#7c3aed','#4f46e5'],
    background: '#0a0a0b', cardBg: '#111113', cardBorder: '#27272a',
    textPrimary: '#fafafa', textSecondary: '#a1a1aa', textMuted: '#71717a',
    gridColor: '#27272a', tooltipBg: '#18181b', tooltipBorder: '#27272a',
    accent: '#818cf8', positive: '#34d399', negative: '#f87171',
  },
  midnight: {
    name: 'Midnight', colors: ['#60a5fa','#38bdf8','#7dd3fc','#93c5fd','#3b82f6','#2563eb'],
    background: '#020617', cardBg: '#0f172a', cardBorder: '#1e293b',
    textPrimary: '#f1f5f9', textSecondary: '#94a3b8', textMuted: '#64748b',
    gridColor: '#1e293b', tooltipBg: '#0f172a', tooltipBorder: '#1e293b',
    accent: '#60a5fa', positive: '#34d399', negative: '#fb7185',
  },
  obsidian: {
    name: 'Obsidian', colors: ['#a78bfa','#c4b5fd','#ddd6fe','#8b5cf6','#7c3aed','#6d28d9'],
    background: '#09090b', cardBg: '#18181b', cardBorder: '#27272a',
    textPrimary: '#fafafa', textSecondary: '#a1a1aa', textMuted: '#71717a',
    gridColor: '#27272a', tooltipBg: '#18181b', tooltipBorder: '#3f3f46',
    accent: '#a78bfa', positive: '#4ade80', negative: '#fb7185',
  },
  carbon: {
    name: 'Carbon', colors: ['#22d3ee','#06b6d4','#67e8f9','#0891b2','#0e7490','#a5f3fc'],
    background: '#0c0c0c', cardBg: '#161616', cardBorder: '#262626',
    textPrimary: '#f4f4f5', textSecondary: '#a3a3a3', textMuted: '#737373',
    gridColor: '#262626', tooltipBg: '#161616', tooltipBorder: '#262626',
    accent: '#22d3ee', positive: '#34d399', negative: '#f87171',
  },
  ember: {
    name: 'Ember', colors: ['#f97316','#fb923c','#fdba74','#ea580c','#f59e0b','#fbbf24'],
    background: '#0f0806', cardBg: '#1a0f09', cardBorder: '#3d2415',
    textPrimary: '#fef3c7', textSecondary: '#d4a574', textMuted: '#a67c52',
    gridColor: '#2d1a0e', tooltipBg: '#1a0f09', tooltipBorder: '#3d2415',
    accent: '#f97316', positive: '#4ade80', negative: '#f87171',
  },
  aurora: {
    name: 'Aurora', colors: ['#34d399','#a78bfa','#22d3ee','#f472b6','#818cf8','#2dd4bf'],
    background: '#050d14', cardBg: '#0a1628', cardBorder: '#172340',
    textPrimary: '#e2e8f0', textSecondary: '#94a3b8', textMuted: '#64748b',
    gridColor: '#172340', tooltipBg: '#0a1628', tooltipBorder: '#1e3a5f',
    accent: '#34d399', positive: '#34d399', negative: '#f87171',
  },
  neon: {
    name: 'Neon', colors: ['#e879f9','#c084fc','#22d3ee','#a3e635','#f472b6','#818cf8'],
    background: '#0a000f', cardBg: '#120018', cardBorder: '#2d0042',
    textPrimary: '#f5f3ff', textSecondary: '#c4b5fd', textMuted: '#8b5cf6',
    gridColor: '#1f0030', tooltipBg: '#120018', tooltipBorder: '#2d0042',
    accent: '#e879f9', positive: '#a3e635', negative: '#f87171',
  },
  dracula: {
    name: 'Dracula', colors: ['#bd93f9','#ff79c6','#8be9fd','#50fa7b','#ffb86c','#f1fa8c'],
    background: '#282a36', cardBg: '#21222c', cardBorder: '#44475a',
    textPrimary: '#f8f8f2', textSecondary: '#c0c0d0', textMuted: '#6272a4',
    gridColor: '#44475a', tooltipBg: '#21222c', tooltipBorder: '#44475a',
    accent: '#bd93f9', positive: '#50fa7b', negative: '#ff5555',
  },
  nord: {
    name: 'Nord', colors: ['#88c0d0','#81a1c1','#5e81ac','#8fbcbb','#b48ead','#a3be8c'],
    background: '#2e3440', cardBg: '#3b4252', cardBorder: '#434c5e',
    textPrimary: '#eceff4', textSecondary: '#d8dee9', textMuted: '#7b88a1',
    gridColor: '#434c5e', tooltipBg: '#3b4252', tooltipBorder: '#4c566a',
    accent: '#88c0d0', positive: '#a3be8c', negative: '#bf616a',
  },
  monokai: {
    name: 'Monokai', colors: ['#a6e22e','#f92672','#66d9ef','#fd971f','#ae81ff','#e6db74'],
    background: '#272822', cardBg: '#1e1f1c', cardBorder: '#3e3d32',
    textPrimary: '#f8f8f2', textSecondary: '#cfcfc2', textMuted: '#75715e',
    gridColor: '#3e3d32', tooltipBg: '#1e1f1c', tooltipBorder: '#3e3d32',
    accent: '#a6e22e', positive: '#a6e22e', negative: '#f92672',
  },
  synthwave: {
    name: 'Synthwave', colors: ['#ff7edb','#36f9f6','#fede5d','#ff8b39','#e2e22e','#fc4680'],
    background: '#1a1025', cardBg: '#241b36', cardBorder: '#352a4a',
    textPrimary: '#f0e6ff', textSecondary: '#c5a3e6', textMuted: '#8a63b2',
    gridColor: '#2d2140', tooltipBg: '#241b36', tooltipBorder: '#352a4a',
    accent: '#ff7edb', positive: '#36f9f6', negative: '#fc4680',
  },
  nightOwl: {
    name: 'Night Owl', colors: ['#7fdbca','#c792ea','#82aaff','#f78c6c','#addb67','#ffcb8b'],
    background: '#011627', cardBg: '#0b2942', cardBorder: '#1d3b53',
    textPrimary: '#d6deeb', textSecondary: '#7fdbca', textMuted: '#637777',
    gridColor: '#1d3b53', tooltipBg: '#0b2942', tooltipBorder: '#1d3b53',
    accent: '#7fdbca', positive: '#addb67', negative: '#ef5350',
  },
  matrix: {
    name: 'Matrix', colors: ['#00ff41','#00cc33','#009926','#33ff66','#66ff8c','#00e639'],
    background: '#000800', cardBg: '#001200', cardBorder: '#003300',
    textPrimary: '#00ff41', textSecondary: '#00cc33', textMuted: '#007722',
    gridColor: '#002200', tooltipBg: '#001200', tooltipBorder: '#003300',
    accent: '#00ff41', positive: '#00ff41', negative: '#ff0040',
  },
  solarized: {
    name: 'Solarized', colors: ['#268bd2','#2aa198','#859900','#b58900','#cb4b16','#6c71c4'],
    background: '#002b36', cardBg: '#073642', cardBorder: '#094f5a',
    textPrimary: '#fdf6e3', textSecondary: '#93a1a1', textMuted: '#586e75',
    gridColor: '#094f5a', tooltipBg: '#073642', tooltipBorder: '#094f5a',
    accent: '#268bd2', positive: '#859900', negative: '#dc322f',
  },
  oneDark: {
    name: 'One Dark', colors: ['#61afef','#c678dd','#e06c75','#98c379','#e5c07b','#56b6c2'],
    background: '#21252b', cardBg: '#282c34', cardBorder: '#3e4451',
    textPrimary: '#abb2bf', textSecondary: '#828997', textMuted: '#5c6370',
    gridColor: '#3e4451', tooltipBg: '#282c34', tooltipBorder: '#3e4451',
    accent: '#61afef', positive: '#98c379', negative: '#e06c75',
  },
  tokyo: {
    name: 'Tokyo Night', colors: ['#7aa2f7','#bb9af7','#7dcfff','#9ece6a','#ff9e64','#f7768e'],
    background: '#1a1b26', cardBg: '#24283b', cardBorder: '#3b4261',
    textPrimary: '#c0caf5', textSecondary: '#9aa5ce', textMuted: '#565f89',
    gridColor: '#3b4261', tooltipBg: '#24283b', tooltipBorder: '#3b4261',
    accent: '#7aa2f7', positive: '#9ece6a', negative: '#f7768e',
  },
  catppuccin: {
    name: 'Catppuccin', colors: ['#89b4fa','#cba6f7','#f38ba8','#a6e3a1','#fab387','#94e2d5'],
    background: '#1e1e2e', cardBg: '#313244', cardBorder: '#45475a',
    textPrimary: '#cdd6f4', textSecondary: '#bac2de', textMuted: '#6c7086',
    gridColor: '#45475a', tooltipBg: '#313244', tooltipBorder: '#45475a',
    accent: '#89b4fa', positive: '#a6e3a1', negative: '#f38ba8',
  },
  github: {
    name: 'GitHub Dark', colors: ['#58a6ff','#bc8cff','#3fb950','#d29922','#f85149','#79c0ff'],
    background: '#0d1117', cardBg: '#161b22', cardBorder: '#30363d',
    textPrimary: '#e6edf3', textSecondary: '#8b949e', textMuted: '#6e7681',
    gridColor: '#21262d', tooltipBg: '#161b22', tooltipBorder: '#30363d',
    accent: '#58a6ff', positive: '#3fb950', negative: '#f85149',
  },
  deepSea: {
    name: 'Deep Sea', colors: ['#00bcd4','#0097a7','#00838f','#4dd0e1','#80deea','#26c6da'],
    background: '#001519', cardBg: '#002329', cardBorder: '#004d56',
    textPrimary: '#b2ebf2', textSecondary: '#80cbc4', textMuted: '#4db6ac',
    gridColor: '#003840', tooltipBg: '#002329', tooltipBorder: '#004d56',
    accent: '#00bcd4', positive: '#69f0ae', negative: '#ff5252',
  },
  wine: {
    name: 'Wine', colors: ['#c2185b','#e91e63','#f06292','#ad1457','#880e4f','#f48fb1'],
    background: '#120008', cardBg: '#1a000d', cardBorder: '#3d001c',
    textPrimary: '#fce4ec', textSecondary: '#f48fb1', textMuted: '#c2185b',
    gridColor: '#2b0014', tooltipBg: '#1a000d', tooltipBorder: '#3d001c',
    accent: '#e91e63', positive: '#69f0ae', negative: '#ff5252',
  },
  copper: {
    name: 'Copper', colors: ['#d4a574','#c08552','#a66e3f','#e8c4a0','#b67940','#f0d6b8'],
    background: '#0f0a06', cardBg: '#1a1209', cardBorder: '#3d2a15',
    textPrimary: '#f0d6b8', textSecondary: '#c8a882', textMuted: '#8a6d4a',
    gridColor: '#2a1d0f', tooltipBg: '#1a1209', tooltipBorder: '#3d2a15',
    accent: '#d4a574', positive: '#66bb6a', negative: '#ef5350',
  },
  amethyst: {
    name: 'Amethyst', colors: ['#9c27b0','#ab47bc','#ba68c8','#8e24aa','#7b1fa2','#ce93d8'],
    background: '#0d0011', cardBg: '#15001c', cardBorder: '#2f003f',
    textPrimary: '#f3e5f5', textSecondary: '#ce93d8', textMuted: '#7b1fa2',
    gridColor: '#1f002a', tooltipBg: '#15001c', tooltipBorder: '#2f003f',
    accent: '#ab47bc', positive: '#69f0ae', negative: '#ff5252',
  },
  steel: {
    name: 'Steel', colors: ['#78909c','#90a4ae','#b0bec5','#607d8b','#546e7a','#cfd8dc'],
    background: '#111518', cardBg: '#1a2027', cardBorder: '#2c3640',
    textPrimary: '#eceff1', textSecondary: '#b0bec5', textMuted: '#78909c',
    gridColor: '#263238', tooltipBg: '#1a2027', tooltipBorder: '#2c3640',
    accent: '#78909c', positive: '#66bb6a', negative: '#ef5350',
  },
  volcano: {
    name: 'Volcano', colors: ['#ff5722','#ff7043','#ff8a65','#f4511e','#e64a19','#ffab91'],
    background: '#100400', cardBg: '#1a0a02', cardBorder: '#3e1a08',
    textPrimary: '#fbe9e7', textSecondary: '#ffab91', textMuted: '#bf360c',
    gridColor: '#2a1005', tooltipBg: '#1a0a02', tooltipBorder: '#3e1a08',
    accent: '#ff5722', positive: '#69f0ae', negative: '#ff1744',
  },
  // ── SPECIAL / GRADIENT THEMES ──
  candy: {
    name: 'Candy', colors: ['#ff6b9d','#c084fc','#67e8f9','#fbbf24','#fb923c','#a78bfa'],
    background: '#fef7ff', cardBg: '#ffffff', cardBorder: '#f5d0fe',
    textPrimary: '#4a1659', textSecondary: '#7e3694', textMuted: '#a855c7',
    gridColor: '#fae8ff', tooltipBg: '#ffffff', tooltipBorder: '#f5d0fe',
    accent: '#ff6b9d', positive: '#22c55e', negative: '#ef4444',
  },
  retro: {
    name: 'Retro', colors: ['#e8590c','#d9480f','#f08c00','#2b8a3e','#1864ab','#862e9c'],
    background: '#fef3e2', cardBg: '#fdf6ec', cardBorder: '#e6d5b8',
    textPrimary: '#3d2200', textSecondary: '#6d4c00', textMuted: '#9c7a32',
    gridColor: '#f0e4d0', tooltipBg: '#fdf6ec', tooltipBorder: '#e6d5b8',
    accent: '#e8590c', positive: '#2b8a3e', negative: '#c92a2a',
  },
  pastel: {
    name: 'Pastel', colors: ['#93c5fd','#c4b5fd','#fda4af','#86efac','#fcd34d','#a5f3fc'],
    background: '#fefefe', cardBg: '#ffffff', cardBorder: '#e8eaed',
    textPrimary: '#374151', textSecondary: '#6b7280', textMuted: '#9ca3af',
    gridColor: '#f3f4f6', tooltipBg: '#ffffff', tooltipBorder: '#e8eaed',
    accent: '#93c5fd', positive: '#86efac', negative: '#fda4af',
  },
  hacker: {
    name: 'Hacker', colors: ['#10b981','#34d399','#6ee7b7','#059669','#a3e635','#22d3ee'],
    background: '#000000', cardBg: '#0a0a0a', cardBorder: '#1a1a1a',
    textPrimary: '#10b981', textSecondary: '#059669', textMuted: '#047857',
    gridColor: '#111111', tooltipBg: '#0a0a0a', tooltipBorder: '#1a1a1a',
    accent: '#10b981', positive: '#10b981', negative: '#ef4444',
  },
  bubblegum: {
    name: 'Bubblegum', colors: ['#f472b6','#a78bfa','#22d3ee','#fbbf24','#34d399','#fb923c'],
    background: '#fdf2f8', cardBg: '#fff5f9', cardBorder: '#fbcfe8',
    textPrimary: '#5b1048', textSecondary: '#8b3a6e', textMuted: '#b55c94',
    gridColor: '#fce7f3', tooltipBg: '#fff5f9', tooltipBorder: '#fbcfe8',
    accent: '#f472b6', positive: '#34d399', negative: '#ef4444',
  },
  monochrome: {
    name: 'Monochrome', colors: ['#374151','#6b7280','#9ca3af','#4b5563','#d1d5db','#1f2937'],
    background: '#ffffff', cardBg: '#ffffff', cardBorder: '#e5e7eb',
    textPrimary: '#111827', textSecondary: '#4b5563', textMuted: '#9ca3af',
    gridColor: '#f3f4f6', tooltipBg: '#ffffff', tooltipBorder: '#e5e7eb',
    accent: '#374151', positive: '#4b5563', negative: '#6b7280',
  },
  warmNight: {
    name: 'Warm Night', colors: ['#fbbf24','#f59e0b','#f97316','#d97706','#fb923c','#facc15'],
    background: '#110e08', cardBg: '#1a150c', cardBorder: '#372a18',
    textPrimary: '#fef3c7', textSecondary: '#d4a050', textMuted: '#a07830',
    gridColor: '#261e10', tooltipBg: '#1a150c', tooltipBorder: '#372a18',
    accent: '#fbbf24', positive: '#4ade80', negative: '#f87171',
  },
  ice: {
    name: 'Ice', colors: ['#bfdbfe','#93c5fd','#60a5fa','#dbeafe','#3b82f6','#a5b4fc'],
    background: '#f0f4ff', cardBg: '#f8faff', cardBorder: '#dbe4f8',
    textPrimary: '#1e3a5f', textSecondary: '#4a6d94', textMuted: '#7b9fc4',
    gridColor: '#e8eef8', tooltipBg: '#f8faff', tooltipBorder: '#dbe4f8',
    accent: '#60a5fa', positive: '#10b981', negative: '#ef4444',
  },
  grayscale: {
    name: 'Grayscale', colors: ['#525252','#737373','#a3a3a3','#404040','#d4d4d4','#262626'],
    background: '#fafafa', cardBg: '#ffffff', cardBorder: '#e5e5e5',
    textPrimary: '#171717', textSecondary: '#525252', textMuted: '#a3a3a3',
    gridColor: '#f5f5f5', tooltipBg: '#ffffff', tooltipBorder: '#e5e5e5',
    accent: '#525252', positive: '#525252', negative: '#737373',
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
