import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, ManyToOne } from "typeorm";
import User from "./userEntity";

@Entity({
    name: "appointments"
})

class Appointment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "text"})
    date!: string;

    @Column()
    time!: string;

    @Column({default: "ACTIVE"})
    status!: string;

    @Column({type: "text"})
    description!: string

    // relacion de appointments N : N users
    @ManyToOne(()=> User, user => user.appointments)
    @JoinColumn({name: "user_Id"})
    user!: User; 
};

export default Appointment;