import AppDataSource from "../config/data-source";
import User from "../entities/userEntity";
import Credential from "../entities/credentialEntity";
import Appointment from "../entities/appointmentEntity";

export const userRepository = AppDataSource.getRepository(User);
export const credentialRepositry = AppDataSource.getRepository(Credential);
export const appointmentRepository = AppDataSource.getRepository(Appointment);