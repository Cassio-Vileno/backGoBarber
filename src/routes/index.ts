import { Router } from "express";
import appointmentsRouter from "./appointmentss.routes";
import sessionsRouter from "./sessions.routes";
import usersRouter from "./users.routes";

const routes = Router();

routes.use('/appointements', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter)

export default routes;