import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PlaneTakeoff, Plus, Calendar } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TravelRequest {
  id: number;
  employeeId: string;
  employeeName: string;
  destination: string;
  purpose: string;
  departureDate: string;
  returnDate: string;
  allowancePerDay: number;
  hotelName?: string;
  totalDays: number;
  status: 'pending' | 'approved' | 'completed';
  ticketType: 'round-trip' | 'one-way';
}

const initialRequests: TravelRequest[] = [
  {
    id: 1,
    employeeId: 'EMP001',
    employeeName: 'محمد أحمد',
    destination: 'الرياض',
    purpose: 'اجتماع عمل',
    departureDate: '2024-03-20',
    returnDate: '2024-03-25',
    allowancePerDay: 500,
    hotelName: 'فندق الريتز كارلتون',
    totalDays: 5,
    status: 'approved',
    ticketType: 'round-trip'
  },
  {
    id: 2,
    employeeId: 'EMP002',
    employeeName: 'سارة خالد',
    destination: 'جدة',
    purpose: 'تدريب',
    departureDate: '2024-03-22',
    returnDate: '2024-03-24',
    allowancePerDay: 450,
    hotelName: 'هيلتون جدة',
    totalDays: 2,
    status: 'pending',
    ticketType: 'round-trip'
  }
];

export default function Travel() {
  const { language } = useLanguage();
  const [requests, setRequests] = useState<TravelRequest[]>(initialRequests);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({
    employeeId: '',
    employeeName: '',
    destination: '',
    purpose: '',
    departureDate: '',
    returnDate: '',
    allowancePerDay: 0,
    hotelName: '',
    ticketType: 'round-trip'
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'warning',
      approved: 'success',
      completed: 'default'
    };
    
    const labels = {
      pending: language === 'ar' ? 'معلق' : 'Pending',
      approved: language === 'ar' ? 'موافق عليه' : 'Approved',
      completed: language === 'ar' ? 'مكتمل' : 'Completed'
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRequest(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const departureDate = new Date(newRequest.departureDate);
    const returnDate = new Date(newRequest.returnDate);
    const totalDays = Math.ceil((returnDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60 * 24));

    const request: TravelRequest = {
      id: requests.length + 1,
      ...newRequest,
      totalDays,
      status: 'pending',
      ticketType: newRequest.ticketType as 'round-trip' | 'one-way'
    };

    setRequests(prev => [...prev, request]);
    setIsDialogOpen(false);
    setNewRequest({
      employeeId: '',
      employeeName: '',
      destination: '',
      purpose: '',
      departureDate: '',
      returnDate: '',
      allowancePerDay: 0,
      hotelName: '',
      ticketType: 'round-trip'
    });
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {language === 'ar' ? 'إدارة السفر والانتداب' : 'Travel Management'}
          </h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                {language === 'ar' ? 'طلب سفر جديد' : 'New Travel Request'}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {language === 'ar' ? 'طلب سفر جديد' : 'New Travel Request'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">
                      {language === 'ar' ? 'رقم الموظف' : 'Employee ID'}
                    </Label>
                    <Input
                      id="employeeId"
                      name="employeeId"
                      value={newRequest.employeeId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="employeeName">
                      {language === 'ar' ? 'اسم الموظف' : 'Employee Name'}
                    </Label>
                    <Input
                      id="employeeName"
                      name="employeeName"
                      value={newRequest.employeeName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">
                      {language === 'ar' ? 'الوجهة' : 'Destination'}
                    </Label>
                    <Input
                      id="destination"
                      name="destination"
                      value={newRequest.destination}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purpose">
                      {language === 'ar' ? 'الغرض من السفر' : 'Purpose'}
                    </Label>
                    <Input
                      id="purpose"
                      name="purpose"
                      value={newRequest.purpose}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="departureDate">
                      {language === 'ar' ? 'تاريخ المغادرة' : 'Departure Date'}
                    </Label>
                    <Input
                      id="departureDate"
                      name="departureDate"
                      type="date"
                      value={newRequest.departureDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="returnDate">
                      {language === 'ar' ? 'تاريخ العودة' : 'Return Date'}
                    </Label>
                    <Input
                      id="returnDate"
                      name="returnDate"
                      type="date"
                      value={newRequest.returnDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="allowancePerDay">
                      {language === 'ar' ? 'بدل اليومي' : 'Daily Allowance'}
                    </Label>
                    <Input
                      id="allowancePerDay"
                      name="allowancePerDay"
                      type="number"
                      value={newRequest.allowancePerDay}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hotelName">
                      {language === 'ar' ? 'اسم الفندق' : 'Hotel Name'}
                    </Label>
                    <Input
                      id="hotelName"
                      name="hotelName"
                      value={newRequest.hotelName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ticketType">
                      {language === 'ar' ? 'نوع التذكرة' : 'Ticket Type'}
                    </Label>
                    <Select
                      value={newRequest.ticketType}
                      onValueChange={(value) => setNewRequest(prev => ({ ...prev, ticketType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="round-trip">
                          {language === 'ar' ? 'ذهاب وعودة' : 'Round Trip'}
                        </SelectItem>
                        <SelectItem value="one-way">
                          {language === 'ar' ? 'ذهاب فقط' : 'One Way'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button type="submit">
                    {language === 'ar' ? 'حفظ' : 'Save'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'طلبات السفر' : 'Travel Requests'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{language === 'ar' ? 'رقم الموظف' : 'Employee ID'}</TableHead>
                  <TableHead>{language === 'ar' ? 'اسم الموظف' : 'Employee Name'}</TableHead>
                  <TableHead>{language === 'ar' ? 'الوجهة' : 'Destination'}</TableHead>
                  <TableHead>{language === 'ar' ? 'تاريخ المغادرة' : 'Departure'}</TableHead>
                  <TableHead>{language === 'ar' ? 'تاريخ العودة' : 'Return'}</TableHead>
                  <TableHead>{language === 'ar' ? 'المدة' : 'Duration'}</TableHead>
                  <TableHead>{language === 'ar' ? 'البدل اليومي' : 'Daily Allowance'}</TableHead>
                  <TableHead>{language === 'ar' ? 'نوع التذكرة' : 'Ticket Type'}</TableHead>
                  <TableHead>{language === 'ar' ? 'الحالة' : 'Status'}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.employeeId}</TableCell>
                    <TableCell>{request.employeeName}</TableCell>
                    <TableCell>{request.destination}</TableCell>
                    <TableCell>{request.departureDate}</TableCell>
                    <TableCell>{request.returnDate}</TableCell>
                    <TableCell>
                      {request.totalDays} {language === 'ar' ? 'يوم' : 'days'}
                    </TableCell>
                    <TableCell>
                      {request.allowancePerDay} {language === 'ar' ? 'ريال' : 'SAR'}
                    </TableCell>
                    <TableCell>
                      {request.ticketType === 'round-trip' 
                        ? (language === 'ar' ? 'ذهاب وعودة' : 'Round Trip')
                        : (language === 'ar' ? 'ذهاب فقط' : 'One Way')}
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
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