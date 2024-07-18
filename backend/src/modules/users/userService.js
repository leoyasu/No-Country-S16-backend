import Patient from "../patient/patientModel.js";
import Doctor from "../professional/proffesional.model.js";
import User from "./userModel.js";

export class UserServices {
  async findAll() {
    return await User.findAll({
      where: {
        status: true,
      },
    });
  }
  async findOneByid(id) {
    return await User.findOne({
      where: {
        id,
        status: true,
      },
    });
  }
  async createUser(data) {
    const user = await User.create(data);

    if (data.role === "patient") {
      await Patient.create({ userId: user.id, ...data.patientDetails });
    } else if (data.role === "doctor") {
      await Doctor.create({ userId: user.id, ...data.doctorDetails });
    }

    return user;
  }

  async updateUser(user, data) {
    return await user.update(data);
  }

  async deleteUser(user) {
    return await user.update({
      status: false,
    });
  }

  async findUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }
}
