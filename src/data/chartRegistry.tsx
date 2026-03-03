import React from "react";

export type Category =
  | "Lines & Areas"
  | "Bars & Columns"
  | "Pies & Radials"
  | "Statistical"
  | "Custom & Specialty"
  | "Data Display"
  | "KPI & Metrics";

export interface ChartEntry {
  id: string;
  name: string;
  description: string;
  category: Category;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  dataKey: string | null;
}

// ── Lines & Areas ──────────────────────────────────────────────────────────────
const LineChart = React.lazy(() => import("../components/charts/LineChart"));
const AreaChart = React.lazy(() => import("../components/charts/AreaChart"));
const MultiLineChart = React.lazy(() => import("../components/charts/MultiLineChart"));
const AreaComparisonChart = React.lazy(() => import("../components/charts/AreaComparisonChart"));
const StepLineChart = React.lazy(() => import("../components/charts/StepLineChart"));
const AreaSpline = React.lazy(() => import("../components/charts/AreaSpline"));
const AnnotatedLine = React.lazy(() => import("../components/charts/AnnotatedLine"));
const GradientLineChart = React.lazy(() => import("../components/charts/GradientLineChart"));
const StreamGraph = React.lazy(() => import("../components/charts/StreamGraph"));
const TimeSeriesChart = React.lazy(() => import("../components/charts/TimeSeriesChart"));

// ── Bars & Columns ────────────────────────────────────────────────────────────
const BarChart = React.lazy(() => import("../components/charts/BarChart"));
const StackedBarChart = React.lazy(() => import("../components/charts/StackedBarChart"));
const GroupedBarChart = React.lazy(() => import("../components/charts/GroupedBarChart"));
const HorizontalBarChart = React.lazy(() => import("../components/charts/HorizontalBarChart"));
const DivergingBarChart = React.lazy(() => import("../components/charts/DivergingBarChart"));
const MiniBarChart = React.lazy(() => import("../components/charts/MiniBarChart"));
const GrowthBar = React.lazy(() => import("../components/charts/GrowthBar"));
const RangeBar = React.lazy(() => import("../components/charts/RangeBar"));
const WaterfallChart = React.lazy(() => import("../components/charts/WaterfallChart"));
const HistogramChart = React.lazy(() => import("../components/charts/HistogramChart"));

// ── Pies & Radials ────────────────────────────────────────────────────────────
const PieChart = React.lazy(() => import("../components/charts/PieChart"));
const DonutChart = React.lazy(() => import("../components/charts/DonutChart"));
const NestedDonut = React.lazy(() => import("../components/charts/NestedDonut"));
const GradientDonut = React.lazy(() => import("../components/charts/GradientDonut"));
const RadialProgress = React.lazy(() => import("../components/charts/RadialProgress"));
const SemiCircleGauge = React.lazy(() => import("../components/charts/SemiCircleGauge"));
const PolarAreaChart = React.lazy(() => import("../components/charts/PolarAreaChart"));

// ── Statistical ───────────────────────────────────────────────────────────────
const ScatterPlot = React.lazy(() => import("../components/charts/ScatterPlot"));
const BubbleChart = React.lazy(() => import("../components/charts/BubbleChart"));
const RadarChart = React.lazy(() => import("../components/charts/RadarChart"));
const ComparisonRadar = React.lazy(() => import("../components/charts/ComparisonRadar"));
const BoxPlot = React.lazy(() => import("../components/charts/BoxPlot"));
const ViolinPlot = React.lazy(() => import("../components/charts/ViolinPlot"));
const ParallelCoordinates = React.lazy(() => import("../components/charts/ParallelCoordinates"));

// ── Custom & Specialty ────────────────────────────────────────────────────────
const HeatmapChart = React.lazy(() => import("../components/charts/HeatmapChart"));
const TreemapChart = React.lazy(() => import("../components/charts/TreemapChart"));
const CandlestickChart = React.lazy(() => import("../components/charts/CandlestickChart"));
const SankeyDiagram = React.lazy(() => import("../components/charts/SankeyDiagram"));
const FunnelChart = React.lazy(() => import("../components/charts/FunnelChart"));
const WaffleChart = React.lazy(() => import("../components/charts/WaffleChart"));
const CohortTable = React.lazy(() => import("../components/charts/CohortTable"));
const BulletChart = React.lazy(() => import("../components/charts/BulletChart"));
const ActivityCalendar = React.lazy(() => import("../components/charts/ActivityCalendar"));

