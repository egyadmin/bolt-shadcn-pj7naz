import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const departments = [
  {
    id: 1,
    name: 'شئون الموظفين',
    nameEn: 'HR Department',
    employees: 15,
    manager: 'أحمد محمد',
    status: 'active'
  },
  {
    id: 2,
    name: 'العقود والمشتريات',
    nameEn: 'Contracts & Procurement',
    employees: 12,
    manager: 'خالد العمري',
    status: 'active'
  },
  {
    id: 3,
    name: 'تقنية المعلومات',
    nameEn: 'Information Technology',
    employees: 20,
    manager: 'طارق الجوهري',
    status: 'active'
  },
  {
    id: 4,
    name: 'الإدارة المالية',
    nameEn: 'Financial Management',
    employees: 18,
    manager: 'سعيد الغامدي',
    status: 'active'
  },
  {
    id: 5,
    name: 'إدارة الإسكان',
    nameEn: 'Housing Management',
    employees: 10,
    manager: 'عبدالله القحطاني',
    status: 'active'
  },
  {
    id: 6,
    name: 'إدارة التفجير',
    nameEn: 'Blasting Management',
    employees: 25,
    manager: 'فهد السبيعي',
    status: 'active'
  },
  {
    id: 7,
    name: 'إدارة التخطيط',
    nameEn: 'Planning Management',
    employees: 14,
    manager: 'محمد العتيبي',
    status: 'active'
  },
  {
    id: 8,
    name: 'إدارة المعدات',
    nameEn: 'Equipment Management',
    employees: 30,
    manager: 'سلطان الدوسري',
    status: 'active'
  },
  {
    id: 9,
    name: 'إدارة الزيوت',
    nameEn: 'Oil Management',
    employees: 16,
    manager: 'عمر الحربي',
    status: 'active'
  },
  {
    id: 10,
    name: 'إدارة المشاريع',
    nameEn: 'Project Management',
    employees: 22,
    manager: 'ناصر الشهري',
    status: 'active'
  },
  {
    id: 11,
    name: 'إدارة المتابعة',
    nameEn: 'Follow-up Management',
    employees: 8,
    manager: 'بندر المالكي',
    status: 'active'
  }
];

export default function Departments() {
  const { language } = useLanguage();

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'ar' ? 'الأقسام' : 'Departments'}
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'قائمة الأقسام' : 'Department List'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">
                    {language === 'ar' ? 'اسم القسم' : 'Department Name'}
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    {language === 'ar' ? 'عدد الموظفين' : 'Employees'}
                  </TableHead>
                  <TableHead className="w-[200px]">
                    {language === 'ar' ? 'المدير' : 'Manager'}
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    {language === 'ar' ? 'الحالة' : 'Status'}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map((dept) => (
                  <TableRow key={dept.id}>
                    <TableCell className="font-medium">
                      {language === 'ar' ? dept.name : dept.nameEn}
                    </TableCell>
                    <TableCell className="text-center">{dept.employees}</TableCell>
                    <TableCell>{dept.manager}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="success" className="bg-emerald-500">
                        {language === 'ar' ? 'نشط' : 'Active'}
                      </Badge>
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