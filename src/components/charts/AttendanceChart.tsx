import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart } from './ChartComponents';
import { ChartContainer } from './ChartContainer';

const data = [
  { name: 'يناير', nameEn: 'Jan', present: 20, absent: 2, late: 1 },
  { name: 'فبراير', nameEn: 'Feb', present: 18, absent: 1, late: 3 },
  { name: 'مارس', nameEn: 'Mar', present: 22, absent: 0, late: 2 }
].map(item => ({
  ...item,
  name: item.nameEn // Use English names for consistent data keys
}));

export function AttendanceChart() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const bars = [
    {
      dataKey: "present",
      name: isRTL ? 'حاضر' : 'Present',
      fill: 'hsl(var(--success))'
    },
    {
      dataKey: "absent",
      name: isRTL ? 'غائب' : 'Absent',
      fill: 'hsl(var(--destructive))'
    },
    {
      dataKey: "late",
      name: isRTL ? 'متأخر' : 'Late',
      fill: 'hsl(var(--warning))'
    }
  ];

  return (
    <ChartContainer title={isRTL ? 'إحصائيات الحضور' : 'Attendance Statistics'}>
      <BarChart 
        data={data}
        bars={bars}
      />
    </ChartContainer>
  );
}