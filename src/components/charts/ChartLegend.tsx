import { chartStyles } from '@/lib/chart-utils';

interface ChartLegendProps {
  payload?: any[];
  isRTL?: boolean;
}

export function ChartLegend({ payload, isRTL = false }: ChartLegendProps) {
  if (!payload?.length) return null;

  return (
    <div 
      className="flex flex-wrap items-center justify-center gap-4 pt-4" 
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}