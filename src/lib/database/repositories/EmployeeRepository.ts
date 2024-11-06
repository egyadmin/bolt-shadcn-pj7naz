import { AppDataSource } from '../index';
import { Employee } from '../entities/Employee';

export const EmployeeRepository = AppDataSource.getRepository(Employee).extend({
  async findByDepartment(departmentId: number) {
    return this.createQueryBuilder('employee')
      .leftJoinAndSelect('employee.department', 'department')
      .where('department.id = :departmentId', { departmentId })
      .getMany();
  },

  async findActive() {
    return this.createQueryBuilder('employee')
      .leftJoinAndSelect('employee.department', 'department')
      .where('employee.status = :status', { status: 'active' })
      .getMany();
  },

  async findWithFullDetails(employeeId: string) {
    return this.createQueryBuilder('employee')
      .leftJoinAndSelect('employee.department', 'department')
      .leftJoinAndSelect('employee.leaves', 'leaves')
      .leftJoinAndSelect('employee.attendances', 'attendances')
      .leftJoinAndSelect('employee.payrolls', 'payrolls')
      .leftJoinAndSelect('employee.travels', 'travels')
      .leftJoinAndSelect('employee.performances', 'performances')
      .where('employee.employeeId = :employeeId', { employeeId })
      .getOne();
  }
});