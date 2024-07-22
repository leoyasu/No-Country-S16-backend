import Appointment from "./appointment.model.js";

export class AppointmentService {
  async findAll() {
    return await Appointment.findAll({
      where: {
        status: "accepted",
      },
    });
  }

  async createAppointment(data) {
    return await Appointment.create(data);
  }

  async findOneById(id) {
    return await Appointment.findOne({
      where: {
        id,
        status: "accepted",
      },
    });
  }

  async findAllByProfessional(professionalId) {
    return await Appointment.findAll({
      where: {
        professionalId,
        //status: "accepted",
      },
    });
  }

  async findAllByPatient(patientId) {
    return await Appointment.findAll({
      where: {
        patientId,
        //status: "accepted",
      },
    });
  }

  async updateAppointment(appointment, data) {
    return await appointment.update(data);
  }

  async deleteAppointment(appointment) {
    return await appointment.update({
      status: "cancelled",
    });
  }
}
