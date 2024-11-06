import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlusCircle } from 'lucide-react';

const leaves = [
  {
    id: 1,
    employee: 'محمد أحمد',
    type: 'إجازة سنوية',
    typeEn: 'Annual Leave',
    startDate: '2024-03-15',
    endDate: '2024-03-20',
    status: 'pending',
  },
  {
    id: 2,
    employee: 'سارة خالد',
    type: 'إجازة مرضية',
    typeEn: 'Sick Leave',
    startDate: '2024-03-18',
    endDate: '2024-03-19',
    status: 'approved',
  },
  // Add more leave requests as needed
];

export default function Leaves() {
  const { language } = useLanguage();

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'warning',
      approved: 'success',
      rejected: 'destructive',
    };
    const labels = {
      pending: language === 'ar' ? 'قيد المراجعة' : 'Pending',
      approved: language === 'ar' ? 'مقبول' : 'Approved',
      rejected: language === 'ar' ? 'مرفوض' : 'Rejected',
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {language === 'ar' ? 'إدارة الإجازات' : 'Leave Management'}
          </h1>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            {language === 'ar' ? 'طلب إجازة' : 'Request Leave'}
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'طلبات الإجازات' : 'Leave Requests'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {language === 'ar' ? 'الموظف' : 'Employee'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'نوع الإجازة' : 'Leave Type'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'تاريخ البداية' : 'Start Date'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'تاريخ النهاية' : 'End Date'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leaves.map((leave) => (
                  <TableRow key={leave.id}>
                    <TableCell>{leave.employee}</TableCell>
                    <TableCell>
                      {language === 'ar' ? leave.type : leave.typeEn}
                    </TableCell>
                    <TableCell>{leave.startDate}</TableCell>
                    <TableCell>{leave.endDate}</TableCell>
                    <TableCell>{getStatusBadge(leave.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}