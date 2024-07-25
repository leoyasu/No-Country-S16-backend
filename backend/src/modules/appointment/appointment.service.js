import Appointment from "./appointment.model.js";
import { sendEmail } from "../../config/plugins/sendEmail.js";

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

  async findOverlapingAppointment(appointment) {
    const professionalOverlap = await this.findProfessionalOverlap(
      appointment.professionalId,
      appointment.date,
      appointment.time
    );

    const patientOverlap = await this.findPatientOverlap(
      appointment.patientId,
      appointment.date,
      appointment.time
    );

    if (professionalOverlap || patientOverlap) {
      return true;
    }

    return false;
  }

  async findProfessionalOverlap(professionalId, date, time) {
    return await Appointment.findOne({
      where: {
        professionalId,
        date,
        time,
      },
    });
  }

  async findPatientOverlap(patientId, date, time) {
    return await Appointment.findOne({
      where: {
        patientId,
        date,
        time,
      },
    });
  }

  async sendNotificationEmail(
    professionalEmail,
    patientEmail,
    emailSubject,
    emailText
  ) {
    await sendEmail(professionalEmail, emailSubject, emailText);
    await sendEmail(patientEmail, emailSubject, emailText);
  }
}
