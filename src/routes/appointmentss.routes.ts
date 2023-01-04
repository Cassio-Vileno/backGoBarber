import { Router } from "express";
import { getCustomRepository } from "typeorm";
import { parseISO } from 'date-fns'

import CreateAppointmentService from "../services/CreacteAppointmentService";
import AppointmentsRepository from "../repolitories/AppointmentsRepository";

import ensureAuthenticated from "../middlewares/ensureAutehenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointementsRepository = getCustomRepository(AppointmentsRepository)
    const appointement = await appointementsRepository.find();

    return response.json(appointement);
});

appointmentsRouter.post('/', async (request, response) => {
    const {provider_id, date } = request.body;
    console.log(date)
    
    const parsedDate = parseISO(date);
    
    const creacteAppointment = new CreateAppointmentService();
    const appointement = await creacteAppointment.execute({ date: parsedDate, provider_id });

      return response.json(appointement);
});

export default appointmentsRouter; 