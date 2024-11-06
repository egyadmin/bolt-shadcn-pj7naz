import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
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
} from 'recharts';
import { Routes, Route } from 'react-router-dom';

interface AttendanceData {
  name: string;
  present: number;
  absent: number;
  late: number;
}

interface PayrollData {
  name: string;
  salary: number;
  housing: number;
  transport: number;
  other: number;
}

const attendanceData: AttendanceData[] = [
  { name: 'Jan', present: 85, absent: 10, late: 5 },
  { name: 'Feb', present: 88, absent: 8, late: 4 },
  { name: 'Mar', present: 90, absent: 7, late: 3 },
  { name: 'Apr', present: 87, absent: 9, late: 4 },
  { name: 'May', present: 89, absent: 8, late: 3 },
  { name: 'Jun', present: 86, absent: 10, late: 4 },
];

const payrollData: PayrollData[] = [
  { name: 'Jan', salary: 50000, housing: 15000, transport: 5000, other: 3000 },
  { name: 'Feb', salary: 50000, housing: 15000, transport: 5000, other: 3500 },
  { name: 'Mar', salary: 52000, housing: 15000, transport: 5000, other: 4000 },
  { name: 'Apr', salary: 52000, housing: 15000, transport: 5000, other: 3800 },
  { name: 'May', salary: 52000, housing: 15000, transport: 5000, other: 3200 },
  { name: 'Jun', salary: 55000, housing: 15000, transport: 5000, other: 3600 },
];

function AttendanceReport() {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'ar' ? 'تقرير الحضور' : 'Attendance Report'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                tick={{ fill: 'currentColor' }}
                axisLine={{ stroke: 'currentColor' }}
              />
              <YAxis
                tick={{ fill: 'currentColor' }}
                axisLine={{ stroke: 'currentColor' }}
              />
              <Tooltip />
              <Bar dataKey="present" fill="hsl(var(--chart-1))" />
              <Bar dataKey="absent" fill="hsl(var(--chart-2))" />
              <Bar dataKey="late" fill="hsl(var(--chart-3))" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function PayrollReport() {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'ar' ? 'تقرير الرواتب' : 'Payroll Report'}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={payrollData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                tick={{ fill: 'currentColor' }}
                axisLine={{ stroke: 'currentColor' }}
              />
              <YAxis
                tick={{ fill: 'currentColor' }}
                axisLine={{ stroke: 'currentColor' }}
              />
              <Tooltip />
              <Line type="monotone" dataKey="salary" stroke="hsl(var(--chart-1))" />
              <Line type="monotone" dataKey="housing" stroke="hsl(var(--chart-2))" />
              <Line type="monotone" dataKey="transport" stroke="hsl(var(--chart-3))" />
              <Line type="monotone" dataKey="other" stroke="hsl(var(--chart-4))" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Reports() {
  const { language } = useLanguage();
  const [title, setTitle] = useState('');

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('attendance')) {
      setTitle(language === 'ar' ? 'تقارير الحضور' : 'Attendance Reports');
    } else if (path.includes('payroll')) {
      setTitle(language === 'ar' ? 'تقارير الرواتب' : 'Payroll Reports');
    }
  }, [language]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          <Routes>
            <Route path="attendance" element={<AttendanceReport />} />
            <Route path="payroll" element={<PayrollReport />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}