import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const isRTL = language === 'ar';

  const toggleLanguage = () => {
    setLanguage(isRTL ? 'en' : 'ar');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 w-full justify-start"
    >
      <Languages className="h-4 w-4" />
      {isRTL ? 'English' : 'العربية'}
    </Button>
  );
}