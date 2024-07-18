import Doctor from "./proffesional.model.js";

export class ProffesionalService {
  async findAll() {
    return await Doctor.findAll({});
  }
}
