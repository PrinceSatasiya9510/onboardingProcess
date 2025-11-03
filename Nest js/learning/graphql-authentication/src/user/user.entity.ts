import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("app_users")
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "firstname" })
    firstName: string;

    @Column({ name: "lastname" })
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

}