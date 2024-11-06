import { AppDataSource } from '../index';
import { Department } from '../entities/Department';

export const DepartmentRepository = AppDataSource.getRepository(Department).extend({
  async findWithEmployeeCount() {
    return this.createQueryBuilder('department')
      .loadRelationCountAndMap('department.employeeCount', 'department.employees')
      .getMany();
  },

  async findWithActiveEmployees() {
    return this.createQueryBuilder('department')
      .leftJoinAndSelect('department.employees', 'employee')
      .where('employee.status = :status', { status: 'active' })
      .getMany();
  }
});