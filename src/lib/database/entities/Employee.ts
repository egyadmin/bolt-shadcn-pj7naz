import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Department } from './Department';
import { Leave } from './Leave';
import { Attendance } from './Attendance';
import { Payroll } from './Payroll';
import { Travel } from './Travel';
import { Performance } from './Performance';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  employeeId: string;

  @Column()
  name: string;

  @Column()
  nameEn: string;

  @Column()
  email: string;

  @Column()
  position: string;

  @Column()
  positionEn: string;

  @Column({ type: 'date' })
  joinDate: Date;

  @Column({
    type: 'enum',
    enum: ['active', 'onLeave', 'terminated'],
    default: 'active'
  })
  status: 'active' | 'onLeave' | 'terminated';

  @Column()
  nationality: string;

  @Column()
  nationalityEn: string;

  @Column()
  iqamaNumber: string;

  @Column()
  passportNumber: string;

  @Column()
  contractType: string;

  @Column()
  contractTypeEn: string;

  @ManyToOne(() => Department, department => department.employees)
  department: Department;

  @OneToMany(() => Leave, leave => leave.employee)
  leaves: Leave[];

  @OneToMany(() => Attendance, attendance => attendance.employee)
  attendances: Attendance[];

  @OneToMany(() => Payroll, payroll => payroll.employee)
  payrolls: Payroll[];

  @OneToMany(() => Travel, travel => travel.employee)
  travels: Travel[];

  @OneToMany(() => Performance, performance => performance.employee)
  performances: Performance[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}