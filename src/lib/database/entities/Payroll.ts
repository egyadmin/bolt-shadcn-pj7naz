import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from './Employee';

@Entity('payroll')
export class Payroll {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, employee => employee.payrolls)
  employee: Employee;

  @Column({ type: 'date' })
  paymentDate: Date;

  @Column()
  month: string;

  @Column()
  year: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  basicSalary: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  housing: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  transport: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  food: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  overtime: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  bonus: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  otherAllowances: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  gosi: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  tax: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  otherDeductions: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  netSalary: number;

  @Column({
    type: 'enum',
    enum: ['pending', 'processed', 'paid'],
    default: 'pending'
  })
  status: 'pending' | 'processed' | 'paid';

  @Column({ nullable: true })
  processedBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}