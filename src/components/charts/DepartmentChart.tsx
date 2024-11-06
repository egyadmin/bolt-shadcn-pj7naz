import { useLanguage } from '@/contexts/LanguageContext';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer } from './ChartContainer';
import { chartColors, chartStyles, formatChartValue } from '@/lib/chart-utils';

const data = [
  { 
    name: 'الموارد البشرية',
    nameEn: 'HR',
    value: 15,
    color: chartColors.accent.blue
  },
  { 
    name: 'تقنية المعلومات',
    nameEn: 'IT',
    value: 25,
    color: chartColors.accent.green
  },
  { 
    name: 'المالية',
    nameEn: 'Finance',
    value: 20,
    color: chartColors.accent.purple
  },
  { 
    name: 'العمليات',
    nameEn: 'Operations',
    value: 30,
    color: chartColors.accent.yellow
  },
  { 
    name: 'المبيعات',
    nameEn: 'Sales',
    value: 10,
    color: chartColors.accent.red
  }
];

export function DepartmentChart() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = (data.value / data.total * 100).toFixed(1);
      
      return (
        <div className="bg-card p-4 border rounded-lg shadow-lg" dir={isRTL ? 'rtl' : 'ltr'}>
          <p className="font-semibold text-base mb-2">
            {isRTL ? data.name : data.nameEn}
          </p>
          <div className="space-y-1 text-sm">
            <p className="text-muted-foreground">
              {isRTL ? 'عدد الموظفين:' : 'Employees:'} 
              <span className="font-medium text-foreground mr-1">
                {data.value}
              </span>
            </p>
            <p className="text-muted-foreground">
              {isRTL ? 'النسبة:' : 'Percentage:'} 
              <span className="font-medium text-foreground mr-1">
                {percentage}%
              </span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, total }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const percentage = ((value / total) * 100).toFixed(0);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {percentage}%
      </text>
    );
  };

  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithTotal = data.map(item => ({ ...item, total }));

  return (
    <ChartContainer 
      title={isRTL ? 'توزيع الموظفين' : 'Employee Distribution'}
      onExport={() => console.log('Export chart')}
    >
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={dataWithTotal}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={CustomLabel}
            outerRadius={140}
            innerRadius={80}
            paddingAngle={2}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
          >
            {dataWithTotal.map((entry, index) => (
              <Cell 
                key={`cell-${index}`}
                fill={entry.color}
                stroke="white"
                strokeWidth={2}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            ))}
          </Pie>
          <Tooltip 
            content={CustomTooltip}
            wrapperStyle={{ outline: 'none' }}
          />
          <Legend
            formatter={(value, entry: any) => (
              <span className="text-sm font-medium">
                {isRTL ? entry.payload.name : entry.payload.nameEn}
              </span>
            )}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{
              paddingTop: '20px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}