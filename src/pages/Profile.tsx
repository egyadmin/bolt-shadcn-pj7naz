import { Navigation } from '@/components/Navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { language } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-6">
          {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
        </h1>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'المعلومات الشخصية' : 'Personal Information'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  {user?.name ? (
                    <>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>
                        <User className="h-10 w-10" />
                      </AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback>
                      <User className="h-10 w-10" />
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold">{user?.name || 'Guest'}</h2>
                  <p className="text-muted-foreground">{user?.email || 'Not logged in'}</p>
                </div>
              </div>

              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}