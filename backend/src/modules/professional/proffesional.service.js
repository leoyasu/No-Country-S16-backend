import Doctor from "./proffesional.model.js";

export class ProffesionalService {
  async findAll() {
    return await Doctor.findAll({});
  }

  async createProffesional(data) {
    return await Doctor.create(data);
  }

  async findOneById(id) {
    return await Doctor.findOne({
      where: {
        id,
        status: true,
      },
    });
  }

  async updateProffesional(user, data) {
    return await user.update(data);
  }

  async deleteProfesional(user) {
    return await user.update({
      status: false,
    });
  }
}
