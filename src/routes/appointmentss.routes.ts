import { Router } from "express";
import { parseISO } from 'date-fns'
import CreateAppointmentService from "../services/CreacteAppointmentService";
import AppointementsRepository from "../repolitories/AppointmentsRepository"

const appointmentsRouter = Router();
const appointementsRepository = new AppointementsRepository();

appointmentsRouter.get('/', (request, response) => {
    const appointement = appointementsRepository.all();

    return response.json(appointement);
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const {provider, date } = request.body;
    
    const parsedDate = parseISO(date);

    const creacteAppointment = new CreateAppointmentService(appointementsRepository);

    const appointement = creacteAppointment.execute({ date: parsedDate, provider });
    
    return response.json(appointement);
  } catch (err: any) {
      return response.status(400).json({error: err.message})
  }
});

export default appointmentsRouter; 