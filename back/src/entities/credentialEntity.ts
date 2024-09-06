import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({
    name: "credentials"
})

class Credential {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({unique: true})
    username!: string

    @Column({unique: true})
    password!: string
}

export default Credential;