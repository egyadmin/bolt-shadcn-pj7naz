import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">{t('nav.settings')}</h1>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'إعدادات اللغة' : 'Language Settings'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="language">
                  {language === 'ar' ? 'اللغة' : 'Language'}
                </Label>
                <Select
                  value={language}
                  onValueChange={(value) => setLanguage(value as 'en' | 'ar')}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ar">العربية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'إعدادات الإشعارات' : 'Notification Settings'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">
                  {language === 'ar' ? 'إشعارات البريد' : 'Email Notifications'}
                </Label>
                <Switch id="email-notifications" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="system-notifications">
                  {language === 'ar' ? 'إشعارات النظام' : 'System Notifications'}
                </Label>
                <Switch id="system-notifications" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}