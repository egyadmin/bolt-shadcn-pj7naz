import { useEffect, useState } from 'react';
import { DatabaseService } from '../services/DatabaseService';

export function useDatabase() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initDb = async () => {
      try {
        const db = DatabaseService.getInstance();
        await db.initialize();
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize database'));
      }
    };

    initDb();
  }, []);

  return {
    db: DatabaseService.getInstance(),
    isInitialized,
    error
  };
}