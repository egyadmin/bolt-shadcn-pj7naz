import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Gift, Award, Trophy } from 'lucide-react';

const rewards = [
  {
    id: 1,
    type: 'bonus',
    title: 'مكافأة الأداء المتميز',
    titleEn: 'Performance Excellence Bonus',
    amount: 5000,
    date: '2024-03-15',
    status: 'approved'
  },
  {
    id: 2,
    type: 'achievement',
    title: 'شهادة تقدير',
    titleEn: 'Certificate of Achievement',
    description: 'إنجاز مشروع قبل الموعد المحدد',
    descriptionEn: 'Project completion ahead of schedule',
    date: '2024-02-28',
    status: 'received'
  }
];

export default function Rewards() {
  const { language } = useLanguage();

  const getStatusBadge = (status: string) => {
    const variants = {
      approved: 'success',
      pending: 'warning',
      received: 'default'
    };
    
    const labels = {
      approved: language === 'ar' ? 'معتمد' : 'Approved',
      pending: language === 'ar' ? 'قيد المراجعة' : 'Pending',
      received: language === 'ar' ? 'مستلم' : 'Received'
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
        <h1 className="text-3xl font-bold mb-6">
          {language === 'ar' ? 'المكافآت والتقدير' : 'Rewards & Recognition'}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              {language === 'ar' ? 'سجل المكافآت' : 'Rewards History'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'ar' ? 'النوع' : 'Type'}</TableHead>
                  <TableHead>{language === 'ar' ? 'التفاصيل' : 'Details'}</TableHead>
                  <TableHead>{language === 'ar' ? 'التاريخ' : 'Date'}</TableHead>
                  <TableHead>{language === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rewards.map((reward) => (
                  <TableRow key={reward.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {reward.type === 'bonus' ? (
                          <Gift className="h-4 w-4" />
                        ) : (
                          <Award className="h-4 w-4" />
                        )}
                        {reward.type === 'bonus' 
                          ? (language === 'ar' ? 'مكافأة مالية' : 'Bonus')
                          : (language === 'ar' ? 'تقدير' : 'Achievement')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {language === 'ar' ? reward.title : reward.titleEn}
                      </div>
                      {reward.amount && (
                        <div className="text-sm text-muted-foreground">
                          {reward.amount} {language === 'ar' ? 'ريال' : 'SAR'}
                        </div>
                      )}
                      {reward.description && (
                        <div className="text-sm text-muted-foreground">
                          {language === 'ar' ? reward.description : reward.descriptionEn}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{reward.date}</TableCell>
                    <TableCell>{getStatusBadge(reward.status)}</TableCell>
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