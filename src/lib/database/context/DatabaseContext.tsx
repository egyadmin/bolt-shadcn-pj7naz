import { createContext, useContext, ReactNode } from 'react';
import { DatabaseService } from '../services/DatabaseService';
import { useDatabase } from '../hooks/useDatabase';

interface DatabaseContextType {
  db: DatabaseService;
  isInitialized: boolean;
  error: Error | null;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const { db, isInitialized, error } = useDatabase();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Database Error</h1>
          <p className="text-red-500">{error.message}</p>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Initializing database...</p>
        </div>
      </div>
    );
  }

  return (
    <DatabaseContext.Provider value={{ db, isInitialized, error }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDb() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDb must be used within a DatabaseProvider');
  }
  return context;
}