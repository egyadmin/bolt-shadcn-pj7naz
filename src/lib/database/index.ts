import { DataSource } from 'typeorm';
import { Employee } from './entities/Employee';
import { Department } from './entities/Department';
import { Leave } from './entities/Leave';
import { Attendance } from './entities/Attendance';
import { Payroll } from './entities/Payroll';
import { Travel } from './entities/Travel';
import { Performance } from './entities/Performance';
import { User } from './entities/User';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'hr_system.sqlite',
  synchronize: true,
  logging: true,
  entities: [
    Employee,
    Department,
    Leave,
    Attendance,
    Payroll,
    Travel,
    Performance,
    User
  ],
  migrations: [],
  subscribers: [],
});

export async function initializeDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('Database has been initialized');
  } catch (error) {
    console.error('Error during database initialization:', error);
    throw error;
  }
}