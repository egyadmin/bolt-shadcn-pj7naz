import { XAxis, YAxis } from 'recharts';
import { chartStyles } from '@/lib/chart-utils';

interface ChartAxisProps {
  type: 'xAxis' | 'yAxis';
  dataKey?: string;
  domain?: [number | 'auto', number | 'auto'];
  tickFormatter?: (value: number) => string;
  label?: string;
  hide?: boolean;
}

export function ChartAxis({ 
  type, 
  dataKey, 
  domain = [0, 'auto'],
  tickFormatter,
  label,
  hide = false
}: ChartAxisProps) {
  const commonProps = {
    hide,
    tick: { 
      ...chartStyles.axis.style,
      transform: 'translate(0, 8)'
    },
    axisLine: { 
      stroke: 'hsl(var(--border))',
      strokeWidth: 1
    },
    tickLine: false,
    label: label ? {
      value: label,
      position: 'insideBottom',
      offset: -10,
      style: chartStyles.axis.style
    } : undefined
  };

  if (type === 'xAxis') {
    return (
      <XAxis
        {...commonProps}
        dataKey={dataKey}
        dy={8}
        height={40}
        scale="point"
        padding={{ left: 20, right: 20 }}
      />
    );
  }

  return (
    <YAxis
      {...commonProps}
      domain={domain}
      tickFormatter={tickFormatter}
      dx={-8}
      width={60}
      padding={{ top: 20, bottom: 20 }}
    />
  );
}