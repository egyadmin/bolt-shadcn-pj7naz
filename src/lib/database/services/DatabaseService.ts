import { AppDataSource } from '../index';
import { Employee } from '../entities/Employee';
import { Department } from '../entities/Department';
import { Attendance } from '../entities/Attendance';
import { Leave } from '../entities/Leave';
import { Payroll } from '../entities/Payroll';
import { Performance } from '../entities/Performance';
import { Travel } from '../entities/Travel';
import { User } from '../entities/User';

export class DatabaseService {
  private static instance: DatabaseService;
  private initialized = false;

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async initialize() {
    if (!this.initialized) {
      try {
        await AppDataSource.initialize();
        this.initialized = true;
        console.log('Database initialized successfully');
      } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
      }
    }
  }

  // Employee Operations
  async getEmployees() {
    return AppDataSource.getRepository(Employee).find({
      relations: ['department']
    });
  }

  async getEmployeeById(id: number) {
    return AppDataSource.getRepository(Employee).findOne({
      where: { id },
      relations: ['department', 'leaves', 'attendances', 'payrolls', 'travels', 'performances']
    });
  }

  async createEmployee(employeeData: Partial<Employee>) {
    const employeeRepo = AppDataSource.getRepository(Employee);
    const employee = employeeRepo.create(employeeData);
    return employeeRepo.save(employee);
  }

  // Department Operations
  async getDepartments() {
    return AppDataSource.getRepository(Department).find({
      relations: ['employees']
    });
  }

  async getDepartmentById(id: number) {
    return AppDataSource.getRepository(Department).findOne({
      where: { id },
      relations: ['employees']
    });
  }

  // Attendance Operations
  async getAttendanceRecords(date?: Date) {
    const query = AppDataSource.getRepository(Attendance)
      .createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.employee', 'employee');

    if (date) {
      query.where('attendance.date = :date', { date });
    }

    return query.getMany();
  }

  async recordAttendance(attendanceData: Partial<Attendance>) {
    const attendanceRepo = AppDataSource.getRepository(Attendance);
    const attendance = attendanceRepo.create(attendanceData);
    return attendanceRepo.save(attendance);
  }

  // Leave Operations
  async getLeaveRequests(status?: string) {
    const query = AppDataSource.getRepository(Leave)
      .createQueryBuilder('leave')
      .leftJoinAndSelect('leave.employee', 'employee');

    if (status) {
      query.where('leave.status = :status', { status });
    }

    return query.getMany();
  }

  async createLeaveRequest(leaveData: Partial<Leave>) {
    const leaveRepo = AppDataSource.getRepository(Leave);
    const leave = leaveRepo.create(leaveData);
    return leaveRepo.save(leave);
  }

  // Payroll Operations
  async getPayrollRecords(month?: string, year?: number) {
    const query = AppDataSource.getRepository(Payroll)
      .createQueryBuilder('payroll')
      .leftJoinAndSelect('payroll.employee', 'employee');

    if (month && year) {
      query.where('payroll.month = :month AND payroll.year = :year', { month, year });
    }

    return query.getMany();
  }

  async processPayroll(payrollData: Partial<Payroll>) {
    const payrollRepo = AppDataSource.getRepository(Payroll);
    const payroll = payrollRepo.create(payrollData);
    return payrollRepo.save(payroll);
  }

  // Performance Operations
  async getPerformanceRecords(employeeId?: number) {
    const query = AppDataSource.getRepository(Performance)
      .createQueryBuilder('performance')
      .leftJoinAndSelect('performance.employee', 'employee');

    if (employeeId) {
      query.where('employee.id = :employeeId', { employeeId });
    }

    return query.getMany();
  }

  async recordPerformance(performanceData: Partial<Performance>) {
    const performanceRepo = AppDataSource.getRepository(Performance);
    const performance = performanceRepo.create(performanceData);
    return performanceRepo.save(performance);
  }

  // Travel Operations
  async getTravelRequests(status?: string) {
    const query = AppDataSource.getRepository(Travel)
      .createQueryBuilder('travel')
      .leftJoinAndSelect('travel.employee', 'employee');

    if (status) {
      query.where('travel.status = :status', { status });
    }

    return query.getMany();
  }

  async createTravelRequest(travelData: Partial<Travel>) {
    const travelRepo = AppDataSource.getRepository(Travel);
    const travel = travelRepo.create(travelData);
    return travelRepo.save(travel);
  }

  // User Operations
  async getUserByEmail(email: string) {
    return AppDataSource.getRepository(User).findOne({
      where: { email }
    });
  }

  async createUser(userData: Partial<User>) {
    const userRepo = AppDataSource.getRepository(User);
    const user = userRepo.create(userData);
    return userRepo.save(user);
  }

  // Statistics and Reports
  async getDepartmentStatistics() {
    return AppDataSource.getRepository(Department)
      .createQueryBuilder('department')
      .loadRelationCountAndMap('department.employeeCount', 'department.employees')
      .getMany();
  }

  async getAttendanceStatistics(startDate: Date, endDate: Date) {
    return AppDataSource.getRepository(Attendance)
      .createQueryBuilder('attendance')
      .select([
        'attendance.status',
        'COUNT(attendance.id) as count',
        'attendance.date'
      ])
      .where('attendance.date BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('attendance.status, attendance.date')
      .getRawMany();
  }

  async getLeaveStatistics(year: number) {
    return AppDataSource.getRepository(Leave)
      .createQueryBuilder('leave')
      .select([
        'leave.type',
        'COUNT(leave.id) as count',
        'STRFTIME("%m", leave.startDate) as month'
      ])
      .where('STRFTIME("%Y", leave.startDate) = :year', { year: year.toString() })
      .groupBy('leave.type, month')
      .getRawMany();
  }
}