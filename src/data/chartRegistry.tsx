import {
  monthlyRevenue, weeklyTraffic, productSales, marketShare, quarterlyData,
  userGrowth, scatterData, heatmapData, funnelData, radarData,
  waterfallData, treemapData, candlestickData, sankey, kpiData,
  gaugeData, timeSeriesData, cohortData, stackedData, divergingData,
  bubbleData, progressData, pieData, horizontalBarData, multiLineData,
  sparklineData, areaComparisonData, distributionData, statusData,
  comparisonData, stepData,
} from './sampleData';

import AreaChart from '../components/charts/AreaChart';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import DonutChart from '../components/charts/DonutChart';
import PieChartComp from '../components/charts/PieChart';
import StackedAreaChart from '../components/charts/StackedAreaChart';
import StackedBarChart from '../components/charts/StackedBarChart';
import GroupedBarChart from '../components/charts/GroupedBarChart';
import HorizontalBarChart from '../components/charts/HorizontalBarChart';
import ScatterPlot from '../components/charts/ScatterPlot';
import RadarChart from '../components/charts/RadarChart';
import MultiLineChart from '../components/charts/MultiLineChart';
import AreaComparisonChart from '../components/charts/AreaComparisonChart';
import StepLineChart from '../components/charts/StepLineChart';
import DivergingBarChart from '../components/charts/DivergingBarChart';
import BubbleChart from '../components/charts/BubbleChart';
import UserGrowthChart from '../components/charts/UserGrowthChart';
import RevenueExpenseChart from '../components/charts/RevenueExpenseChart';
import KPICard from '../components/charts/KPICard';
import FunnelChart from '../components/charts/FunnelChart';
import GaugeChart from '../components/charts/GaugeChart';
import ProgressBars from '../components/charts/ProgressBars';
import StatusTracker from '../components/charts/StatusTracker';
import WaffleChart from '../components/charts/WaffleChart';
import HeatmapChart from '../components/charts/HeatmapChart';
import TreemapChart from '../components/charts/TreemapChart';
import CandlestickChart from '../components/charts/CandlestickChart';
import WaterfallChart from '../components/charts/WaterfallChart';
import CohortTable from '../components/charts/CohortTable';
import SparklineGrid from '../components/charts/SparklineGrid';
import RadialProgress from '../components/charts/RadialProgress';
import SemiCircleGauge from '../components/charts/SemiCircleGauge';
import NestedDonut from '../components/charts/NestedDonut';
import TimeSeriesChart from '../components/charts/TimeSeriesChart';
import MetricCards from '../components/charts/MetricCards';
import DataTable from '../components/charts/DataTable';
import ComparisonRadar from '../components/charts/ComparisonRadar';
import HistogramChart from '../components/charts/HistogramChart';
import GradientLineChart from '../components/charts/GradientLineChart';
import MiniBarChart from '../components/charts/MiniBarChart';
import DotPlot from '../components/charts/DotPlot';
import SankeyDiagram from '../components/charts/SankeyDiagram';
import ActivityCalendar from '../components/charts/ActivityCalendar';
import BoxPlot from '../components/charts/BoxPlot';
import BulletChart from '../components/charts/BulletChart';
import GradientDonut from '../components/charts/GradientDonut';
import ParallelCoordinates from '../components/charts/ParallelCoordinates';
import ViolinPlot from '../components/charts/ViolinPlot';
import StreamGraph from '../components/charts/StreamGraph';
import PolarAreaChart from '../components/charts/PolarAreaChart';
import AreaSpline from '../components/charts/AreaSpline';
import RangeBar from '../components/charts/RangeBar';
import MixedChart from '../components/charts/MixedChart';
import NumberTicker from '../components/charts/NumberTicker';
import LoadingSkeleton from '../components/charts/LoadingSkeleton';
import GrowthBar from '../components/charts/GrowthBar';
import AnnotatedLine from '../components/charts/AnnotatedLine';
import PercentageBar from '../components/charts/PercentageBar';

export type Category = 'all' | 'line' | 'bar' | 'circular' | 'scatter' | 'analytical' | 'utility' | 'distribution' | 'custom';

export interface ChartDef {
  id: string;
  name: string;
  description: string;
  category: Category[];
  render: () => React.ReactNode;
  code: string;
}

