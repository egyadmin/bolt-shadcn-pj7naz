import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface GoalCycle {
  id: number;
  name: string;
  nameEn: string;
  type: string;
  startDate: string;
  endDate: string;
  quarters: {
    id: number;
    score: number;
    status: 'pending' | 'active' | 'completed';
  }[];
}

export default function Performance() {
  const { language } = useLanguage();
  const [isNewGoalDialogOpen, setIsNewGoalDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    nameEn: '',
    type: 'sales',
    startDate: '',
    endDate: ''
  });

  const [goalCycles, setGoalCycles] = useState<GoalCycle[]>([
    {
      id: 1,
      name: 'دورة أهداف المبيعات',
      nameEn: 'Sales Goals Cycle',
      type: 'sales',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      quarters: [
        { id: 1, score: 4.1, status: 'completed' },
        { id: 2, score: 2.8, status: 'active' },
        { id: 3, score: 0, status: 'pending' },
        { id: 4, score: 0, status: 'pending' }
      ]
    }
  ]);

  const handleNewGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGoalCycle: GoalCycle = {
      id: goalCycles.length + 1,
      name: newGoal.name,
      nameEn: newGoal.nameEn,
      type: newGoal.type,
      startDate: newGoal.startDate,
      endDate: newGoal.endDate,
      quarters: [
        { id: 1, score: 0, status: 'pending' },
        { id: 2, score: 0, status: 'pending' },
        { id: 3, score: 0, status: 'pending' },
        { id: 4, score: 0, status: 'pending' }
      ]
    };
    setGoalCycles([...goalCycles, newGoalCycle]);
    setIsNewGoalDialogOpen(false);
    setNewGoal({
      name: '',
      nameEn: '',
      type: 'sales',
      startDate: '',
      endDate: ''
    });
  };

  const calculateOverallScore = (quarters: GoalCycle['quarters']) => {
    const completedQuarters = quarters.filter(q => q.status === 'completed');
    if (completedQuarters.length === 0) return 0;
    return completedQuarters.reduce((acc, q) => acc + q.score, 0) / completedQuarters.length;
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">
              {language === 'ar' ? 'إدارة الأهداف والتقييم' : 'Goals & Evaluation Management'}
            </h1>
            <Dialog open={isNewGoalDialogOpen} onOpenChange={setIsNewGoalDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {language === 'ar' ? 'دورة هدف جديد' : 'New Goal Cycle'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {language === 'ar' ? 'دورة هدف جديد' : 'New Goal Cycle'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleNewGoalSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>
                      {language === 'ar' ? 'اسم الدورة بالعربية' : 'Cycle Name in Arabic'}
                    </Label>
                    <Input
                      value={newGoal.name}
                      onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      {language === 'ar' ? 'اسم الدورة بالإنجليزية' : 'Cycle Name in English'}
                    </Label>
                    <Input
                      value={newGoal.nameEn}
                      onChange={(e) => setNewGoal({ ...newGoal, nameEn: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      {language === 'ar' ? 'النوع' : 'Type'}
                    </Label>
                    <Select
                      value={newGoal.type}
                      onValueChange={(value) => setNewGoal({ ...newGoal, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sales">
                          {language === 'ar' ? 'أهداف المبيعات' : 'Sales Goals'}
                        </SelectItem>
                        <SelectItem value="performance">
                          {language === 'ar' ? 'أهداف الأداء' : 'Performance Goals'}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>
                        {language === 'ar' ? 'تاريخ البداية' : 'Start Date'}
                      </Label>
                      <Input
                        type="date"
                        value={newGoal.startDate}
                        onChange={(e) => setNewGoal({ ...newGoal, startDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>
                        {language === 'ar' ? 'تاريخ النهاية' : 'End Date'}
                      </Label>
                      <Input
                        type="date"
                        value={newGoal.endDate}
                        onChange={(e) => setNewGoal({ ...newGoal, endDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsNewGoalDialogOpen(false)}>
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </Button>
                    <Button type="submit">
                      {language === 'ar' ? 'إنشاء' : 'Create'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {goalCycles.map((cycle) => (
            <Card key={cycle.id} className="mb-6">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold">
                      {language === 'ar' ? cycle.name : cycle.nameEn}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {cycle.startDate} - {cycle.endDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">
                      {calculateOverallScore(cycle.quarters).toFixed(1)}/5
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {language === 'ar' ? 'التقييم العام' : 'Overall Score'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {cycle.quarters.map((quarter) => (
                    <div
                      key={quarter.id}
                      className={`p-4 rounded-lg border ${
                        quarter.status === 'active' ? 'border-primary' : ''
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">
                          {language === 'ar' ? `الربع ${quarter.id}` : `Q${quarter.id}`}
                        </span>
                        <span className={`text-sm ${
                          quarter.status === 'completed' ? 'text-green-500' :
                          quarter.status === 'active' ? 'text-blue-500' :
                          'text-gray-500'
                        }`}>
                          {quarter.status === 'completed' ? (language === 'ar' ? 'مكتمل' : 'Completed') :
                           quarter.status === 'active' ? (language === 'ar' ? 'نشط' : 'Active') :
                           (language === 'ar' ? 'قادم' : 'Upcoming')}
                        </span>
                      </div>
                      <div className="text-2xl font-bold mb-2">
                        {quarter.score.toFixed(1)}/5
                      </div>
                      {quarter.status === 'active' && (
                        <Progress value={quarter.score * 20} className="h-2" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}