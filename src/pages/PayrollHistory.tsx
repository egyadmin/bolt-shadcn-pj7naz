import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface PayrollRecord {
  month: string;
  period: string;
  status: 'pending' | 'processing' | 'approved' | 'delayed';
  date: string;
  time: string;
  processedBy?: string;
  totalAmount?: number;
}

const payrollRecords: PayrollRecord[] = [
  {
    month: '2023 يناير',
    period: '1 يناير ← 31 يناير',
    status: 'approved',
    date: '2023/01/03',
    time: '09:16 صباحاً',
    totalAmount: 505484,
  },
  {
    month: '2022 ديسمبر',
    period: '26 نوفمبر ← 25 ديسمبر',
    status: 'delayed',
    date: '--',
    time: '--',
  },
  {
    month: '2022 نوفمبر',
    period: '26 أكتوبر ← 25 نوفمبر',
    status: 'processing',
    date: '2022/12/03',
    time: '09:30 صباحاً',
    processedBy: 'خالد العلي',
  },
  {
    month: '2022 أكتوبر',
    period: '26 سبتمبر ← 25 أكتوبر',
    status: 'approved',
    date: '2022/11/03',
    time: '09:22 صباحاً',
    totalAmount: 501200,
  },
  {
    month: '2022 سبتمبر',
    period: '26 أغسطس ← 25 سبتمبر',
    status: 'approved',
    date: '2022/10/03',
    time: '09:16 صباحاً',
    totalAmount: 513039,
  },
  {
    month: '2022 أغسطس',
    period: '26 يوليو ← 25 أغسطس',
    status: 'approved',
    date: '2022/10/03',
    time: '09:16 صباحاً',
    totalAmount: 500879,
  },
];

export default function PayrollHistory() {
  const { language } = useLanguage();

  const getStatusBadge = (status: PayrollRecord['status']) => {
    const styles = {
      approved: 'text-green-600 bg-green-50',
      processing: 'text-blue-600 bg-blue-50',
      delayed: 'text-red-600 bg-red-50',
      pending: 'text-yellow-600 bg-yellow-50',
    };

    const icons = {
      approved: <CheckCircle className="w-4 h-4 mr-1" />,
      processing: <Clock className="w-4 h-4 mr-1" />,
      delayed: <AlertCircle className="w-4 h-4 mr-1" />,
      pending: <Clock className="w-4 h-4 mr-1" />,
    };

    const labels = {
      approved: language === 'ar' ? 'مؤكد' : 'Approved',
      processing: language === 'ar' ? 'قيد المعالجة' : 'Processing',
      delayed: language === 'ar' ? 'متأخر' : 'Delayed',
      pending: language === 'ar' ? 'معلق' : 'Pending',
    };

    return (
      <div className={`flex items-center px-2 py-1 rounded-full text-sm ${styles[status]}`}>
        {icons[status]}
        {labels[status]}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {language === 'ar' ? 'مسيرات رواتب سابقة' : 'Previous Payrolls'}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'سجل المسيرات' : 'Payroll History'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payrollRecords.map((record, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-white border hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-semibold">{record.month}</div>
                    <div className="text-sm text-gray-500">{record.period}</div>
                  </div>

                  <div className="flex-1 text-center">
                    {getStatusBadge(record.status)}
                  </div>

                  <div className="flex-1 text-center">
                    <div className="text-sm">{record.date}</div>
                    <div className="text-sm text-gray-500">{record.time}</div>
                    {record.processedBy && (
                      <div className="text-sm text-gray-500">
                        {language === 'ar' ? 'بواسطة: ' : 'By: '}{record.processedBy}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-left">
                    {record.totalAmount ? (
                      <div className="font-semibold">
                        {record.totalAmount.toLocaleString()} {language === 'ar' ? 'ريال' : 'SAR'}
                      </div>
                    ) : (
                      '--'
                    )}
                  </div>

                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          {language === 'ar' ? 'عرض التفاصيل' : 'View Details'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {language === 'ar' ? 'تحميل PDF' : 'Download PDF'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {language === 'ar' ? 'تصدير Excel' : 'Export Excel'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <img src="https://hrsd.gov.sa/themes/custom/hrsd/logo.svg" alt="HRSD" className="h-12" />
              <img src="https://www.gosi.gov.sa/static/media/gosi-logo.0c4ed627.svg" alt="GOSI" className="h-12" />
              <img src="https://muqeem.sa/assets/images/qiwa.svg" alt="Qiwa" className="h-12" />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}