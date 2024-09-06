import { Request, Response, NextFunction } from "express";
import IScheduleAppointment from "../dtos/IScheduleAppointment";

const appoimentValidate = (
    req: Request<{},{},IScheduleAppointment>,
    res: Response,
    next: NextFunction
) => {
    const { date, time, description } = req.body;
    console.log(date);
    
    try {
        if(!date) throw new Error("Este campo es requerido");
        const dateRegex = /\d{4}-\d{2}-\d{2}/;
        if (!dateRegex.test(date))
            throw new Error("the fiel birthdate must be: yyyy-mm-dd");
        const appoimentDate = new Date(date);        
        const today = new Date();
        today.setHours(0,0,0,0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1 );
        const in14days = new Date(today);
        in14days.setDate(in14days.getDate() + 14 );

        if (appoimentDate < tomorrow || appoimentDate > in14days) {
            throw new Error("La fecha debe ser apartir de mañana y no debe ser posterior a 14 dias")
        }

        //validacion de timepo 
        if(!time) throw new Error("El campo time es requerido");
        const validTimes = [
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
        ];
        if(!validTimes.includes(time)) {
            throw new Error(
                "The time field must be required in 60-minute intervals from 9:00 to 17:00"
            );
        }

        // descripcion
        if(!description) throw new Error("El campo de descripcion es requerido");
        if( typeof description !== "string")
            throw new Error("El campo de descripcion debe ser un string");
        if(description.length < 4 || description.length > 50)
            throw new Error("El campo descripcion debe tener entre 4 y 50 caracteres");
    } catch (error) {
        if(error instanceof Error) {
            return res.status(400).json({error: error.message});
        }
    }
    next();
};

export default appoimentValidate;