// ── Data Display ──────────────────────────────────────────────────────────────
const DataTable = React.lazy(() => import("../components/charts/DataTable"));
const SparklineGrid = React.lazy(() => import("../components/charts/SparklineGrid"));
const StatusTracker = React.lazy(() => import("../components/charts/StatusTracker"));
const ProgressBars = React.lazy(() => import("../components/charts/ProgressBars"));
const PercentageBar = React.lazy(() => import("../components/charts/PercentageBar"));
const DotPlot = React.lazy(() => import("../components/charts/DotPlot"));
const LoadingSkeleton = React.lazy(() => import("../components/charts/LoadingSkeleton"));

// ── KPI & Metrics ─────────────────────────────────────────────────────────────
const KPICard = React.lazy(() => import("../components/charts/KPICard"));
const MetricCards = React.lazy(() => import("../components/charts/MetricCards"));
const GaugeChart = React.lazy(() => import("../components/charts/GaugeChart"));
const NumberTicker = React.lazy(() => import("../components/charts/NumberTicker"));
const UserGrowthChart = React.lazy(() => import("../components/charts/UserGrowthChart"));
const RevenueExpenseChart = React.lazy(() => import("../components/charts/RevenueExpenseChart"));
const MixedChart = React.lazy(() => import("../components/charts/MixedChart"));
const StackedAreaChart = React.lazy(() => import("../components/charts/StackedAreaChart"));

// ── Registry ──────────────────────────────────────────────────────────────────

