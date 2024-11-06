import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AtSign, Lock, LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <img 
            src="https://e.top4top.io/p_3232an4u51.png" 
            alt="Logo" 
            className="h-20 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-black mb-2 bg-white/90 rounded-lg py-2 px-4 inline-block">
            {isRTL ? 'نظام إدارة الموارد البشرية' : 'HR Management System'}
          </h1>
          <p className="text-gray-200 mt-4">
            {isRTL ? 'مرحباً بك في نظام إدارة الموارد البشرية' : 'Welcome to HR Management System'}
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-lg">
          <CardHeader className="space-y-2 text-center pb-4 pt-6">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
              <LogIn className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-black">
              {isRTL ? 'تسجيل الدخول' : 'Login'}
            </h2>
            <p className="text-gray-600 text-sm">
              {isRTL ? 'قم بتسجيل الدخول للوصول إلى لوحة التحكم' : 'Sign in to access your dashboard'}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-700 text-lg" htmlFor="email">
                    {isRTL ? 'البريد الإلكتروني' : 'Email'}
                  </Label>
                  <div className="relative">
                    <AtSign className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400`} />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`h-12 ${isRTL ? 'pr-12' : 'pl-12'} bg-white text-black border-gray-200 focus:border-primary focus:ring-primary text-lg`}
                      placeholder={isRTL ? 'أدخل البريد الإلكتروني' : 'Enter your email'}
                      required
                      dir="ltr"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 text-lg" htmlFor="password">
                    {isRTL ? 'كلمة المرور' : 'Password'}
                  </Label>
                  <div className="relative">
                    <Lock className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400`} />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`h-12 ${isRTL ? 'pr-12' : 'pl-12'} bg-white text-black border-gray-200 focus:border-primary focus:ring-primary text-lg`}
                      placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
                      required
                    />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-primary hover:bg-primary/90 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {isRTL ? 'جاري تسجيل الدخول...' : 'Signing in...'}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 justify-center">
                    <LogIn className="h-5 w-5" />
                    {isRTL ? 'تسجيل الدخول' : 'Sign In'}
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-gray-400 text-sm">
          {isRTL ? 'جميع الحقوق محفوظة © 2024' : '© 2024 All rights reserved'}
        </p>
      </div>
    </div>
  );
}