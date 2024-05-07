import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Washplan } from 'src/washplan/entities/washplan.entity';

@Entity()
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  licencePlateNumber: string;

  @OneToOne(() => Washplan, { nullable: true })
  washplan: Washplan;

  @ManyToOne(() => User, (user) => user.vehicles)
  user: User;
}
