import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import {
  Menu,
  LayoutDashboard,
  Users,
  ClipboardList,
  Calendar,
  Building2,
  Settings,
  LogOut,
  UserCircle,
  DollarSign,
  Trophy,
  Target,
  Plane,
  BarChart3,
  MessageCircle
} from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  const { language } = useLanguage();
  const { logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isRTL = language === 'ar';

  const navItems = [
    {
      href: '/dashboard',
      icon: LayoutDashboard,
      label: isRTL ? 'لوحة التحكم' : 'Dashboard'
    },
    {
      href: '/employees',
      icon: Users,
      label: isRTL ? 'الموظفين' : 'Employees'
    },
    {
      href: '/attendance',
      icon: Calendar,
      label: isRTL ? 'الحضور والانصراف' : 'Attendance'
    },
    {
      href: '/departments',
      icon: Building2,
      label: isRTL ? 'الأقسام' : 'Departments'
    },
    {
      href: '/payroll',
      icon: DollarSign,
      label: isRTL ? 'الرواتب' : 'Payroll'
    },
    {
      href: '/performance',
      icon: Target,
      label: isRTL ? 'الأداء' : 'Performance'
    },
    {
      href: '/leaves',
      icon: ClipboardList,
      label: isRTL ? 'الإجازات' : 'Leaves'
    },
    {
      href: '/travel',
      icon: Plane,
      label: isRTL ? 'السفر والانتداب' : 'Travel'
    },
    {
      href: '/reports',
      icon: BarChart3,
      label: isRTL ? 'التقارير' : 'Reports'
    },
    {
      href: '/profile',
      icon: UserCircle,
      label: isRTL ? 'الملف الشخصي' : 'Profile'
    },
    {
      href: '/settings',
      icon: Settings,
      label: isRTL ? 'الإعدادات' : 'Settings'
    }
  ];

  const NavigationContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <img 
          src="https://e.top4top.io/p_3232an4u51.png" 
          alt="Logo" 
          className="h-12 mx-auto mb-4"
        />
        <LanguageSwitcher />
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                location.pathname === item.href && "bg-slate-700"
              )}
              asChild
            >
              <Link to={item.href} className="flex items-center">
                <item.icon className={cn(
                  "h-4 w-4",
                  isRTL ? "ml-2" : "mr-2"
                )} />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-700">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={logout}
        >
          <LogOut className={cn(
            "h-4 w-4",
            isRTL ? "ml-2" : "mr-2"
          )} />
          {isRTL ? 'تسجيل الخروج' : 'Logout'}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-slate-900 text-white">
          <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side={isRTL ? 'right' : 'left'} 
              className="w-64 p-0 bg-slate-900 text-white"
            >
              <NavigationContent />
            </SheetContent>
          </Sheet>
          <img 
            src="https://e.top4top.io/p_3232an4u51.png" 
            alt="Logo" 
            className="h-8"
          />
        </div>
        <div className="h-16" /> {/* Spacer for fixed header */}
      </div>

      {/* Desktop Navigation */}
      <div 
        className={cn(
          "fixed inset-y-0 w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white shadow-xl transition-all duration-300 hidden lg:block",
          isRTL ? "right-0" : "left-0"
        )}
      >
        <NavigationContent />
      </div>
    </>
  );
}