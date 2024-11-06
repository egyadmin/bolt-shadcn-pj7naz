import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

const pendingUsers = [
  {
    id: 1,
    name: 'طارق الجوهري',
    email: 'tgohary@sajco.com.sa',
    department: 'تقنية المعلومات',
    status: 'active',
    role: 'admin',
  },
  {
    id: 2,
    name: 'أحمد محمد',
    email: 'ahmed.m@sajco.com.sa',
    department: 'الموارد البشرية',
    status: 'pending',
    role: 'user',
  },
];

export default function UserManagement() {
  const { language } = useLanguage();

  const getStatusBadge = (status: string) => {
    if (status === 'active') {
      return (
        <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          {language === 'ar' ? 'نشط' : 'Active'}
        </Badge>
      );
    }
    return (
      <Badge variant="warning" className="flex items-center gap-1">
        <XCircle className="h-3 w-3" />
        {language === 'ar' ? 'معلق' : 'Pending'}
      </Badge>
    );
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'ar' ? 'إدارة المستخدمين' : 'User Management'}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'المستخدمين' : 'Users'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">
                    {language === 'ar' ? 'الاسم' : 'Name'}
                  </TableHead>
                  <TableHead className="w-[200px]">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'القسم' : 'Department'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'الصلاحية' : 'Role'}
                  </TableHead>
                  <TableHead>
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </TableHead>
                  <TableHead className="text-right">
                    {language === 'ar' ? 'الإجراءات' : 'Actions'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>
                      <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                        {user.role === 'admin' 
                          ? (language === 'ar' ? 'مدير النظام' : 'Admin')
                          : (language === 'ar' ? 'مستخدم' : 'User')}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-right">
                      {user.status === 'pending' && (
                        <Button variant="outline" size="sm">
                          {language === 'ar' ? 'تفعيل' : 'Activate'}
                        </Button>
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