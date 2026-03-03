import { useState } from 'react';
import { Search, LayoutGrid, BarChart3, LineChart as LineIcon, PieChart as PieIcon, Activity, Table, Gauge, Layers, GitBranch, Sparkles } from 'lucide-react';

// Data
import {
  monthlyRevenue, weeklyTraffic, productSales, marketShare, quarterlyData,
  userGrowth, scatterData, heatmapData, funnelData, radarData,
  waterfallData, treemapData, candlestickData, sankey, kpiData,
  gaugeData, timeSeriesData, cohortData, stackedData, divergingData,
  bubbleData, progressData, pieData, horizontalBarData, multiLineData,
  sparklineData, areaComparisonData, distributionData, statusData,
  comparisonData, stepData,
} from './data/sampleData';

// Charts
import AreaChart from './components/charts/AreaChart';
import BarChart from './components/charts/BarChart';
import LineChart from './components/charts/LineChart';
import DonutChart from './components/charts/DonutChart';
import PieChartComp from './components/charts/PieChart';
import StackedAreaChart from './components/charts/StackedAreaChart';
import StackedBarChart from './components/charts/StackedBarChart';
import GroupedBarChart from './components/charts/GroupedBarChart';
import HorizontalBarChart from './components/charts/HorizontalBarChart';
import ScatterPlot from './components/charts/ScatterPlot';
import RadarChart from './components/charts/RadarChart';
import MultiLineChart from './components/charts/MultiLineChart';
import AreaComparisonChart from './components/charts/AreaComparisonChart';
import StepLineChart from './components/charts/StepLineChart';
import DivergingBarChart from './components/charts/DivergingBarChart';
import BubbleChart from './components/charts/BubbleChart';
import UserGrowthChart from './components/charts/UserGrowthChart';
import RevenueExpenseChart from './components/charts/RevenueExpenseChart';
import KPICard from './components/charts/KPICard';
import FunnelChart from './components/charts/FunnelChart';
import GaugeChart from './components/charts/GaugeChart';
import ProgressBars from './components/charts/ProgressBars';
import StatusTracker from './components/charts/StatusTracker';
import WaffleChart from './components/charts/WaffleChart';
import HeatmapChart from './components/charts/HeatmapChart';
import TreemapChart from './components/charts/TreemapChart';
import CandlestickChart from './components/charts/CandlestickChart';
import WaterfallChart from './components/charts/WaterfallChart';
import CohortTable from './components/charts/CohortTable';
import SparklineGrid from './components/charts/SparklineGrid';
import RadialProgress from './components/charts/RadialProgress';
import SemiCircleGauge from './components/charts/SemiCircleGauge';
import NestedDonut from './components/charts/NestedDonut';
import TimeSeriesChart from './components/charts/TimeSeriesChart';
import MetricCards from './components/charts/MetricCards';
import DataTable from './components/charts/DataTable';
import ComparisonRadar from './components/charts/ComparisonRadar';
import HistogramChart from './components/charts/HistogramChart';
import GradientLineChart from './components/charts/GradientLineChart';
import MiniBarChart from './components/charts/MiniBarChart';
import DotPlot from './components/charts/DotPlot';
import SankeyDiagram from './components/charts/SankeyDiagram';
import ActivityCalendar from './components/charts/ActivityCalendar';
import BoxPlot from './components/charts/BoxPlot';
import BulletChart from './components/charts/BulletChart';
import GradientDonut from './components/charts/GradientDonut';
import ParallelCoordinates from './components/charts/ParallelCoordinates';
import ViolinPlot from './components/charts/ViolinPlot';
import StreamGraph from './components/charts/StreamGraph';
import PolarAreaChart from './components/charts/PolarAreaChart';
import AreaSpline from './components/charts/AreaSpline';
import RangeBar from './components/charts/RangeBar';
import MixedChart from './components/charts/MixedChart';
import NumberTicker from './components/charts/NumberTicker';
import LoadingSkeleton from './components/charts/LoadingSkeleton';
import GrowthBar from './components/charts/GrowthBar';
import AnnotatedLine from './components/charts/AnnotatedLine';
import PercentageBar from './components/charts/PercentageBar';

type Category = 'all' | 'line' | 'bar' | 'circular' | 'scatter' | 'analytical' | 'utility' | 'distribution' | 'custom';

