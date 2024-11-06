import { 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  LineChart as RechartsLineChart,
  Line as RechartsLine
} from 'recharts';

// Chart colors using CSS variables
const CHART_COLORS = {
  primary: 'hsl(var(--primary))',
  success: 'hsl(var(--success))',
  warning: 'hsl(var(--warning))',
  destructive: 'hsl(var(--destructive))',
  muted: 'hsl(var(--muted))'
};

// Common chart props interface
interface BaseChartProps {
  data: any[];
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
}

// Bar chart specific props
interface BarChartProps extends BaseChartProps {
  bars: Array<{
    dataKey: string;
    name?: string;
    fill?: string;
  }>;
}

// Line chart specific props
interface LineChartProps extends BaseChartProps {
  lines: Array<{
    dataKey: string;
    name?: string;
    stroke?: string;
    strokeDasharray?: string;
  }>;
}

const defaultMargin = { top: 20, right: 30, bottom: 5, left: 20 };

export function BarChart({ 
  data, 
  height = 300, 
  margin = defaultMargin,
  bars 
}: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars.map((bar, index) => (
          <RechartsBar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            name={bar.name}
            fill={bar.fill || CHART_COLORS.primary}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

export function LineChart({ 
  data, 
  height = 300, 
  margin = defaultMargin,
  lines 
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data} margin={margin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map((line, index) => (
          <RechartsLine
            key={line.dataKey}
            type="monotone"
            dataKey={line.dataKey}
            name={line.name}
            stroke={line.stroke || CHART_COLORS.primary}
            strokeWidth={2}
            dot={{ fill: line.stroke || CHART_COLORS.primary }}
            strokeDasharray={line.strokeDasharray}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}