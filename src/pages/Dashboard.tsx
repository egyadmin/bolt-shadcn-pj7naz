import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AttendanceChart } from '@/components/charts/AttendanceChart';
import { DepartmentChart } from '@/components/charts/DepartmentChart';
import { PerformanceChart } from '@/components/charts/PerformanceChart';
import { Users, Clock, Calendar, Building2, FileText } from 'lucide-react';

export default function Dashboard() {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const stats = [
    {
      title: isRTL ? 'إجمالي الموظفين' : 'Total Employees',
      value: '250',
      icon: Users,
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: isRTL ? 'الحضور اليوم' : 'Present Today',
      value: '235',
      icon: Clock,
      change: '94%',
      changeType: 'positive'
    },
    {
      title: isRTL ? 'الإجازات' : 'On Leave',
      value: '8',
      icon: Calendar,
      change: '3.2%',
      changeType: 'neutral'
    },
    {
      title: isRTL ? 'الأقسام' : 'Departments',
      value: '12',
      icon: Building2,
      change: '+2',
      changeType: 'positive'
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {isRTL ? 'لوحة التحكم' : 'Dashboard'}
          </h1>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            {isRTL ? 'تصدير التقرير' : 'Export Report'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                  </div>
                  <div className={`h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center ${isRTL ? 'ml-4' : 'mr-4'}`}>
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4">
                  <Progress value={parseFloat(stat.change)} className="h-2" />
                  <p className={`text-sm mt-2 ${
                    stat.changeType === 'positive' ? 'text-green-600' :
                    stat.changeType === 'negative' ? 'text-red-600' :
                    'text-yellow-600'
                  }`}>
                    {stat.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <AttendanceChart />
          </div>
          <div>
            <DepartmentChart />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <PerformanceChart />
          <Card className="hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              {/* Additional chart or content can go here */}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}