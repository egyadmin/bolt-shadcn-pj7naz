import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  FileText, 
  Building2, 
  Calendar,
  Download,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Employee {
  id: number;
  name: string;
  nameEn: string;
  employeeId: string;
  department: string;
  departmentEn: string;
  position: string;
  positionEn: string;
  joinDate: string;
  status: 'active' | 'onLeave' | 'terminated';
  nationality: string;
  nationalityEn: string;
  iqamaNumber: string;
  passportNumber: string;
  contractType: string;
  contractTypeEn: string;
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    name: 'طارق الجوهري',
    nameEn: 'Tarek Al-Gohary',
    employeeId: 'EMP001',
    department: 'تقنية المعلومات',
    departmentEn: 'Information Technology',
    position: 'مطور برمجيات أول',
    positionEn: 'Senior Software Developer',
    joinDate: '2023-01-15',
    status: 'active',
    nationality: 'سعودي',
    nationalityEn: 'Saudi',
    iqamaNumber: '1234567890',
    passportNumber: 'A1234567',
    contractType: 'دوام كامل',
    contractTypeEn: 'Full Time'
  },
  {
    id: 2,
    name: 'سارة الخالد',
    nameEn: 'Sarah Al-Khaled',
    employeeId: 'EMP002',
    department: 'الموارد البشرية',
    departmentEn: 'Human Resources',
    position: 'مدير موارد بشرية',
    positionEn: 'HR Manager',
    joinDate: '2022-06-01',
    status: 'active',
    nationality: 'سعودي',
    nationalityEn: 'Saudi',
    iqamaNumber: '0987654321',
    passportNumber: 'B7654321',
    contractType: 'دوام كامل',
    contractTypeEn: 'Full Time'
  }
];

export default function Employees() {
  const { language } = useLanguage();
  const [employees] = useState<Employee[]>(initialEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getStatusBadge = (status: Employee['status']) => {
    const variants = {
      active: 'success',
      onLeave: 'warning',
      terminated: 'destructive'
    };
    
    const labels = {
      active: language === 'ar' ? 'نشط' : 'Active',
      onLeave: language === 'ar' ? 'في إجازة' : 'On Leave',
      terminated: language === 'ar' ? 'منتهي' : 'Terminated'
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesDepartment = departmentFilter === 'all' || 
      (language === 'ar' ? employee.department : employee.departmentEn) === departmentFilter;
    
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;

    return matchesSearch && matchesDepartment && matchesStatus;
  });

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {language === 'ar' ? 'إدارة الموظفين' : 'Employee Management'}
          </h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'إضافة موظف' : 'Add Employee'}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>
                  {language === 'ar' ? 'إضافة موظف جديد' : 'Add New Employee'}
                </DialogTitle>
              </DialogHeader>
              {/* Employee form content */}
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={language === 'ar' ? 'بحث عن موظف...' : 'Search employees...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={language === 'ar' ? 'القسم' : 'Department'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === 'ar' ? 'جميع الأقسام' : 'All Departments'}
              </SelectItem>
              <SelectItem value="تقنية المعلومات">
                {language === 'ar' ? 'تقنية المعلومات' : 'Information Technology'}
              </SelectItem>
              <SelectItem value="الموارد البشرية">
                {language === 'ar' ? 'الموارد البشرية' : 'Human Resources'}
              </SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder={language === 'ar' ? 'الحالة' : 'Status'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {language === 'ar' ? 'جميع الحالات' : 'All Statuses'}
              </SelectItem>
              <SelectItem value="active">
                {language === 'ar' ? 'نشط' : 'Active'}
              </SelectItem>
              <SelectItem value="onLeave">
                {language === 'ar' ? 'في إجازة' : 'On Leave'}
              </SelectItem>
              <SelectItem value="terminated">
                {language === 'ar' ? 'منتهي' : 'Terminated'}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'قائمة الموظفين' : 'Employee List'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'ar' ? 'الموظف' : 'Employee'}</TableHead>
                  <TableHead>{language === 'ar' ? 'القسم' : 'Department'}</TableHead>
                  <TableHead>{language === 'ar' ? 'المنصب' : 'Position'}</TableHead>
                  <TableHead>{language === 'ar' ? 'تاريخ الالتحاق' : 'Join Date'}</TableHead>
                  <TableHead>{language === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                  <TableHead className="text-right">{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {language === 'ar' ? employee.name : employee.nameEn}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {employee.employeeId}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 mr-2 text-muted-foreground" />
                        {language === 'ar' ? employee.department : employee.departmentEn}
                      </div>
                    </TableCell>
                    <TableCell>
                      {language === 'ar' ? employee.position : employee.positionEn}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        {employee.joinDate}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(employee.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileText className="h-4 w-4 mr-2" />
                            {language === 'ar' ? 'عرض الملف' : 'View Profile'}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            {language === 'ar' ? 'تصدير البيانات' : 'Export Data'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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