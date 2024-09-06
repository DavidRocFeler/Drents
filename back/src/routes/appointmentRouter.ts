import { Router } from "express";
import { cancelAppointmentController, getAllApointmentController, getAppointmetnByIdController, scheduleAppointmentController } from "../controllers/appointmentController";
import appoimentValidate from "../middlewares/appointmentValidate";

const appointmentRouter: Router = Router();

appointmentRouter.get("/", getAllApointmentController);
appointmentRouter.get("/:turnId", getAppointmetnByIdController);
appointmentRouter.post("/schedule",appoimentValidate, scheduleAppointmentController);
appointmentRouter.put("/cancel/:turnId", cancelAppointmentController);

export default appointmentRouter;