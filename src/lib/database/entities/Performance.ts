import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from './Employee';

@Entity('performance')
export class Performance {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, employee => employee.performances)
  employee: Employee;

  @Column()
  year: number;

  @Column()
  quarter: number;

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  score: number;

  @Column({ nullable: true })
  feedback: string;

  @Column({ nullable: true })
  feedbackEn: string;

  @Column({ nullable: true })
  goals: string;

  @Column({ nullable: true })
  goalsEn: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'in-review', 'completed'],
    default: 'pending'
  })
  status: 'pending' | 'in-review' | 'completed';

  @Column({ nullable: true })
  reviewedBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}