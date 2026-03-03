// ─── Universal Sample Data for Signum UI ───

export const monthlyRevenue = [
  { month: 'Jan', revenue: 4200, expenses: 2400, profit: 1800 },
  { month: 'Feb', revenue: 4800, expenses: 2600, profit: 2200 },
  { month: 'Mar', revenue: 5100, expenses: 2800, profit: 2300 },
  { month: 'Apr', revenue: 4900, expenses: 2500, profit: 2400 },
  { month: 'May', revenue: 5600, expenses: 3000, profit: 2600 },
  { month: 'Jun', revenue: 6200, expenses: 3200, profit: 3000 },
  { month: 'Jul', revenue: 5800, expenses: 2900, profit: 2900 },
  { month: 'Aug', revenue: 6500, expenses: 3400, profit: 3100 },
  { month: 'Sep', revenue: 7100, expenses: 3600, profit: 3500 },
  { month: 'Oct', revenue: 6800, expenses: 3300, profit: 3500 },
  { month: 'Nov', revenue: 7400, expenses: 3800, profit: 3600 },
  { month: 'Dec', revenue: 8200, expenses: 4100, profit: 4100 },
];

export const weeklyTraffic = [
  { day: 'Mon', visitors: 1200, pageViews: 3400, bounceRate: 42 },
  { day: 'Tue', visitors: 1400, pageViews: 4100, bounceRate: 38 },
  { day: 'Wed', visitors: 1350, pageViews: 3800, bounceRate: 40 },
  { day: 'Thu', visitors: 1500, pageViews: 4300, bounceRate: 35 },
  { day: 'Fri', visitors: 1250, pageViews: 3600, bounceRate: 44 },
  { day: 'Sat', visitors: 900, pageViews: 2200, bounceRate: 52 },
  { day: 'Sun', visitors: 850, pageViews: 2000, bounceRate: 55 },
];

export const productSales = [
  { product: 'Electronics', sales: 42000, growth: 12.5 },
  { product: 'Clothing', sales: 35000, growth: 8.2 },
  { product: 'Home & Garden', sales: 28000, growth: 15.1 },
  { product: 'Sports', sales: 22000, growth: -3.4 },
  { product: 'Books', sales: 18000, growth: 5.7 },
  { product: 'Food & Beverage', sales: 31000, growth: 9.8 },
  { product: 'Health', sales: 26000, growth: 18.2 },
  { product: 'Toys', sales: 15000, growth: -1.2 },
];

export const marketShare = [
  { name: 'Chrome', value: 64.8, color: '#6366f1' },
  { name: 'Safari', value: 18.7, color: '#8b5cf6' },
  { name: 'Firefox', value: 3.2, color: '#a78bfa' },
  { name: 'Edge', value: 5.1, color: '#c4b5fd' },
  { name: 'Opera', value: 2.4, color: '#7c3aed' },
  { name: 'Other', value: 5.8, color: '#4c1d95' },
];

export const quarterlyData = [
  { quarter: 'Q1 2024', actual: 12400, forecast: 11800, target: 13000 },
  { quarter: 'Q2 2024', actual: 14200, forecast: 13500, target: 14000 },
  { quarter: 'Q3 2024', actual: 15800, forecast: 15000, target: 15000 },
  { quarter: 'Q4 2024', actual: 17200, forecast: 16800, target: 16000 },
  { quarter: 'Q1 2025', actual: 16500, forecast: 17500, target: 17000 },
  { quarter: 'Q2 2025', actual: 18900, forecast: 18200, target: 18000 },
];

export const userGrowth = [
  { month: 'Jan', users: 12000, active: 8400, churn: 1200 },
  { month: 'Feb', users: 13500, active: 9700, churn: 1100 },
  { month: 'Mar', users: 15200, active: 11200, churn: 980 },
  { month: 'Apr', users: 16800, active: 12500, churn: 870 },
  { month: 'May', users: 19000, active: 14800, churn: 750 },
  { month: 'Jun', users: 21500, active: 17200, churn: 680 },
  { month: 'Jul', users: 23800, active: 19400, churn: 620 },
  { month: 'Aug', users: 26200, active: 21800, churn: 580 },
  { month: 'Sep', users: 28900, active: 24200, churn: 540 },
  { month: 'Oct', users: 31200, active: 26500, churn: 510 },
  { month: 'Nov', users: 34000, active: 29100, churn: 480 },
  { month: 'Dec', users: 37500, active: 32000, churn: 450 },
];

export const scatterData = Array.from({ length: 80 }, () => ({
  x: Math.round(Math.random() * 100),
  y: Math.round(Math.random() * 100),
  z: Math.round(Math.random() * 1000 + 200),
  category: ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)],
}));

