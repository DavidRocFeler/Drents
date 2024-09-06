import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne } from "typeorm";
import Credential from "./credentialEntity";
import Appointment from "./appointmentEntity";

@Entity({
    name: "users"
})

class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
    
    @Column()
    email!: string;

    @Column()
    birthdate!: string;

    @Column({unique: true})
    nDni!: number

    // relacion  useer 1 : 1 credential
    @OneToOne(()=> Credential)
    @JoinColumn({name:"credential_Id"})
    credential!: Credential;

    // relacion de user 1 : N appointment
    @OneToMany(() => Appointment, appointments => appointments.user)
    appointments!: Appointment[];
};

export default User;