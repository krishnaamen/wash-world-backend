import { User } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Washplan } from '../../washplan/entities/washplan.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  licencePlateNumber: string;

  @Column()
  model: string;

  @Column()
  color: string;

  @Column()
  year: string;

  @OneToOne(() => Washplan, { cascade: true })
  @JoinColumn()
  washplan: Washplan | null;

  @ManyToOne(() => User, (user) => user.vehicles)
  user: User;
}
