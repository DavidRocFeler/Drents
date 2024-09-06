import { appointmentRepository, userRepository } from "../repository/indexRepository";
import Appointment from "../entities/appointmentEntity";
import IScheduleAppointment from "../dtos/IScheduleAppointment";
import User from "../entities/userEntity";

export const getAllAppointmentService = async ():
    Promise<Appointment[]> => {
    const AllAppointment: Appointment[] = await appointmentRepository.find({
        relations: ["user"]
    });
    return AllAppointment;
};

export const getAppointmentByIdService = async (turnId: number):
Promise<Appointment> => {
    const turnAppointment: Appointment | null = await appointmentRepository.findOne({
        where: {id: turnId},
        relations: ["user"]
    })
    if(!turnAppointment) 
        throw new Error(`Appointment with turn: ${turnId} not found`);
    return turnAppointment;
};

export const scheduleAppointmentService = async ( scheduleAppointment: IScheduleAppointment ):
    Promise<Appointment> => {
    const { date, time, description, userId } = scheduleAppointment;
    // validar que el usuario exista para poder programarle una cita 
    const User: User | null = await userRepository.findOneBy({id: userId});
    if(!User) 
        throw new Error(`User with id: ${userId} not found `)
    // pragramamos una cita 
    console.log("userId encontra", User);
    const newAppointment: Appointment  = appointmentRepository.create({
        date, time, description
    });
    // asosiamos la nueva cita con el usuario
    newAppointment.user = User;
    // guardamos en la base de datos
    await appointmentRepository.save(newAppointment);
    return newAppointment;      
};

export const cancelAppointmentService = async ( turnId: number ):
    Promise<void> => {
    const cancelAppointment = await appointmentRepository.findOneBy({id: turnId});
    if(!cancelAppointment)
        throw new Error(`Appointment with turn: ${turnId} not found`)
    // si encontramos la cita la cancelamos 
    cancelAppointment.status = "CANCELED"
    // GUARDO EN BASE DE DATOS
    await appointmentRepository.save(cancelAppointment);
    return; 
};