export const heatmapData = (() => {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const data: { hour: string; day: string; value: number }[] = [];
  days.forEach(day => {
    hours.forEach(hour => {
      const h = parseInt(hour);
      let base = 20;
      if (h >= 9 && h <= 17) base = 60;
      if (h >= 12 && h <= 14) base = 80;
      if (day === 'Sat' || day === 'Sun') base *= 0.4;
      data.push({ hour, day, value: Math.round(base + Math.random() * 30) });
    });
  });
  return data;
})();

export const funnelData = [
  { stage: 'Visitors', value: 12500, color: '#6366f1' },
  { stage: 'Sign Ups', value: 8200, color: '#818cf8' },
  { stage: 'Activation', value: 5400, color: '#a78bfa' },
  { stage: 'Retention', value: 3200, color: '#c4b5fd' },
  { stage: 'Revenue', value: 1800, color: '#7c3aed' },
];

export const radarData = [
  { metric: 'Speed', A: 85, B: 72, fullMark: 100 },
  { metric: 'Reliability', A: 92, B: 88, fullMark: 100 },
  { metric: 'Comfort', A: 78, B: 85, fullMark: 100 },
  { metric: 'Safety', A: 95, B: 90, fullMark: 100 },
  { metric: 'Efficiency', A: 88, B: 76, fullMark: 100 },
  { metric: 'Design', A: 82, B: 91, fullMark: 100 },
];

export const waterfallData = [
  { name: 'Revenue', value: 42000 },
  { name: 'COGS', value: -18000 },
  { name: 'Gross Profit', value: 24000 },
  { name: 'Marketing', value: -6000 },
  { name: 'R&D', value: -8000 },
  { name: 'Admin', value: -3000 },
  { name: 'Net Income', value: 7000 },
];

export const treemapData = [
  { name: 'Technology', size: 4500, children: [
    { name: 'Software', size: 2200 },
    { name: 'Hardware', size: 1400 },
    { name: 'Services', size: 900 },
  ]},
  { name: 'Healthcare', size: 3200, children: [
    { name: 'Pharma', size: 1800 },
    { name: 'Biotech', size: 900 },
    { name: 'Devices', size: 500 },
  ]},
  { name: 'Finance', size: 2800, children: [
    { name: 'Banking', size: 1500 },
    { name: 'Insurance', size: 800 },
    { name: 'Fintech', size: 500 },
  ]},
  { name: 'Energy', size: 2100, children: [
    { name: 'Oil & Gas', size: 1100 },
    { name: 'Renewables', size: 600 },
    { name: 'Utilities', size: 400 },
  ]},
];

export const candlestickData = [
  { date: 'Mar 1', open: 142.5, high: 148.2, low: 141.0, close: 147.8, volume: 32000000 },
  { date: 'Mar 2', open: 147.8, high: 150.1, low: 146.5, close: 149.2, volume: 28000000 },
  { date: 'Mar 3', open: 149.2, high: 151.5, low: 147.8, close: 148.1, volume: 25000000 },
  { date: 'Mar 4', open: 148.1, high: 149.8, low: 144.2, close: 145.0, volume: 35000000 },
  { date: 'Mar 5', open: 145.0, high: 147.5, low: 143.8, close: 146.8, volume: 30000000 },
  { date: 'Mar 6', open: 146.8, high: 152.0, low: 146.0, close: 151.5, volume: 42000000 },
  { date: 'Mar 7', open: 151.5, high: 155.2, low: 150.8, close: 154.8, volume: 38000000 },
  { date: 'Mar 8', open: 154.8, high: 156.5, low: 153.2, close: 155.9, volume: 29000000 },
  { date: 'Mar 9', open: 155.9, high: 157.1, low: 152.5, close: 153.0, volume: 33000000 },
  { date: 'Mar 10', open: 153.0, high: 154.8, low: 150.2, close: 152.5, volume: 27000000 },
  { date: 'Mar 11', open: 152.5, high: 156.8, low: 151.8, close: 156.2, volume: 36000000 },
  { date: 'Mar 12', open: 156.2, high: 158.5, low: 155.0, close: 157.8, volume: 31000000 },
];

