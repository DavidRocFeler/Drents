import { DataSource } from "typeorm";
import { DB_PORT, DB_HOST, DB_NAME, DB_USERNAME, DB_PASSWORD } from "./envs";
import User from "../entities/userEntity";
import Appointment from "../entities/appointmentEntity";
import Credential from "../entities/credentialEntity";

const AppDataSource = new DataSource({
    type: "postgres",
    port: Number(DB_PORT) || 5432,
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Appointment, Credential],
    migrations: [],
    subscribers: [],
});

export default AppDataSource;
