import { AppDataSource } from '../index';
import { Department } from '../entities/Department';
import { Employee } from '../entities/Employee';
import { User } from '../entities/User';

export async function seedInitialData() {
  try {
    const departmentRepository = AppDataSource.getRepository(Department);
    const employeeRepository = AppDataSource.getRepository(Employee);
    const userRepository = AppDataSource.getRepository(User);

    // Create departments
    const departments = await departmentRepository.save([
      {
        name: 'تقنية المعلومات',
        nameEn: 'Information Technology',
        managerId: 1,
        description: 'قسم تقنية المعلومات',
        descriptionEn: 'Information Technology Department'
      },
      {
        name: 'الموارد البشرية',
        nameEn: 'Human Resources',
        managerId: 2,
        description: 'قسم الموارد البشرية',
        descriptionEn: 'Human Resources Department'
      }
    ]);

    // Create initial admin user
    const adminUser = await userRepository.save({
      name: 'طارق الجوهري',
      email: 'tgohary@sajco.com.sa',
      password: '$2b$10$YourHashedPasswordHere', // Remember to hash passwords in production
      role: 'admin',
      isActive: true
    });

    // Create employees
    await employeeRepository.save([
      {
        employeeId: 'EMP001',
        name: 'طارق الجوهري',
        nameEn: 'Tarek Al-Gohary',
        email: 'tgohary@sajco.com.sa',
        position: 'مطور برمجيات أول',
        positionEn: 'Senior Software Developer',
        joinDate: new Date('2023-01-15'),
        status: 'active',
        nationality: 'سعودي',
        nationalityEn: 'Saudi',
        iqamaNumber: '1234567890',
        passportNumber: 'A1234567',
        contractType: 'دوام كامل',
        contractTypeEn: 'Full Time',
        department: departments[0]
      },
      {
        employeeId: 'EMP002',
        name: 'سارة الخالد',
        nameEn: 'Sarah Al-Khaled',
        email: 'sarah.k@sajco.com.sa',
        position: 'مدير موارد بشرية',
        positionEn: 'HR Manager',
        joinDate: new Date('2022-06-01'),
        status: 'active',
        nationality: 'سعودي',
        nationalityEn: 'Saudi',
        iqamaNumber: '0987654321',
        passportNumber: 'B7654321',
        contractType: 'دوام كامل',
        contractTypeEn: 'Full Time',
        department: departments[1]
      }
    ]);

    console.log('Initial data seeded successfully');
  } catch (error) {
    console.error('Error seeding initial data:', error);
    throw error;
  }
}