export const sankey = {
  nodes: [
    'Organic Search', 'Paid Ads', 'Social Media', 'Direct',
    'Landing Page', 'Blog', 'Product Page',
    'Sign Up', 'Purchase', 'Bounce'
  ],
  links: [
    { source: 0, target: 4, value: 3200 },
    { source: 0, target: 5, value: 1800 },
    { source: 1, target: 4, value: 2400 },
    { source: 1, target: 6, value: 1600 },
    { source: 2, target: 5, value: 1200 },
    { source: 2, target: 4, value: 800 },
    { source: 3, target: 6, value: 2000 },
    { source: 3, target: 4, value: 600 },
    { source: 4, target: 7, value: 3500 },
    { source: 4, target: 9, value: 3500 },
    { source: 5, target: 7, value: 1500 },
    { source: 5, target: 9, value: 1500 },
    { source: 6, target: 8, value: 2200 },
    { source: 6, target: 9, value: 1400 },
  ]
};

export const kpiData = [
  { title: 'Total Revenue', value: '$84.2K', change: 12.5, trend: [28, 32, 35, 30, 38, 42, 48, 52, 58, 55, 62, 68] },
  { title: 'Active Users', value: '32,847', change: 8.2, trend: [120, 145, 152, 168, 175, 192, 198, 215, 228, 245, 262, 278] },
  { title: 'Conversion Rate', value: '3.24%', change: -2.1, trend: [3.8, 3.6, 3.5, 3.4, 3.3, 3.2, 3.1, 3.3, 3.2, 3.1, 3.2, 3.24] },
  { title: 'Avg. Order Value', value: '$127.50', change: 5.8, trend: [98, 102, 108, 112, 115, 118, 120, 122, 124, 125, 126, 127.5] },
];

export const gaugeData = [
  { label: 'CPU Usage', value: 72, max: 100, color: '#6366f1' },
  { label: 'Memory', value: 58, max: 100, color: '#8b5cf6' },
  { label: 'Disk I/O', value: 34, max: 100, color: '#a78bfa' },
  { label: 'Network', value: 89, max: 100, color: '#7c3aed' },
];

export const timeSeriesData = Array.from({ length: 90 }, (_, i) => {
  const date = new Date(2025, 0, i + 1);
  const base = 1000 + Math.sin(i / 10) * 300;
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: Math.round(base + Math.random() * 200),
    predicted: Math.round(base + 50 + Math.random() * 150),
  };
});

export const cohortData = [
  { cohort: 'Jan', w1: 100, w2: 82, w3: 68, w4: 55, w5: 48, w6: 42 },
  { cohort: 'Feb', w1: 100, w2: 78, w3: 64, w4: 52, w5: 45, w6: 40 },
  { cohort: 'Mar', w1: 100, w2: 85, w3: 72, w4: 61, w5: 54, w6: 48 },
  { cohort: 'Apr', w1: 100, w2: 80, w3: 66, w4: 54, w5: 47, w6: 41 },
  { cohort: 'May', w1: 100, w2: 88, w3: 75, w4: 64, w5: 56, w6: 50 },
  { cohort: 'Jun', w1: 100, w2: 83, w3: 70, w4: 58, w5: 51, w6: 45 },
];

export const stackedData = [
  { month: 'Jan', mobile: 2400, desktop: 3800, tablet: 1200 },
  { month: 'Feb', mobile: 2800, desktop: 4200, tablet: 1400 },
  { month: 'Mar', mobile: 3200, desktop: 4500, tablet: 1600 },
  { month: 'Apr', mobile: 3000, desktop: 4100, tablet: 1500 },
  { month: 'May', mobile: 3500, desktop: 4800, tablet: 1700 },
  { month: 'Jun', mobile: 3800, desktop: 5200, tablet: 1900 },
  { month: 'Jul', mobile: 4200, desktop: 5500, tablet: 2100 },
  { month: 'Aug', mobile: 4500, desktop: 5800, tablet: 2200 },
  { month: 'Sep', mobile: 4100, desktop: 5400, tablet: 2000 },
  { month: 'Oct', mobile: 4400, desktop: 5600, tablet: 2100 },
  { month: 'Nov', mobile: 4800, desktop: 6000, tablet: 2300 },
  { month: 'Dec', mobile: 5200, desktop: 6400, tablet: 2500 },
];

export const divergingData = [
  { category: 'Product A', positive: 42, negative: -18 },
  { category: 'Product B', positive: 35, negative: -25 },
  { category: 'Product C', positive: 28, negative: -12 },
  { category: 'Product D', positive: 52, negative: -8 },
  { category: 'Product E', positive: 18, negative: -32 },
  { category: 'Product F', positive: 45, negative: -15 },
];

export const bubbleData = Array.from({ length: 40 }, (_, i) => ({
  x: Math.round(20 + Math.random() * 80),
  y: Math.round(10 + Math.random() * 90),
  z: Math.round(200 + Math.random() * 2000),
  name: `Company ${String.fromCharCode(65 + (i % 26))}${i > 25 ? '2' : ''}`,
  category: ['Tech', 'Finance', 'Health', 'Energy'][i % 4],
}));