export const chartRegistry: ChartEntry[] = [
  // ── Lines & Areas ─────────────────────────────────────────────────────────
  {
    id: "line-chart",
    name: "Line Chart",
    description: "Basic line chart for tracking trends over time.",
    category: "Lines & Areas",
    component: LineChart,
    dataKey: "monthlyRevenue",
  },
  {
    id: "area-chart",
    name: "Area Chart",
    description: "Filled area chart emphasizing volume beneath a trend line.",
    category: "Lines & Areas",
    component: AreaChart,
    dataKey: "monthlyRevenue",
  },
  {
    id: "multi-line-chart",
    name: "Multi-Line Chart",
    description: "Multiple series plotted on the same axes for direct comparison.",
    category: "Lines & Areas",
    component: MultiLineChart,
    dataKey: "multiLineData",
  },
  {
    id: "area-comparison-chart",
    name: "Area Comparison Chart",
    description: "Side-by-side filled areas comparing two related data series.",
    category: "Lines & Areas",
    component: AreaComparisonChart,
    dataKey: "areaComparisonData",
  },
  {
    id: "step-line-chart",
    name: "Step Line Chart",
    description: "Discrete step transitions between data points.",
    category: "Lines & Areas",
    component: StepLineChart,
    dataKey: "stepData",
  },
  {
    id: "area-spline",
    name: "Area Spline",
    description: "Smooth spline-interpolated area chart.",
    category: "Lines & Areas",
    component: AreaSpline,
    dataKey: "monthlyRevenue",
  },
  {
    id: "annotated-line",
    name: "Annotated Line",
    description: "Line chart with contextual annotations highlighting key events.",
    category: "Lines & Areas",
    component: AnnotatedLine,
    dataKey: "monthlyRevenue",
  },
  {
    id: "gradient-line-chart",
    name: "Gradient Line Chart",
    description: "Line chart with a gradient stroke for visual emphasis.",
    category: "Lines & Areas",
    component: GradientLineChart,
    dataKey: "monthlyRevenue",
  },
  {
    id: "stream-graph",
    name: "Stream Graph",
    description: "Organic stacked stream visualization for compositional change over time.",
    category: "Lines & Areas",
    component: StreamGraph,
    dataKey: "stackedData",
  },
  {
    id: "time-series-chart",
    name: "Time Series Chart",
    description: "Time-indexed line chart with date-aware axis formatting.",
    category: "Lines & Areas",
    component: TimeSeriesChart,
    dataKey: "timeSeriesData",
  },

  // ── Bars & Columns ────────────────────────────────────────────────────────
  {
    id: "bar-chart",
    name: "Bar Chart",
    description: "Vertical bar chart for comparing categorical values.",
    category: "Bars & Columns",
    component: BarChart,
    dataKey: "monthlyRevenue",
  },
  {
    id: "stacked-bar-chart",
    name: "Stacked Bar Chart",
    description: "Bars subdivided into segments showing part-to-whole relationships.",
    category: "Bars & Columns",
    component: StackedBarChart,
    dataKey: "stackedData",
  },
  {
    id: "grouped-bar-chart",
    name: "Grouped Bar Chart",
    description: "Bars placed side by side for direct category comparison.",
    category: "Bars & Columns",
    component: GroupedBarChart,
    dataKey: "stackedData",
  },
  {
    id: "horizontal-bar-chart",
    name: "Horizontal Bar Chart",
    description: "Bars oriented horizontally, ideal for long category labels.",
    category: "Bars & Columns",
    component: HorizontalBarChart,
    dataKey: "horizontalBarData",
  },
  {
    id: "diverging-bar-chart",
    name: "Diverging Bar Chart",
    description: "Bars extending in both directions from a central baseline.",
    category: "Bars & Columns",
    component: DivergingBarChart,
    dataKey: "divergingData",
  },
  {
    id: "mini-bar-chart",
    name: "Mini Bar Chart",
    description: "Compact bar chart suited for dashboards and small spaces.",
    category: "Bars & Columns",
    component: MiniBarChart,
    dataKey: "monthlyRevenue",
  },
  {
    id: "growth-bar",
    name: "Growth Bar",
    description: "Bar chart highlighting period-over-period growth rates.",
    category: "Bars & Columns",
    component: GrowthBar,
    dataKey: "productSales",
  },
  {
    id: "range-bar",
    name: "Range Bar",
    description: "Bars spanning a range between minimum and maximum values.",
    category: "Bars & Columns",
    component: RangeBar,
    dataKey: null,
  },
  {
    id: "waterfall-chart",
    name: "Waterfall Chart",
    description: "Sequential positive and negative contributions to a running total.",
    category: "Bars & Columns",
    component: WaterfallChart,
    dataKey: "waterfallData",
  },
  {
    id: "histogram-chart",
    name: "Histogram Chart",
    description: "Frequency distribution of continuous data across bins.",
    category: "Bars & Columns",
    component: HistogramChart,
    dataKey: "distributionData",
  },

  // ── Pies & Radials ────────────────────────────────────────────────────────
  {
    id: "pie-chart",
    name: "Pie Chart",
    description: "Classic circular chart showing proportional composition.",
    category: "Pies & Radials",
    component: PieChart,
    dataKey: "pieData",
  },
  {
    id: "donut-chart",
    name: "Donut Chart",
    description: "Pie chart with a hollow center for added context or metrics.",
    category: "Pies & Radials",
    component: DonutChart,
    dataKey: "marketShare",
  },
  {
    id: "nested-donut",
    name: "Nested Donut",
    description: "Concentric donut rings comparing hierarchical categories.",
    category: "Pies & Radials",
    component: NestedDonut,
    dataKey: null,
  },
  {
    id: "gradient-donut",
    name: "Gradient Donut",
    description: "Donut chart with smooth gradient fills for visual polish.",
    category: "Pies & Radials",
    component: GradientDonut,
    dataKey: null,
  },
  {
    id: "radial-progress",
    name: "Radial Progress",
    description: "Circular progress indicator for goal or completion tracking.",
    category: "Pies & Radials",
    component: RadialProgress,
    dataKey: null,
  },
  {
    id: "semi-circle-gauge",
    name: "Semi-Circle Gauge",
    description: "Half-circle gauge displaying a single metric against a target.",
    category: "Pies & Radials",
    component: SemiCircleGauge,
    dataKey: null,
  },
  {
    id: "polar-area-chart",
    name: "Polar Area Chart",
    description: "Radial segments with varying radius to encode magnitude.",
    category: "Pies & Radials",
    component: PolarAreaChart,
    dataKey: null,
  },

  // ── Statistical ───────────────────────────────────────────────────────────
  {
    id: "scatter-plot",
    name: "Scatter Plot",
    description: "Two-variable point plot for revealing correlations and clusters.",
    category: "Statistical",
    component: ScatterPlot,
    dataKey: "scatterData",
  },
  {
    id: "bubble-chart",
    name: "Bubble Chart",
    description: "Scatter plot with a third dimension encoded as bubble size.",
    category: "Statistical",
    component: BubbleChart,
    dataKey: "bubbleData",
  },
  {
    id: "radar-chart",
    name: "Radar Chart",
    description: "Multi-axis radial chart for profiling across several dimensions.",
    category: "Statistical",
    component: RadarChart,
    dataKey: "radarData",
  },
  {
    id: "comparison-radar",
    name: "Comparison Radar",
    description: "Overlapping radar polygons for head-to-head comparison.",
    category: "Statistical",
    component: ComparisonRadar,
    dataKey: "comparisonData",
  },
  {
    id: "box-plot",
    name: "Box Plot",
    description: "Five-number summary showing median, quartiles, and outliers.",
    category: "Statistical",
    component: BoxPlot,
    dataKey: null,
  },
  {
    id: "violin-plot",
    name: "Violin Plot",
    description: "Mirrored density curves showing the full distribution shape.",
    category: "Statistical",
    component: ViolinPlot,
    dataKey: null,
  },
  {
    id: "parallel-coordinates",
    name: "Parallel Coordinates",
    description: "Multi-dimensional data plotted across parallel vertical axes.",
    category: "Statistical",
    component: ParallelCoordinates,
    dataKey: null,
  },

  // ── Custom & Specialty ────────────────────────────────────────────────────
  {
    id: "heatmap-chart",
    name: "Heatmap Chart",
    description: "Color-coded matrix for spotting patterns across two dimensions.",
    category: "Custom & Specialty",
    component: HeatmapChart,
    dataKey: "heatmapData",
  },
  {
    id: "treemap-chart",
    name: "Treemap Chart",
    description: "Nested rectangles sized proportionally for hierarchical data.",
    category: "Custom & Specialty",
    component: TreemapChart,
    dataKey: "treemapData",
  },
  {
    id: "candlestick-chart",
    name: "Candlestick Chart",
    description: "Open-high-low-close financial chart for price movements.",
    category: "Custom & Specialty",
    component: CandlestickChart,
    dataKey: "candlestickData",
  },
  {
    id: "sankey-diagram",
    name: "Sankey Diagram",
    description: "Flow diagram showing weighted transfers between nodes.",
    category: "Custom & Specialty",
    component: SankeyDiagram,
    dataKey: "sankey",
  },
  {
    id: "funnel-chart",
    name: "Funnel Chart",
    description: "Tapered stages visualizing progressive drop-off in a pipeline.",
    category: "Custom & Specialty",
    component: FunnelChart,
    dataKey: "funnelData",
  },
  {
    id: "waffle-chart",
    name: "Waffle Chart",
    description: "Grid of squares representing proportional data as filled cells.",
    category: "Custom & Specialty",
    component: WaffleChart,
    dataKey: "pieData",
  },
  {
    id: "cohort-table",
    name: "Cohort Table",
    description: "Retention matrix tracking user cohorts over successive periods.",
    category: "Custom & Specialty",
    component: CohortTable,
    dataKey: "cohortData",
  },
  {
    id: "bullet-chart",
    name: "Bullet Chart",
    description: "Compact chart comparing a primary measure against a target.",
    category: "Custom & Specialty",
    component: BulletChart,
    dataKey: null,
  },
  {
    id: "activity-calendar",
    name: "Activity Calendar",
    description: "GitHub-style calendar heatmap showing daily activity intensity.",
    category: "Custom & Specialty",
    component: ActivityCalendar,
    dataKey: null,
  },

  // ── Data Display ──────────────────────────────────────────────────────────
  {
    id: "data-table",
    name: "Data Table",
    description: "Sortable tabular view of structured data records.",
    category: "Data Display",
    component: DataTable,
    dataKey: "monthlyRevenue",
  },
  {
    id: "sparkline-grid",
    name: "Sparkline Grid",
    description: "Grid of compact inline sparklines for at-a-glance trend overview.",
    category: "Data Display",
    component: SparklineGrid,
    dataKey: null,
  },
  {
    id: "status-tracker",
    name: "Status Tracker",
    description: "Visual indicator panel tracking item statuses across a workflow.",
    category: "Data Display",
    component: StatusTracker,
    dataKey: "statusData",
  },
  {
    id: "progress-bars",
    name: "Progress Bars",
    description: "Horizontal bars indicating completion percentage for multiple items.",
    category: "Data Display",
    component: ProgressBars,
    dataKey: "progressData",
  },
  {
    id: "percentage-bar",
    name: "Percentage Bar",
    description: "Segmented bar showing proportional shares of a total.",
    category: "Data Display",
    component: PercentageBar,
    dataKey: "marketShare",
  },
  {
    id: "dot-plot",
    name: "Dot Plot",
    description: "Dots plotted along an axis for comparing categorical magnitudes.",
    category: "Data Display",
    component: DotPlot,
    dataKey: "horizontalBarData",
  },
  {
    id: "loading-skeleton",
    name: "Loading Skeleton",
    description: "Animated placeholder skeleton shown while chart data loads.",
    category: "Data Display",
    component: LoadingSkeleton,
    dataKey: null,
  },

  // ── KPI & Metrics ─────────────────────────────────────────────────────────
  {
    id: "kpi-card",
    name: "KPI Card",
    description: "Key performance indicator card with value, trend, and context.",
    category: "KPI & Metrics",
    component: KPICard,
    dataKey: "kpiData",
  },
  {
    id: "metric-cards",
    name: "Metric Cards",
    description: "Collection of summary metric cards for dashboard overviews.",
    category: "KPI & Metrics",
    component: MetricCards,
    dataKey: null,
  },
  {
    id: "gauge-chart",
    name: "Gauge Chart",
    description: "Dial-style gauge displaying a value within a defined range.",
    category: "KPI & Metrics",
    component: GaugeChart,
    dataKey: "gaugeData",
  },
  {
    id: "number-ticker",
    name: "Number Ticker",
    description: "Animated number counter that ticks up to a target value.",
    category: "KPI & Metrics",
    component: NumberTicker,
    dataKey: null,
  },
  {
    id: "user-growth-chart",
    name: "User Growth Chart",
    description: "Line and area chart tracking user acquisition over time.",
    category: "KPI & Metrics",
    component: UserGrowthChart,
    dataKey: "userGrowth",
  },
  {
    id: "revenue-expense-chart",
    name: "Revenue & Expense Chart",
    description: "Dual-series chart comparing revenue against expenses.",
    category: "KPI & Metrics",
    component: RevenueExpenseChart,
    dataKey: "monthlyRevenue",
  },
  {
    id: "mixed-chart",
    name: "Mixed Chart",
    description: "Combined bar and line chart for multi-metric analysis.",
    category: "KPI & Metrics",
    component: MixedChart,
    dataKey: "monthlyRevenue",
  },
  {
    id: "stacked-area-chart",
    name: "Stacked Area Chart",
    description: "Layered areas showing compositional change and total over time.",
    category: "KPI & Metrics",
    component: StackedAreaChart,
    dataKey: "stackedData",
  },
];

export const categories: Category[] = [
  "Lines & Areas",
  "Bars & Columns",
  "Pies & Radials",
  "Statistical",
  "Custom & Specialty",
  "Data Display",
  "KPI & Metrics",
];
