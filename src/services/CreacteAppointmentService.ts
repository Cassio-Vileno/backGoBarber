import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";

import Appointement from "../models/apponintment";
import AppointementsRepository from "../repolitories/AppointmentsRepository";

    interface Request {
        provider_id: string;
        date: Date
    }

class CreateAppointmentService {

    public async execute({date, provider_id}: Request): Promise<Appointement> {
        const appointmentsRepository = getCustomRepository(AppointementsRepository)
        const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
        appointmentDate
        );

    if(await findAppointmentInSameDate) {
        throw Error("This appointment is already booked");
    }

    const appointement = appointmentsRepository.create({
        provider_id,
        date: appointmentDate
    })
    await appointmentsRepository.save(appointement)

    return appointement;
    }
}

export default CreateAppointmentService;