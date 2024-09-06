import { Request, Response } from "express";
import { getAppointmentByIdService, getAllAppointmentService, scheduleAppointmentService, cancelAppointmentService } from "../services/appointmentService";
import Appointment from "../entities/appointmentEntity";
import IScheduleAppointment from "../dtos/IScheduleAppointment";

export const getAllApointmentController = async (
    req: Request,
    res: Response
) => {
    try {
        const allAppointment: Appointment[] = await getAllAppointmentService()
        res.status(200).json(allAppointment)
    } catch (error: any) {
        res.status(404).json({message: error});
    };
};

export const getAppointmetnByIdController = async (
    req: Request<{turnId: string}>,
    res: Response
) => {
    const { turnId } = req.params;
    try {
        const appointmentId: Appointment = await getAppointmentByIdService(Number(turnId));
        res.status(200).json(appointmentId)
    } catch (error: any) {
        res.status(404).json({message: error.message})
    };
};

export const scheduleAppointmentController = async (
    req: Request<{}, {}, IScheduleAppointment>,
    res: Response
): Promise<void> => {
    const { date, time, description, userId } = req.body;
    try {
        const newAppointment: Appointment = await scheduleAppointmentService({
            date, time, description, userId
        });
        res.status(201).json(newAppointment);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    };
};

export const cancelAppointmentController = async (
    req: Request<{turnId: String}>,
    res: Response
) => {
    const { turnId } = req.params;
    try {
        await cancelAppointmentService(Number(turnId));
        res.status(200).json(`the appointment with turn :${turnId} was canceled`);
    } catch (error: any) {
        res.status(404).json({message: error.message});
    };
};