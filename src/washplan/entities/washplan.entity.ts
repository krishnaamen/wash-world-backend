import { Vehicle } from 'src/vehicle/entities/vehicle.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Washplan {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  washplanName: string;
  @Column()
  washplanPrice: number;
  @Column()
  validuntil: Date;
  @Column()
  active: boolean;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.washplan)
  vehicle: Vehicle;
}
