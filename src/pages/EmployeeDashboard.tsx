import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  Coffee
} from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  status: 'present' | 'absent' | 'late' | 'incomplete';
  location: string;
}

export default function EmployeeDashboard() {
  const { language } = useLanguage();
  const [currentTime] = useState(new Date());
  const [monthSummary] = useState({
    workDays: 3,
    incompleteDays: 1,
    absenceDays: 1,
    unplannedPresence: 4,
    restDays: 2,
  });

  const getStatusColor = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present': return 'text-green-500';
      case 'absent': return 'text-red-500';
      case 'late': return 'text-yellow-500';
      case 'incomplete': return 'text-orange-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {language === 'ar' ? 'صباح الخير' : 'Good Morning'},
                <span className="text-primary"> ياسر الحربي</span>
              </h1>
              <p className="text-muted-foreground">
                {format(currentTime, 'EEEE, d MMMM yyyy', {
                  locale: language === 'ar' ? ar : undefined
                })}
              </p>
            </div>
          </div>
          <Button 
            size="lg" 
            className="gap-2"
            onClick={() => console.log('Attendance recorded')}
          >
            <Clock className="w-4 h-4" />
            {language === 'ar' ? 'تسجيل الحضور' : 'Check In'}
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'الحضور' : 'Attendance'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold">09:30</div>
                <div className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'وقت الدوام' : 'Work Hours'}
                </div>
                <div className="text-sm text-muted-foreground">
                  08:00 {language === 'ar' ? 'ص' : 'AM'} - 
                  05:00 {language === 'ar' ? 'م' : 'PM'}
                </div>
              </div>
              <div>
                <MapPin className="w-4 h-4 text-muted-foreground mb-1" />
                <span className="text-sm text-muted-foreground">
                  {language === 'ar' ? 'المكتب الرئيسي' : 'Main Office'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{language === 'ar' ? 'ملخص فبراير' : 'February Summary'}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {language === 'ar' ? 'مجموع أيام العمل' : 'Total Work Days'}
                  </span>
                  <span>{monthSummary.workDays}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    {language === 'ar' ? 'أيام بسجلات غير مكتملة' : 'Incomplete Records'}
                  </span>
                  <span>{monthSummary.incompleteDays}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    {language === 'ar' ? 'الغياب' : 'Absences'}
                  </span>
                  <span>{monthSummary.absenceDays}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    {language === 'ar' ? 'حضور غير مطلوب' : 'Unplanned Presence'}
                  </span>
                  <span>{monthSummary.unplannedPresence}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <Coffee className="w-4 h-4 text-blue-500" />
                    {language === 'ar' ? 'أيام راحة' : 'Rest Days'}
                  </span>
                  <span>{monthSummary.restDays}</span>
                </div>
              </div>

              <Progress value={75} className="h-2" />
              <div className="text-sm text-muted-foreground text-center">
                {language === 'ar' 
                  ? 'نسبة الحضور الشهرية: 75%' 
                  : 'Monthly Attendance Rate: 75%'}
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}