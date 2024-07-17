import Patient from "./patientModel.js";

export class PatientService {
  async findAll() {
    return await Patient.findAll({});
  }
}
