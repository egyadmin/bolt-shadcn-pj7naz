import { useLanguage } from '@/contexts/LanguageContext';
import { LineChart } from './ChartComponents';
import { ChartContainer } from './ChartContainer';

const data = [
  { name: 'Q1', quarter: 'الربع الأول', score: 4.1, target: 4.0 },
  { name: 'Q2', quarter: 'الربع الثاني', score: 3.8, target: 4.0 },
  { name: 'Q3', quarter: 'الربع الثالث', score: 4.2, target: 4.0 },
  { name: 'Q4', quarter: 'الربع الرابع', score: 4.5, target: 4.0 }
];

export function PerformanceChart() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const lines = [
    {
      dataKey: "score",
      name: isRTL ? 'الأداء' : 'Performance',
      stroke: 'hsl(var(--primary))'
    },
    {
      dataKey: "target",
      name: isRTL ? 'المستهدف' : 'Target',
      stroke: 'hsl(var(--warning))',
      strokeDasharray: '5 5'
    }
  ];

  return (
    <ChartContainer title={isRTL ? 'مؤشر الأداء' : 'Performance Indicator'}>
      <LineChart 
        data={data}
        lines={lines}
      />
    </ChartContainer>
  );
}