export const progressData = [
  { label: 'Design System', progress: 85, color: '#6366f1' },
  { label: 'API Integration', progress: 62, color: '#8b5cf6' },
  { label: 'Testing Suite', progress: 45, color: '#a78bfa' },
  { label: 'Documentation', progress: 91, color: '#7c3aed' },
  { label: 'Deployment', progress: 28, color: '#c4b5fd' },
];

export const pieData = [
  { name: 'Desktop', value: 45.2 },
  { name: 'Mobile', value: 32.8 },
  { name: 'Tablet', value: 12.4 },
  { name: 'Smart TV', value: 5.8 },
  { name: 'Other', value: 3.8 },
];

export const horizontalBarData = [
  { name: 'TypeScript', value: 89 },
  { name: 'Python', value: 82 },
  { name: 'Rust', value: 76 },
  { name: 'Go', value: 71 },
  { name: 'JavaScript', value: 68 },
  { name: 'Java', value: 54 },
  { name: 'C++', value: 48 },
  { name: 'Swift', value: 42 },
];

export const multiLineData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  series1: Math.round(50 + Math.sin(i / 3) * 30 + Math.random() * 10),
  series2: Math.round(40 + Math.cos(i / 4) * 25 + Math.random() * 10),
  series3: Math.round(60 + Math.sin(i / 5 + 1) * 20 + Math.random() * 10),
}));

export const sparklineData = {
  revenue: [28, 32, 35, 30, 38, 42, 48, 52, 58, 55, 62, 68],
  users: [120, 145, 152, 168, 175, 192, 198, 215, 228, 245, 262, 278],
  orders: [45, 52, 48, 55, 62, 58, 65, 72, 68, 75, 82, 88],
  latency: [45, 42, 48, 38, 35, 42, 38, 32, 28, 35, 30, 25],
};

export const areaComparisonData = [
  { month: 'Jan', thisYear: 4200, lastYear: 3800 },
  { month: 'Feb', thisYear: 4800, lastYear: 4100 },
  { month: 'Mar', thisYear: 5100, lastYear: 4500 },
  { month: 'Apr', thisYear: 4900, lastYear: 4200 },
  { month: 'May', thisYear: 5600, lastYear: 4800 },
  { month: 'Jun', thisYear: 6200, lastYear: 5100 },
  { month: 'Jul', thisYear: 5800, lastYear: 5400 },
  { month: 'Aug', thisYear: 6500, lastYear: 5800 },
  { month: 'Sep', thisYear: 7100, lastYear: 6200 },
  { month: 'Oct', thisYear: 6800, lastYear: 5900 },
  { month: 'Nov', thisYear: 7400, lastYear: 6400 },
  { month: 'Dec', thisYear: 8200, lastYear: 7100 },
];

export const distributionData = Array.from({ length: 200 }, () => ({
  value: Math.round((Math.random() + Math.random() + Math.random()) / 3 * 100),
}));

export const statusData = [
  { service: 'API Gateway', status: 'operational', uptime: 99.98 },
  { service: 'Database Cluster', status: 'operational', uptime: 99.95 },
  { service: 'CDN', status: 'degraded', uptime: 98.2 },
  { service: 'Auth Service', status: 'operational', uptime: 99.99 },
  { service: 'Search Index', status: 'operational', uptime: 99.87 },
  { service: 'ML Pipeline', status: 'maintenance', uptime: 95.5 },
  { service: 'Storage', status: 'operational', uptime: 99.94 },
  { service: 'Queue Service', status: 'operational', uptime: 99.91 },
];

export const comparisonData = [
  { feature: 'Performance', ours: 95, competitor: 78 },
  { feature: 'Reliability', ours: 92, competitor: 85 },
  { feature: 'Scalability', ours: 88, competitor: 72 },
  { feature: 'Security', ours: 96, competitor: 88 },
  { feature: 'Cost', ours: 82, competitor: 90 },
  { feature: 'Support', ours: 90, competitor: 75 },
];

export const stepData = [
  { date: 'Week 1', value: 120 },
  { date: 'Week 2', value: 120 },
  { date: 'Week 3', value: 180 },
  { date: 'Week 4', value: 180 },
  { date: 'Week 5', value: 240 },
  { date: 'Week 6', value: 240 },
  { date: 'Week 7', value: 200 },
  { date: 'Week 8', value: 200 },
  { date: 'Week 9', value: 320 },
  { date: 'Week 10', value: 320 },
  { date: 'Week 11', value: 280 },
  { date: 'Week 12', value: 280 },
];
