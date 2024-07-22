import jwt from "jsonwebtoken";
import { catchAsync } from "../../errors/catchAsync.js";
import { PatientService } from "./patient.service.js";
import { validatePatient, validateUpdatePatient } from "./patient.validate.js";
import { promisify } from "util";
import { envs } from "../../config/enviroments/enviroments.js";
import { AppError } from "../../errors/appError.js";
import { log } from "console";

const patientService = new PatientService();

export const findAllPatient = catchAsync(async (req, res, next) => {
  const patient = await patientService.findAll();

  return res.status(200).json(patient);
});

export const createPatient = catchAsync(async (req, res, next) => {
  const { errorMessages, hasError, userData } = validatePatient(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  const decodeToken = await promisify(jwt.verify)(token, envs.SECRET_JWD_SEED);
  const userId = parseInt(decodeToken.id);

  const existingPatient = await patientService.findOneById(userId);

  if (existingPatient) {
    return res.status(400).json({
      status: "error",
      message: "El usuario ya es un paciente registrado.",
    });
  }

  const patientData = { ...userData, userId };

  const patient = await patientService.createPatient(patientData);

  return res.status(201).json({
    status: "success",
    data: patient,
  });
});

export const findOnePatient = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const patient = await patientService.findOneById(id);

  if (!patient) {
    return next(new AppError("patient do not exist", 404));
  }
  return res.status(200).json(patient);
});

export const deletePatient = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const patient = await patientService.findOneById(id);

  if (!patient) {
    return next(new AppError("patient do not exist", 404));
  }

  await patientService.deletePatient(patient);

  return res.status(200).json("Patient Delete");
});

export const updatePatient = catchAsync(async (req, res, nest) => {
  const { errorMessages, hasError, userData } = validateUpdatePatient(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const { id } = req.params;

  const patient = await patientService.findOneById(id);

  if (!patient) {
    return next(new AppError("Patient do not exist", 404));
  }

  const updatePatient = await patientService.updatePatient(patient, userData);

  return res.status(200).json(updatePatient);
});
