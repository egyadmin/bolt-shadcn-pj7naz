import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, Users, Share2 } from 'lucide-react';

interface WhatsAppGroup {
  id: number;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  link: string;
  members: number;
  department: string;
  departmentEn: string;
}

const groups: WhatsAppGroup[] = [
  {
    id: 1,
    name: 'شؤون الموظفين العام',
    nameEn: 'HR General',
    description: 'المجموعة الرسمية لقسم شؤون الموظفين',
    descriptionEn: 'Official HR Department Group',
    link: 'https://chat.whatsapp.com/example1',
    members: 25,
    department: 'شؤون الموظفين',
    departmentEn: 'HR'
  },
  {
    id: 2,
    name: 'التوظيف والتعيين',
    nameEn: 'Recruitment',
    description: 'مجموعة خاصة بالتوظيف والتعيين',
    descriptionEn: 'Recruitment and Hiring Group',
    link: 'https://chat.whatsapp.com/example2',
    members: 15,
    department: 'شؤون الموظفين',
    departmentEn: 'HR'
  },
  {
    id: 3,
    name: 'الرواتب والمزايا',
    nameEn: 'Payroll & Benefits',
    description: 'مجموعة خاصة بالرواتب والمزايا',
    descriptionEn: 'Payroll and Benefits Group',
    link: 'https://chat.whatsapp.com/example3',
    members: 18,
    department: 'شؤون الموظفين',
    departmentEn: 'HR'
  }
];

export default function WhatsAppGroups() {
  const { language } = useLanguage();

  const handleJoinGroup = (link: string) => {
    window.open(link, '_blank');
  };

  const handleShareGroup = async (group: WhatsAppGroup) => {
    try {
      await navigator.share({
        title: language === 'ar' ? group.name : group.nameEn,
        text: language === 'ar' ? group.description : group.descriptionEn,
        url: group.link
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'ar' ? 'مجموعات الواتساب' : 'WhatsApp Groups'}
        </h1>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                  {language === 'ar' ? group.name : group.nameEn}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {language === 'ar' ? group.description : group.descriptionEn}
                  </p>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    {group.members} {language === 'ar' ? 'عضو' : 'members'}
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {language === 'ar' ? group.department : group.departmentEn}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1" 
                      onClick={() => handleJoinGroup(group.link)}
                    >
                      {language === 'ar' ? 'انضمام' : 'Join'}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleShareGroup(group)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
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