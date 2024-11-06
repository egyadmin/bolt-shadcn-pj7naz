import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from './Employee';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, employee => employee.attendances)
  employee: Employee;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time', nullable: true })
  checkIn: string;

  @Column({ type: 'time', nullable: true })
  checkOut: string;

  @Column({
    type: 'enum',
    enum: ['present', 'absent', 'late', 'halfDay'],
    default: 'present'
  })
  status: 'present' | 'absent' | 'late' | 'halfDay';

  @Column({ nullable: true })
  lateReason: string;

  @Column({ nullable: true })
  location: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}