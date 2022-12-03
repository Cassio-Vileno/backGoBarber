import { Router } from "express";
import appointmentsRouter from "./appointmentss.routes";

const routes = Router();

routes.use('/appointements', appointmentsRouter);

export default routes;