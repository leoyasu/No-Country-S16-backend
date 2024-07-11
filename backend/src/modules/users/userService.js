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
    return await User.create(data);
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
