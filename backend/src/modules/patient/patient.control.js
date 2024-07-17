import { catchAsync } from "../../errors/catchAsync.js";
import { PatientService } from "./patient.service.js";

const patientService = new PatientService();

export const findAllPatient = catchAsync(async (req, res, next) => {
  const patient = await patientService.findAll();

  return res.status(200).json(patient);
});
