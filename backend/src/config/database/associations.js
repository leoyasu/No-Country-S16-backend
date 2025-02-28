import Patient from "../../modules/patient/patientModel.js";
import Doctor from "../../modules/professional/proffesional.model.js";
import User from "../../modules/users/userModel.js";

export const initModel = () => {
  User.hasOne(Patient, { foreignKey: "userId" });
  Patient.belongsTo(User, { foreignKey: "userId" });
  User.hasOne(Doctor, { foreignKey: "userId" });
  Doctor.belongsTo(User, { foreignKey: "userId" });
};
