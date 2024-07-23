import Doctor from "./proffesional.model.js";
import User from "../users/userModel.js";

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
      include: {
        model: User,
        as: "user",
        attributes: ["id", "profilePicture", "email"],
      },
    });
  }

  async updateProffesional(user, data) {
    return await Doctor.update(data);
  }

  async deleteProfesional(user) {
    return await Doctor.update({
      status: false,
    });
  }
}
