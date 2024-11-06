import { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      if (email === 'tgohary@sajco.com.sa' && password === '123123') {
        const userData: User = {
          id: '1',
          name: 'طارق الجوهري',
          email: email,
          role: 'admin'
        };
        setUser(userData);
        setIsAdmin(true);
        toast({
          title: 'مرحباً',
          description: 'تم تسجيل الدخول بنجاح',
        });
      } else {
        throw new Error('بيانات غير صحيحة');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'خطأ',
        description: error instanceof Error ? error.message : 'حدث خطأ أثناء تسجيل الدخول',
      });
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}