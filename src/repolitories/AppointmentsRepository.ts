import Appointement from "../models/apponintment";
import { isEqual } from "date-fns";

interface CreateAppointmentDTO {
    provider: string,
    date: Date
}

class AppointementsRepository {
    private appointements: Appointement[];

    constructor() {
        this.appointements = []
    }

    public all(): Appointement[] {
      return this.appointements;
    }

    public findByDate(date: Date): Appointement | null  {
        const findAppointment = this.appointements.find(appointement => 
            isEqual(date, appointement.date)
        )
        return findAppointment || null;
    }

    public create({ provider, date }: CreateAppointmentDTO): Appointement {
        const appointement = new Appointement({ provider, date })

        this.appointements.push(appointement)

        return appointement;
    };
};

export default AppointementsRepository; 