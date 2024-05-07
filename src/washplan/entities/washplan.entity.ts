import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
}
