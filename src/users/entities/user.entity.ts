import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../role.enum';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  birthDate: Date;
  @Column()
  email: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: Role,
    default: [Role.User],
  })
  role: Role;
  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