const categories: { key: Category; label: string; icon: typeof LayoutGrid }[] = [
  { key: 'all', label: 'All Components', icon: LayoutGrid },
  { key: 'line', label: 'Line & Area', icon: LineIcon },
  { key: 'bar', label: 'Bar Charts', icon: BarChart3 },
  { key: 'circular', label: 'Circular', icon: PieIcon },
  { key: 'scatter', label: 'Scatter & Bubble', icon: Activity },
  { key: 'analytical', label: 'Analytical', icon: Table },
  { key: 'distribution', label: 'Distribution', icon: Layers },
  { key: 'utility', label: 'Utility', icon: Gauge },
  { key: 'custom', label: 'Advanced', icon: GitBranch },
];

interface ChartDef {
  id: string;
  category: Category[];
  render: () => React.ReactNode;
}

const charts: ChartDef[] = [
  { id: 'kpi-cards', category: ['utility'], render: () => <KPICard data={kpiData} /> },
  { id: 'metric-cards', category: ['utility'], render: () => <MetricCards /> },
  { id: 'area-chart', category: ['line'], render: () => <AreaChart data={monthlyRevenue} /> },
  { id: 'line-chart', category: ['line'], render: () => <LineChart data={weeklyTraffic} /> },
  { id: 'bar-chart', category: ['bar'], render: () => <BarChart data={productSales} /> },
  { id: 'donut-chart', category: ['circular'], render: () => <DonutChart data={marketShare} /> },
  { id: 'stacked-area', category: ['line'], render: () => <StackedAreaChart data={stackedData} /> },
  { id: 'grouped-bar', category: ['bar'], render: () => <GroupedBarChart data={quarterlyData} /> },
  { id: 'multi-line', category: ['line'], render: () => <MultiLineChart data={multiLineData} /> },
  { id: 'gradient-line', category: ['line'], render: () => <GradientLineChart data={userGrowth} /> },
  { id: 'pie-chart', category: ['circular'], render: () => <PieChartComp data={pieData} /> },
  { id: 'radar-chart', category: ['analytical'], render: () => <RadarChart data={radarData} /> },
  { id: 'horizontal-bar', category: ['bar'], render: () => <HorizontalBarChart data={horizontalBarData} /> },
  { id: 'scatter-plot', category: ['scatter'], render: () => <ScatterPlot data={scatterData} /> },
  { id: 'stacked-bar', category: ['bar'], render: () => <StackedBarChart data={stackedData} /> },
  { id: 'area-comparison', category: ['line'], render: () => <AreaComparisonChart data={areaComparisonData} /> },
  { id: 'user-growth', category: ['line'], render: () => <UserGrowthChart data={userGrowth} /> },
  { id: 'revenue-expense', category: ['bar'], render: () => <RevenueExpenseChart data={monthlyRevenue} /> },
  { id: 'funnel-chart', category: ['distribution'], render: () => <FunnelChart data={funnelData} /> },
  { id: 'gauge-chart', category: ['circular'], render: () => <GaugeChart data={gaugeData} /> },
  { id: 'heatmap', category: ['distribution'], render: () => <HeatmapChart data={heatmapData} /> },
  { id: 'treemap', category: ['distribution'], render: () => <TreemapChart data={treemapData} /> },
  { id: 'candlestick', category: ['analytical'], render: () => <CandlestickChart data={candlestickData} /> },
  { id: 'waterfall', category: ['analytical'], render: () => <WaterfallChart data={waterfallData} /> },
  { id: 'progress-bars', category: ['utility'], render: () => <ProgressBars data={progressData} /> },
  { id: 'status-tracker', category: ['utility'], render: () => <StatusTracker data={statusData} /> },
  { id: 'waffle', category: ['distribution'], render: () => <WaffleChart data={pieData} /> },
  { id: 'cohort', category: ['analytical'], render: () => <CohortTable data={cohortData} /> },
  { id: 'sparkline-grid', category: ['utility'], render: () => <SparklineGrid data={sparklineData} /> },
  { id: 'radial-progress', category: ['circular'], render: () => <RadialProgress /> },
  { id: 'semi-circle-gauge', category: ['circular'], render: () => <SemiCircleGauge /> },
  { id: 'nested-donut', category: ['circular'], render: () => <NestedDonut /> },
  { id: 'time-series', category: ['line'], render: () => <TimeSeriesChart data={timeSeriesData} /> },
  { id: 'data-table', category: ['utility'], render: () => <DataTable data={productSales} /> },
  { id: 'comparison-radar', category: ['analytical'], render: () => <ComparisonRadar data={comparisonData} /> },
  { id: 'histogram', category: ['distribution'], render: () => <HistogramChart data={distributionData} /> },
  { id: 'step-line', category: ['line'], render: () => <StepLineChart data={stepData} /> },
  { id: 'diverging-bar', category: ['bar'], render: () => <DivergingBarChart data={divergingData} /> },
  { id: 'bubble-chart', category: ['scatter'], render: () => <BubbleChart data={bubbleData} /> },
  { id: 'mini-bar', category: ['bar'], render: () => <MiniBarChart data={monthlyRevenue} /> },
  { id: 'dot-plot', category: ['analytical'], render: () => <DotPlot data={horizontalBarData} /> },
  { id: 'sankey', category: ['custom'], render: () => <SankeyDiagram data={sankey} /> },
  { id: 'activity-calendar', category: ['custom'], render: () => <ActivityCalendar /> },
  { id: 'box-plot', category: ['distribution'], render: () => <BoxPlot /> },
  { id: 'bullet-chart', category: ['analytical'], render: () => <BulletChart /> },
  { id: 'gradient-donut', category: ['circular'], render: () => <GradientDonut /> },
  { id: 'parallel-coords', category: ['custom'], render: () => <ParallelCoordinates /> },
  { id: 'violin-plot', category: ['distribution'], render: () => <ViolinPlot /> },
  { id: 'stream-graph', category: ['line'], render: () => <StreamGraph data={stackedData} /> },
  { id: 'polar-area', category: ['circular'], render: () => <PolarAreaChart /> },
  { id: 'area-spline', category: ['line'], render: () => <AreaSpline data={monthlyRevenue} /> },
  { id: 'range-bar', category: ['custom'], render: () => <RangeBar /> },
  { id: 'mixed-chart', category: ['custom'], render: () => <MixedChart data={monthlyRevenue} /> },
  { id: 'number-ticker', category: ['utility'], render: () => <NumberTicker /> },
  { id: 'loading-skeleton', category: ['utility'], render: () => <LoadingSkeleton /> },
  { id: 'growth-bar', category: ['bar'], render: () => <GrowthBar data={productSales} /> },
  { id: 'annotated-line', category: ['line'], render: () => <AnnotatedLine data={monthlyRevenue} /> },
  { id: 'percentage-bar', category: ['distribution'], render: () => <PercentageBar data={pieData} /> },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = charts.filter(c => {
    const matchCat = activeCategory === 'all' || c.category.includes(activeCategory);
    const matchSearch = !searchQuery || c.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Hero */}
      <header className="relative overflow-hidden border-b border-[#1e293b]/50">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
            <Sparkles size={14} className="text-indigo-400" />
            <span className="text-indigo-300 text-xs font-medium">50+ Premium Components</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Signum <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">UI</span>
          </h1>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Signal-grade data visualization for the modern web. Premium chart components
            built for dashboards, analytics, AI agents, and real-time data pipelines.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111827] border border-[#1e293b] text-gray-400 text-sm font-mono">
              <span className="text-indigo-400">$</span> npm install @signum-ui/core
            </div>
          </div>
          <div className="flex justify-center gap-8 mt-8 text-sm">
            <div className="text-center">
              <p className="text-white font-bold text-xl">50+</p>
              <p className="text-gray-500 text-xs">Components</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-xl">&lt;48KB</p>
              <p className="text-gray-500 text-xs">Gzipped</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-xl">9</p>
              <p className="text-gray-500 text-xs">Categories</p>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-xl">A11y</p>
              <p className="text-gray-500 text-xs">Accessible</p>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur-xl border-b border-[#1e293b]/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:w-64 shrink-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0a0f1a] border border-[#1e293b] text-white text-sm placeholder-gray-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2 flex-1">
              {categories.map(cat => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                        : 'bg-[#0a0f1a] text-gray-400 border border-[#1e293b] hover:border-[#334155] hover:text-gray-300'
                    }`}
                  >
                    <Icon size={12} />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Count badge */}
            <div className="text-xs text-gray-500 shrink-0">
              {filtered.length} component{filtered.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(chart => (
            <div key={chart.id}>
              {chart.render()}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No components match your search.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="mt-3 text-indigo-400 text-sm hover:underline cursor-pointer">
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e293b]/50 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">Signum UI</span>
            <span className="text-gray-600 text-xs">v1.0.0</span>
          </div>
          <p className="text-gray-600 text-xs">Signal-grade visualization for the AI-native web. MIT License.</p>
        </div>
      </footer>
    </div>
  );
}
