import { useLanguage } from '@/contexts/LanguageContext';
import { Navigation } from '@/components/Navigation';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div 
      className={cn(
        "min-h-screen bg-gray-50/50 relative",
        isRTL && "direction-rtl"
      )}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <Navigation />
      <main 
        className={cn(
          "min-h-screen transition-all duration-300",
          "px-4 py-6 sm:px-6 lg:px-8",
          "lg:flex-1",
          isRTL ? "lg:mr-64" : "lg:ml-64"
        )}
      >
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl bg-white/60 shadow-sm backdrop-blur-lg border">
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}