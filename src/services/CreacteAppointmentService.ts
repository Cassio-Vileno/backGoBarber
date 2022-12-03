import { startOfHour } from "date-fns";
import Appointement from "../models/apponintment";
import AppointementsRepository from "../repolitories/AppointmentsRepository";

    interface Request {
        provider: string;
        date: Date
    }

class CreateAppointmentService {
    private appointementsRepository: AppointementsRepository;

    constructor(appointementsRepository: AppointementsRepository) {
        this.appointementsRepository = appointementsRepository;
    }
    
    public execute({date, provider}: Request): Appointement {
        const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointementsRepository.findByDate(
        appointmentDate
        );

    if(findAppointmentInSameDate) {
        throw Error("This appointment is already booked");
    }

    const appointement = this.appointementsRepository.create({
        provider,
        date: appointmentDate
    })

    return appointement;
    }
}

export default CreateAppointmentService;