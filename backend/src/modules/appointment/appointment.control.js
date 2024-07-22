import Appointment from "./appointment.model.js";
import { catchAsync } from "../../errors/catchAsync.js";
import { AppError } from "../../errors/appError.js";
import { AppointmentService } from "../appointment/appointment.service.js";
import { PatientService } from "../patient/patient.service.js";
import { ProffesionalService } from "../professional/proffesional.service.js";

const appointmentService = new AppointmentService();
const patientService = new PatientService();
const professionalService = new ProffesionalService();

export const findAllAppointments = catchAsync(async (req, res, next) => {
  const appointments = await appointmentService.findAll();

  return res.status(200).json(appointments);
});

export const findOneAppointment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await appointmentService.findOneById(id);

  if (!appointment) {
    return next(new AppError("appointment do not exist", 404));
  }

  return res.status(200).json(appointment);
});

export const findAllbyProfessional = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const professional = await professionalService.findOneById(id);

  if (!professional) {
    return next(new AppError("professional do not exist", 404));
  }

  const appointments = await appointmentService.findAllByProfessional(id);

  if (!appointments) {
    return next(new AppError("appointments doesn't exist", 404));
  }

  return res.status(200).json(appointments);
});

export const findAllByPatient = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const patient = await patientService.findOneById(id);

  if (!patient) {
    return next(new AppError("professional do not exist", 404));
  }

  const appointments = await appointmentService.findAll(id);

  if (!appointments) {
    return next(new AppError("appointments doesn't exist", 404));
  }

  return res.status(200).json(appointments);
});

export const createAppointment = catchAsync(async (req, res, next) => {
  //aca validacion zod

  try {
    const { professionalId, patientId, ...appointmentData } = req.body;

    const professional = await professionalService.findOneById(professionalId);
    const patient = await patientService.findOneById(patientId);

    if (!professional || !patient) {
      return next(new AppError("User(/s) do not exist", 404));
    }

    const newAppointment = await appointmentService.createAppointment({
      professionalId,
      patientId,
      ...appointmentData,
    });

    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating appointment",
      error: error.message,
    });
  }
});

export const updateAppointment = catchAsync(async (req, res, next) => {
  //aca validacion zod

  try {
    const { id } = req.params;
    const appointmentData = req.body;

    const appointment = await appointmentService.findOneById(id);

    if (!appointment) {
      return next(new AppError("appointment do not exist", 404));
    }

    const updatedAppointment = await appointmentService.updateAppointment(
      appointment,
      appointmentData
    );

    return res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({
      message: "Error updating appointment",
      error: error.message,
    });
  }
});

export const deleteAppointment = catchAsync(async (req, res, next) => {
  //zod

  const { id } = req.params;

  const appointment = await appointmentService.findOneById(id);

  if (!appointment) {
    return next(new AppError("appointment do not exist", 404));
  }

  await appointmentService.deleteAppointment(appointment);

  return res.status(200).json("Appoitment deleted");
});
