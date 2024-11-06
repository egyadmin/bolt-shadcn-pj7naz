import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target, CheckCircle } from 'lucide-react';

const goals = [
  {
    id: 1,
    title: 'تحسين الأداء',
    titleEn: 'Performance Improvement',
    progress: 75,
    status: 'in-progress',
    dueDate: '2024-06-30'
  },
  {
    id: 2,
    title: 'تطوير المهارات',
    titleEn: 'Skills Development',
    progress: 40,
    status: 'in-progress',
    dueDate: '2024-12-31'
  }
];

export default function Goals() {
  const { language } = useLanguage();

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'ar' ? 'الأهداف' : 'Goals'}
        </h1>

        <div className="grid gap-4">
          {goals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {language === 'ar' ? goal.title : goal.titleEn}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span>{goal.progress}%</span>
                    <span className="text-muted-foreground">
                      {language === 'ar' ? 'تاريخ الانتهاء: ' : 'Due: '}{goal.dueDate}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}