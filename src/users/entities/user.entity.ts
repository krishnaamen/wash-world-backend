import { Column ,CreateDateColumn,Entity,PrimaryGeneratedColumn, Timestamp, UpdateDateColumn} from 'typeorm';
import { Roles } from 'src/utility/common/user-roles.enum';
@ Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column({unique: true})
     email: string;
    @Column({select: false})
    password: string;
    @Column({type: 'enum', enum: Roles, array: true, default: [Roles.User]})
    role: Roles []
 @CreateDateColumn()
 createdAt: Timestamp;
 @UpdateDateColumn()
 updatedAt: Timestamp;
 







}


