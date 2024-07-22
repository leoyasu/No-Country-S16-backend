import Patient from "./patientModel.js";

export class PatientService {
  async findAll() {
    return await Patient.findAll({
      where: {
        status: true,
      },
    });
  }

  async createPatient(data) {
    return await Patient.create(data);
  }

  async findOneById(id) {
    return await Patient.findOne({
      where: {
        id,
        status: true,
      },
    });
  }

  async updatePatient(user, data) {
    return await user.update(data);
  }

  async deletePatient(user) {
    return await user.update({
      status: false,
    });
  }
}
