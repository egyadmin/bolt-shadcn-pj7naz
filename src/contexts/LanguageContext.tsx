import { createContext, useContext, useState } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.employees': 'Employees',
    'nav.attendance': 'Attendance',
    'nav.leaves': 'Leave Management',
    'nav.departments': 'Departments',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.hrManagement': 'HR Management',
    'dashboard.welcome': 'Welcome',
    'dashboard.overview': 'Overview',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.totalEmployees': 'Total Employees',
    'dashboard.attendance': 'Attendance Rate',
    'dashboard.departments': 'Departments',
    'dashboard.pendingLeaves': 'Pending Leaves',
  },
  ar: {
    'nav.dashboard': 'لوحة التحكم',
    'nav.employees': 'الموظفين',
    'nav.attendance': 'الحضور',
    'nav.leaves': 'إدارة الإجازات',
    'nav.departments': 'الأقسام',
    'nav.profile': 'الملف الشخصي',
    'nav.settings': 'الإعدادات',
    'nav.hrManagement': 'إدارة الموارد البشرية',
    'dashboard.welcome': 'مرحباً',
    'dashboard.overview': 'نظرة عامة',
    'dashboard.recentActivity': 'النشاط الأخير',
    'dashboard.totalEmployees': 'إجمالي الموظفين',
    'dashboard.attendance': 'نسبة الحضور',
    'dashboard.departments': 'الأقسام',
    'dashboard.pendingLeaves': 'الإجازات المعلقة',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ar');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}