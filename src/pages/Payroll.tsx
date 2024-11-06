import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, Download, FileSpreadsheet, Printer, Search } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SalaryRecord {
  id: number;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  basicSalary: number;
  housing: number;
  transport: number;
  food: number;
  overtime: number;
  bonus: number;
  otherAllowances: number;
  gosi: number;
  tax: number;
  otherDeductions: number;
  netSalary: number;
  status: 'pending' | 'processed' | 'paid';
  month: string;
}

const initialRecords: SalaryRecord[] = [
  {
    id: 1,
    employeeId: 'EMP001',
    employeeName: 'محمد أحمد',
    department: 'تقنية المعلومات',
    position: 'مهندس برمجيات',
    basicSalary: 12000,
    housing: 3000,
    transport: 800,
    food: 500,
    overtime: 1200,
    bonus: 1000,
    otherAllowances: 500,
    gosi: 1200,
    tax: 0,
    otherDeductions: 300,
    netSalary: 17500,
    status: 'paid',
    month: '2024-03'
  },
  {
    id: 2,
    employeeId: 'EMP002',
    employeeName: 'سارة خالد',
    department: 'الموارد البشرية',
    position: 'مدير موارد بشرية',
    basicSalary: 10000,
    housing: 2500,
    transport: 800,
    food: 500,
    overtime: 0,
    bonus: 800,
    otherAllowances: 400,
    gosi: 1000,
    tax: 0,
    otherDeductions: 200,
    netSalary: 13800,
    status: 'pending',
    month: '2024-03'
  }
];

export default function Payroll() {
  const { language } = useLanguage();
  const [records, setRecords] = useState<SalaryRecord[]>(initialRecords);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('2024-03');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-SA' : 'en-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'warning',
      processed: 'default',
      paid: 'success'
    };
    
    const labels = {
      pending: language === 'ar' ? 'معلق' : 'Pending',
      processed: language === 'ar' ? 'تم المعالجة' : 'Processed',
      paid: language === 'ar' ? 'تم الدفع' : 'Paid'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const processSalaries = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setRecords(records.map(record => ({
        ...record,
        status: record.status === 'pending' ? 'processed' : record.status
      })));
      setIsProcessing(false);
    }, 1500);
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || record.department === departmentFilter;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {language === 'ar' ? 'مسير الرواتب' : 'Payroll Management'}
          </h1>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Calculator className="mr-2 h-4 w-4" />
                  {language === 'ar' ? 'معالجة الرواتب' : 'Process Payroll'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {language === 'ar' ? 'معالجة الرواتب' : 'Process Payroll'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>
                      {language === 'ar' ? 'الشهر' : 'Month'}
                    </Label>
                    <Input
                      type="month"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full" 
                    onClick={processSalaries}
                    disabled={isProcessing}
                  >
                    <Calculator className="mr-2 h-4 w-4" />
                    {isProcessing 
                      ? (language === 'ar' ? 'جاري المعالجة...' : 'Processing...') 
                      : (language === 'ar' ? 'بدء المعالجة' : 'Start Processing')}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              {language === 'ar' ? 'تصدير Excel' : 'Export Excel'}
            </Button>
            
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              {language === 'ar' ? 'طباعة' : 'Print'}
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={language === 'ar' ? 'بحث عن موظف...' : 'Search employee...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder={language === 'ar' ? 'القسم' : 'Department'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'ar' ? 'جميع الأقسام' : 'All Departments'}</SelectItem>
              <SelectItem value="تقنية المعلومات">{language === 'ar' ? 'تقنية المعلومات' : 'IT'}</SelectItem>
              <SelectItem value="الموارد البشرية">{language === 'ar' ? 'الموارد البشرية' : 'HR'}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'سجلات الرواتب' : 'Payroll Records'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-bold">{language === 'ar' ? 'معلومات الموظف' : 'Employee Info'}</TableHead>
                    <TableHead className="font-bold">{language === 'ar' ? 'الراتب الأساسي' : 'Basic Salary'}</TableHead>
                    <TableHead className="font-bold">{language === 'ar' ? 'البدلات' : 'Allowances'}</TableHead>
                    <TableHead className="font-bold">{language === 'ar' ? 'الاستقطاعات' : 'Deductions'}</TableHead>
                    <TableHead className="font-bold">{language === 'ar' ? 'الإجمالي' : 'Total'}</TableHead>
                    <TableHead className="font-bold">{language === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                    <TableHead className="font-bold text-right">{language === 'ar' ? 'الإجراءات' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{record.employeeName}</div>
                          <div className="text-sm text-muted-foreground">{record.employeeId}</div>
                          <div className="text-sm text-muted-foreground">{record.department}</div>
                          <div className="text-sm text-muted-foreground">{record.position}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{formatCurrency(record.basicSalary)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">
                            {language === 'ar' ? 'بدل السكن' : 'Housing'}: {formatCurrency(record.housing)}
                          </div>
                          <div className="text-sm">
                            {language === 'ar' ? 'بدل النقل' : 'Transport'}: {formatCurrency(record.transport)}
                          </div>
                          <div className="text-sm">
                            {language === 'ar' ? 'بدل الطعام' : 'Food'}: {formatCurrency(record.food)}
                          </div>
                          <div className="text-sm">
                            {language === 'ar' ? 'العمل الإضافي' : 'Overtime'}: {formatCurrency(record.overtime)}
                          </div>
                          <div className="text-sm">
                            {language === 'ar' ? 'المكافآت' : 'Bonus'}: {formatCurrency(record.bonus)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-red-500">
                          <div className="text-sm">
                            {language === 'ar' ? 'التأمينات' : 'GOSI'}: -{formatCurrency(record.gosi)}
                          </div>
                          <div className="text-sm">
                            {language === 'ar' ? 'الضريبة' : 'Tax'}: -{formatCurrency(record.tax)}
                          </div>
                          <div className="text-sm">
                            {language === 'ar' ? 'استقطاعات أخرى' : 'Other'}: -{formatCurrency(record.otherDeductions)}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-lg">{formatCurrency(record.netSalary)}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}