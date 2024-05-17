import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Washplan } from 'src/washplan/entities/washplan.entity';

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
  year: number;

  @OneToOne(() => Washplan, { cascade: true })
  @JoinColumn()
  washplan: Washplan | null;

  @ManyToOne(() => User, (user) => user.vehicles)
  user: User;
}