export const charts: ChartDef[] = [
  { id: 'kpi-cards', name: 'KPI Cards', description: 'Key performance indicator cards with sparklines and trend badges', category: ['utility'], render: () => <KPICard data={kpiData} />, code: `<KPICard data={[\n  { title: 'Revenue', value: '$84.2K', change: 12.5,\n    trend: [28, 32, 35, 30, 38, 42, 48, 52] },\n  { title: 'Users', value: '32,847', change: 8.2,\n    trend: [120, 145, 152, 168, 175, 192, 198, 215] },\n]} />` },
  { id: 'metric-cards', name: 'Metric Cards', description: 'Icon-driven metric display cards with descriptions', category: ['utility'], render: () => <MetricCards />, code: `<MetricCards />` },
  { id: 'area-chart', name: 'Area Chart', description: 'Smooth area chart with gradient fill for trend visualization', category: ['line'], render: () => <AreaChart data={monthlyRevenue} />, code: `<AreaChart data={[\n  { month: 'Jan', revenue: 4200 },\n  { month: 'Feb', revenue: 4800 },\n  { month: 'Mar', revenue: 5100 },\n]} />` },
  { id: 'line-chart', name: 'Line Chart', description: 'Multi-series line chart for comparing trends', category: ['line'], render: () => <LineChart data={weeklyTraffic} />, code: `<LineChart data={[\n  { day: 'Mon', visitors: 1200, pageViews: 3400 },\n  { day: 'Tue', visitors: 1400, pageViews: 4100 },\n]} />` },
  { id: 'bar-chart', name: 'Bar Chart', description: 'Vertical bar chart with rounded corners for categorical data', category: ['bar'], render: () => <BarChart data={productSales} />, code: `<BarChart data={[\n  { product: 'Electronics', sales: 42000 },\n  { product: 'Clothing', sales: 35000 },\n]} />` },
  { id: 'donut-chart', name: 'Donut Chart', description: 'Donut chart with interactive segments and legend', category: ['circular'], render: () => <DonutChart data={marketShare} />, code: `<DonutChart data={[\n  { name: 'Chrome', value: 64.8 },\n  { name: 'Safari', value: 18.7 },\n]} />` },
  { id: 'stacked-area', name: 'Stacked Area', description: 'Stacked area chart showing composition over time', category: ['line'], render: () => <StackedAreaChart data={stackedData} />, code: `<StackedAreaChart data={[\n  { month: 'Jan', mobile: 2400, desktop: 3800, tablet: 1200 },\n]} />` },
  { id: 'grouped-bar', name: 'Grouped Bar', description: 'Grouped bar chart for side-by-side comparisons', category: ['bar'], render: () => <GroupedBarChart data={quarterlyData} />, code: `<GroupedBarChart data={[\n  { quarter: 'Q1', actual: 12400, forecast: 11800, target: 13000 },\n]} />` },
  { id: 'multi-line', name: 'Multi-Line', description: 'Three-series line chart for trend comparison', category: ['line'], render: () => <MultiLineChart data={multiLineData} />, code: `<MultiLineChart data={[\n  { day: 'Day 1', series1: 50, series2: 40, series3: 60 },\n]} />` },
  { id: 'gradient-line', name: 'Gradient Area', description: 'Area chart with purple gradient and smooth interpolation', category: ['line'], render: () => <GradientLineChart data={userGrowth} />, code: `<GradientLineChart data={[\n  { month: 'Jan', users: 12000 },\n]} />` },
  { id: 'pie-chart', name: 'Pie Chart', description: 'Classic pie chart with percentage labels', category: ['circular'], render: () => <PieChartComp data={pieData} />, code: `<PieChart data={[\n  { name: 'Desktop', value: 45.2 },\n  { name: 'Mobile', value: 32.8 },\n]} />` },
  { id: 'radar-chart', name: 'Radar Chart', description: 'Multi-axis radar for dimensional comparison', category: ['analytical'], render: () => <RadarChart data={radarData} />, code: `<RadarChart data={[\n  { metric: 'Speed', A: 85, B: 72, fullMark: 100 },\n]} />` },
  { id: 'horizontal-bar', name: 'Horizontal Bar', description: 'Horizontal bar chart ideal for rankings', category: ['bar'], render: () => <HorizontalBarChart data={horizontalBarData} />, code: `<HorizontalBarChart data={[\n  { name: 'TypeScript', value: 89 },\n  { name: 'Python', value: 82 },\n]} />` },
  { id: 'scatter-plot', name: 'Scatter Plot', description: 'Multi-category scatter plot with size encoding', category: ['scatter'], render: () => <ScatterPlot data={scatterData} />, code: `<ScatterPlot data={[\n  { x: 45, y: 72, z: 800, category: 'A' },\n]} />` },
  { id: 'stacked-bar', name: 'Stacked Bar', description: 'Stacked bar chart showing part-to-whole', category: ['bar'], render: () => <StackedBarChart data={stackedData} />, code: `<StackedBarChart data={[\n  { month: 'Jan', mobile: 2400, desktop: 3800, tablet: 1200 },\n]} />` },
  { id: 'area-comparison', name: 'YoY Comparison', description: 'Year-over-year area comparison with dashed baseline', category: ['line'], render: () => <AreaComparisonChart data={areaComparisonData} />, code: `<AreaComparisonChart data={[\n  { month: 'Jan', thisYear: 4200, lastYear: 3800 },\n]} />` },
  { id: 'user-growth', name: 'User Growth', description: 'Dual-area chart for total vs active users', category: ['line'], render: () => <UserGrowthChart data={userGrowth} />, code: `<UserGrowthChart data={[\n  { month: 'Jan', users: 12000, active: 8400 },\n]} />` },
  { id: 'revenue-expense', name: 'Revenue & Expense', description: 'Combo chart with bars and profit line overlay', category: ['bar'], render: () => <RevenueExpenseChart data={monthlyRevenue} />, code: `<RevenueExpenseChart data={[\n  { month: 'Jan', revenue: 4200, expenses: 2400, profit: 1800 },\n]} />` },
  { id: 'funnel-chart', name: 'Funnel Chart', description: 'Conversion funnel with stage-by-stage metrics', category: ['distribution'], render: () => <FunnelChart data={funnelData} />, code: `<FunnelChart data={[\n  { stage: 'Visitors', value: 12500 },\n  { stage: 'Sign Ups', value: 8200 },\n]} />` },
  { id: 'gauge-chart', name: 'Gauge Chart', description: 'Arc-style gauges for system health metrics', category: ['circular'], render: () => <GaugeChart data={gaugeData} />, code: `<GaugeChart data={[\n  { label: 'CPU', value: 72, max: 100 },\n]} />` },
  { id: 'heatmap', name: 'Heatmap', description: 'Activity heatmap grid with color intensity', category: ['distribution'], render: () => <HeatmapChart data={heatmapData} />, code: `<HeatmapChart data={[\n  { hour: '9:00', day: 'Mon', value: 85 },\n]} />` },
  { id: 'treemap', name: 'Treemap', description: 'Hierarchical treemap for proportional display', category: ['distribution'], render: () => <TreemapChart data={treemapData} />, code: `<TreemapChart data={[\n  { name: 'Technology', size: 4500, children: [...] },\n]} />` },
  { id: 'candlestick', name: 'Candlestick', description: 'OHLC candlestick chart for financial data', category: ['analytical'], render: () => <CandlestickChart data={candlestickData} />, code: `<CandlestickChart data={[\n  { date: 'Mar 1', open: 142.5, high: 148.2,\n    low: 141.0, close: 147.8, volume: 32000000 },\n]} />` },
  { id: 'waterfall', name: 'Waterfall', description: 'P&L waterfall showing running total breakdown', category: ['analytical'], render: () => <WaterfallChart data={waterfallData} />, code: `<WaterfallChart data={[\n  { name: 'Revenue', value: 42000 },\n  { name: 'COGS', value: -18000 },\n]} />` },
  { id: 'progress-bars', name: 'Progress Bars', description: 'Colored progress bars with percentage labels', category: ['utility'], render: () => <ProgressBars data={progressData} />, code: `<ProgressBars data={[\n  { label: 'Design System', progress: 85 },\n]} />` },
  { id: 'status-tracker', name: 'Status Tracker', description: 'Service health monitor with uptime badges', category: ['utility'], render: () => <StatusTracker data={statusData} />, code: `<StatusTracker data={[\n  { service: 'API Gateway', status: 'operational', uptime: 99.98 },\n]} />` },
  { id: 'waffle', name: 'Waffle Chart', description: 'Grid-based proportional waffle chart', category: ['distribution'], render: () => <WaffleChart data={pieData} />, code: `<WaffleChart data={[\n  { name: 'Desktop', value: 45.2 },\n]} />` },
  { id: 'cohort', name: 'Cohort Table', description: 'Retention cohort analysis heatmap table', category: ['analytical'], render: () => <CohortTable data={cohortData} />, code: `<CohortTable data={[\n  { cohort: 'Jan', w1: 100, w2: 82, w3: 68, w4: 55 },\n]} />` },
  { id: 'sparkline-grid', name: 'Sparkline Grid', description: 'Compact sparkline micro-charts in grid layout', category: ['utility'], render: () => <SparklineGrid data={sparklineData} />, code: `<SparklineGrid data={{\n  revenue: [28, 32, 35, 30, 38, 42],\n  users: [120, 145, 152, 168, 175, 192],\n}} />` },
  { id: 'radial-progress', name: 'Radial Progress', description: 'Circular progress indicators for sprint tracking', category: ['circular'], render: () => <RadialProgress />, code: `<RadialProgress />` },
  { id: 'semi-circle-gauge', name: 'Semi-Circle Gauge', description: 'Half-circle performance score gauge', category: ['circular'], render: () => <SemiCircleGauge />, code: `<SemiCircleGauge />` },
  { id: 'nested-donut', name: 'Nested Donut', description: 'Multi-ring nested donut chart', category: ['circular'], render: () => <NestedDonut />, code: `<NestedDonut />` },
  { id: 'time-series', name: 'Time Series', description: 'Actual vs predicted time series forecast', category: ['line'], render: () => <TimeSeriesChart data={timeSeriesData} />, code: `<TimeSeriesChart data={[\n  { date: 'Jan 1', value: 1200, predicted: 1250 },\n]} />` },
  { id: 'data-table', name: 'Data Table', description: 'Clean data grid with sortable columns', category: ['utility'], render: () => <DataTable data={productSales} />, code: `<DataTable data={[\n  { product: 'Electronics', sales: 42000, growth: 12.5 },\n]} />` },
  { id: 'comparison-radar', name: 'Comparison Radar', description: 'Us vs competitor feature radar chart', category: ['analytical'], render: () => <ComparisonRadar data={comparisonData} />, code: `<ComparisonRadar data={[\n  { feature: 'Performance', ours: 95, competitor: 78 },\n]} />` },
  { id: 'histogram', name: 'Histogram', description: 'Frequency distribution histogram', category: ['distribution'], render: () => <HistogramChart data={distributionData} />, code: `<HistogramChart data={[\n  { value: 42 }, { value: 55 }, { value: 38 },\n]} />` },
  { id: 'step-line', name: 'Step Line', description: 'Step function chart for pricing tiers', category: ['line'], render: () => <StepLineChart data={stepData} />, code: `<StepLineChart data={[\n  { date: 'Week 1', value: 120 },\n]} />` },
  { id: 'diverging-bar', name: 'Diverging Bar', description: 'Positive/negative diverging bar chart', category: ['bar'], render: () => <DivergingBarChart data={divergingData} />, code: `<DivergingBarChart data={[\n  { category: 'Product A', positive: 42, negative: -18 },\n]} />` },
  { id: 'bubble-chart', name: 'Bubble Chart', description: 'Multi-category bubble chart with size encoding', category: ['scatter'], render: () => <BubbleChart data={bubbleData} />, code: `<BubbleChart data={[\n  { x: 50, y: 70, z: 1500, category: 'Tech' },\n]} />` },
  { id: 'mini-bar', name: 'Mini Bar', description: 'Compact inline bar chart for snapshots', category: ['bar'], render: () => <MiniBarChart data={monthlyRevenue} />, code: `<MiniBarChart data={[\n  { month: 'Jan', revenue: 4200 },\n]} />` },
  { id: 'dot-plot', name: 'Dot Plot', description: 'Lollipop-style ranking dot plot', category: ['analytical'], render: () => <DotPlot data={horizontalBarData} />, code: `<DotPlot data={[\n  { name: 'TypeScript', value: 89 },\n]} />` },
  { id: 'sankey', name: 'Sankey Diagram', description: 'Flow diagram showing user journey paths', category: ['custom'], render: () => <SankeyDiagram data={sankey} />, code: `<SankeyDiagram data={{\n  nodes: ['Organic', 'Paid', 'Landing', 'Sign Up'],\n  links: [{ source: 0, target: 2, value: 3200 }],\n}} />` },
  { id: 'activity-calendar', name: 'Activity Calendar', description: 'GitHub-style contribution calendar', category: ['custom'], render: () => <ActivityCalendar />, code: `<ActivityCalendar />` },
  { id: 'box-plot', name: 'Box Plot', description: 'Statistical box-and-whisker plot', category: ['distribution'], render: () => <BoxPlot />, code: `<BoxPlot />` },
  { id: 'bullet-chart', name: 'Bullet Chart', description: 'Performance bullet charts vs targets', category: ['analytical'], render: () => <BulletChart />, code: `<BulletChart />` },
  { id: 'gradient-donut', name: 'Gradient Donut', description: 'Single-value gradient ring progress', category: ['circular'], render: () => <GradientDonut />, code: `<GradientDonut />` },
  { id: 'parallel-coords', name: 'Parallel Coordinates', description: 'Multi-dimensional parallel coordinates plot', category: ['custom'], render: () => <ParallelCoordinates />, code: `<ParallelCoordinates />` },
  { id: 'violin-plot', name: 'Violin Plot', description: 'Distribution shape comparison violins', category: ['distribution'], render: () => <ViolinPlot />, code: `<ViolinPlot />` },
  { id: 'stream-graph', name: 'Stream Graph', description: 'Organic flowing stream visualization', category: ['line'], render: () => <StreamGraph data={stackedData} />, code: `<StreamGraph data={[\n  { month: 'Jan', mobile: 2400, desktop: 3800, tablet: 1200 },\n]} />` },
  { id: 'polar-area', name: 'Polar Area', description: 'Department performance polar chart', category: ['circular'], render: () => <PolarAreaChart />, code: `<PolarAreaChart />` },
  { id: 'area-spline', name: 'Spline Area', description: 'Natural cubic spline interpolation area', category: ['line'], render: () => <AreaSpline data={monthlyRevenue} />, code: `<AreaSpline data={[\n  { month: 'Jan', revenue: 4200 },\n]} />` },
  { id: 'range-bar', name: 'Range Bar', description: 'Min-max range bars for temperature data', category: ['custom'], render: () => <RangeBar />, code: `<RangeBar />` },
  { id: 'mixed-chart', name: 'Mixed Chart', description: 'Combined area, bar, and line visualization', category: ['custom'], render: () => <MixedChart data={monthlyRevenue} />, code: `<MixedChart data={[\n  { month: 'Jan', revenue: 4200, expenses: 2400, profit: 1800 },\n]} />` },
  { id: 'number-ticker', name: 'Number Ticker', description: 'Animated counting number tickers', category: ['utility'], render: () => <NumberTicker />, code: `<NumberTicker />` },
  { id: 'loading-skeleton', name: 'Loading Skeleton', description: 'Shimmer placeholder loading state', category: ['utility'], render: () => <LoadingSkeleton />, code: `<LoadingSkeleton />` },
  { id: 'growth-bar', name: 'Growth Indicators', description: 'Progress bars with growth rate badges', category: ['bar'], render: () => <GrowthBar data={productSales} />, code: `<GrowthBar data={[\n  { product: 'Electronics', sales: 42000, growth: 12.5 },\n]} />` },
  { id: 'annotated-line', name: 'Annotated Line', description: 'Line chart with reference lines and markers', category: ['line'], render: () => <AnnotatedLine data={monthlyRevenue} />, code: `<AnnotatedLine data={[\n  { month: 'Jan', revenue: 4200 },\n]} />` },
  { id: 'percentage-bar', name: 'Percentage Bar', description: '100% stacked segment bar with legend', category: ['distribution'], render: () => <PercentageBar data={pieData} />, code: `<PercentageBar data={[\n  { name: 'Desktop', value: 45.2 },\n]} />` },
];
