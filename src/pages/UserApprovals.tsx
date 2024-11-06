import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export default function UserApprovals() {
  const { language } = useLanguage();
  const { pendingUsers, approveUser, rejectUser } = useAuth();

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'warning',
      approved: 'success',
      rejected: 'destructive'
    };
    
    const labels = {
      pending: language === 'ar' ? 'قيد المراجعة' : 'Pending',
      approved: language === 'ar' ? 'تمت الموافقة' : 'Approved',
      rejected: language === 'ar' ? 'مرفوض' : 'Rejected'
    };

    const icons = {
      pending: <Clock className="h-4 w-4 mr-2" />,
      approved: <CheckCircle className="h-4 w-4 mr-2" />,
      rejected: <XCircle className="h-4 w-4 mr-2" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className="flex items-center">
        {icons[status as keyof typeof icons]}
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'ar' ? 'طلبات التسجيل' : 'Registration Requests'}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'المستخدمون المعلقون' : 'Pending Users'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'ar' ? 'الاسم' : 'Name'}</TableHead>
                  <TableHead>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</TableHead>
                  <TableHead>{language === 'ar' ? 'تاريخ التسجيل' : 'Registration Date'}</TableHead>
                  <TableHead>{language === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                  <TableHead>{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {format(new Date(user.registrationDate), 'dd/MM/yyyy HH:mm')}
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      {user.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => approveUser(user.id)}
                          >
                            {language === 'ar' ? 'موافقة' : 'Approve'}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => rejectUser(user.id)}
                          >
                            {language === 'ar' ? 'رفض' : 'Reject'}
                          </Button>
                        </div>
                      )}
                    </TableCell>
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