import { ReactNode } from 'react';
import { chartColors } from '@/lib/chart-utils';

interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
  isRTL?: boolean;
  formatter?: (value: number, name: string) => [string, string];
}

export function ChartTooltip({ 
  active, 
  payload, 
  label,
  isRTL = false,
  formatter 
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-card p-4 border rounded-lg shadow-lg min-w-[200px]" dir={isRTL ? 'rtl' : 'ltr'}>
      <p className="font-semibold mb-3 border-b pb-2">{label}</p>
      <div className="space-y-2">
        {payload.map((entry, index) => {
          const [value, name] = formatter 
            ? formatter(entry.value, entry.name)
            : [entry.value, entry.name];
            
          return (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="font-medium">{name}</span>
              </div>
              <span className="font-semibold">{value}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}