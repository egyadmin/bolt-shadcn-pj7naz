import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from './Employee';

@Entity('travel')
export class Travel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Employee, employee => employee.travels)
  employee: Employee;

  @Column()
  destination: string;

  @Column()
  purpose: string;

  @Column()
  purposeEn: string;

  @Column({ type: 'date' })
  departureDate: Date;

  @Column({ type: 'date' })
  returnDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  allowancePerDay: number;

  @Column({ nullable: true })
  hotelName: string;

  @Column()
  ticketType: 'round-trip' | 'one-way';

  @Column({
    type: 'enum',
    enum: ['pending', 'approved', 'completed', 'cancelled'],
    default: 'pending'
  })
  status: 'pending' | 'approved' | 'completed' | 'cancelled';

  @Column({ nullable: true })
  approvedBy: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}