import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Clock, Calendar as CalendarIcon, MapPin, Users, BarChart2 } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from 'recharts';

const monthlyData = [
  { date: '01', present: 220, absent: 10, late: 20 },
  { date: '02', present: 240, absent: 5, late: 15 },
  { date: '03', present: 235, absent: 8, late: 17 },
  { date: '04', present: 230, absent: 12, late: 18 },
  { date: '05', present: 238, absent: 7, late: 15 },
  { date: '06', present: 242, absent: 3, late: 15 },
  { date: '07', present: 245, absent: 5, late: 10 },
];

const dailyStats = [
  { time: '08:00', count: 45 },
  { time: '09:00', count: 120 },
  { time: '10:00', count: 65 },
  { time: '11:00', count: 25 },
  { time: '12:00', count: 15 },
  { time: '13:00', count: 30 },
  { time: '14:00', count: 20 },
];

interface AttendanceRecord {
  id: number;
  employeeId: string;
  employeeName: string;
  checkIn: string;
  checkOut: string | null;
  status: 'present' | 'late' | 'absent' | 'leave';
  date: string;
}

const todayRecords: AttendanceRecord[] = [
  {
    id: 1,
    employeeId: 'EMP001',
    employeeName: 'طارق الجوهري',
    checkIn: '08:30',
    checkOut: '17:30',
    status: 'present',
    date: '2024-03-19'
  },
  {
    id: 2,
    employeeId: 'EMP002',
    employeeName: 'سارة الخالد',
    checkIn: '09:15',
    checkOut: null,
    status: 'late',
    date: '2024-03-19'
  }
];

export default function Attendance() {
  const { language } = useLanguage();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState('03');
  const isRTL = language === 'ar';

  const getStatusColor = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present': return 'bg-green-500';
      case 'late': return 'bg-yellow-500';
      case 'absent': return 'bg-red-500';
      case 'leave': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: AttendanceRecord['status']) => {
    const statusMap = {
      present: isRTL ? 'حاضر' : 'Present',
      late: isRTL ? 'متأخر' : 'Late',
      absent: isRTL ? 'غائب' : 'Absent',
      leave: isRTL ? 'إجازة' : 'Leave'
    };
    return statusMap[status];
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {isRTL ? 'سجل الحضور والانصراف' : 'Attendance Record'}
          </h1>
          <div className="flex gap-4">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-[180px]">
                <CalendarIcon className="h-4 w-4 mr-2" />
                <SelectValue placeholder={isRTL ? "اختر الشهر" : "Select Month"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="01">{isRTL ? "يناير" : "January"}</SelectItem>
                <SelectItem value="02">{isRTL ? "فبراير" : "February"}</SelectItem>
                <SelectItem value="03">{isRTL ? "مارس" : "March"}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <BarChart2 className="h-4 w-4 mr-2" />
              {isRTL ? 'تصدير التقرير' : 'Export Report'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'إجمالي الموظفين' : 'Total Employees'}
                  </p>
                  <h3 className="text-2xl font-bold">250</h3>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'الحضور اليوم' : 'Present Today'}
                  </p>
                  <h3 className="text-2xl font-bold">235</h3>
                </div>
                <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <Progress value={94} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'التأخير' : 'Late'}
                  </p>
                  <h3 className="text-2xl font-bold">8</h3>
                </div>
                <div className="h-8 w-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
              <Progress value={3.2} className="mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'الغياب' : 'Absent'}
                  </p>
                  <h3 className="text-2xl font-bold">7</h3>
                </div>
                <div className="h-8 w-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-red-500" />
                </div>
              </div>
              <Progress value={2.8} className="mt-3" />
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {isRTL ? 'إحصائيات الحضور الشهرية' : 'Monthly Attendance Statistics'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      dataKey="present" 
                      fill="#10B981" 
                      name={isRTL ? "حاضر" : "Present"} 
                    />
                    <Bar 
                      dataKey="late" 
                      fill="#F59E0B" 
                      name={isRTL ? "متأخر" : "Late"} 
                    />
                    <Bar 
                      dataKey="absent" 
                      fill="#EF4444" 
                      name={isRTL ? "غائب" : "Absent"} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {isRTL ? 'توزيع وقت الحضور' : 'Check-in Time Distribution'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="#6366F1" 
                      strokeWidth={2}
                      name={isRTL ? "عدد الموظفين" : "Employee Count"}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                {isRTL ? 'سجل اليوم' : "Today's Record"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayRecords.map((record) => (
                  <div 
                    key={record.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-center gap-4">
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(record.status)} text-white`}
                      >
                        {getStatusText(record.status)}
                      </Badge>
                      <div>
                        <p className="font-medium">{record.employeeName}</p>
                        <p className="text-sm text-muted-foreground">
                          {record.employeeId}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'وقت الحضور' : 'Check In'}
                        </p>
                        <p className="font-medium">{record.checkIn}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'وقت الانصراف' : 'Check Out'}
                        </p>
                        <p className="font-medium">
                          {record.checkOut || '--:--'}
                        </p>
                      </div>
                      <div>
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {isRTL ? 'التقويم' : 'Calendar'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border"
                locale={isRTL ? ar : undefined}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}