import Patient from "../../modules/patient/patientModel.js";
import Doctor from "../../modules/professional/proffesional.model.js";
import User from "../../modules/users/userModel.js";
import Appointment from "../../modules/appointment/appointment.model.js";


import Diagnosis from "../../modules/diagnosis/diagnosisModel.js";

export const initModel = () => {
  User.hasOne(Patient, { foreignKey: "userId" });
  Patient.belongsTo(User, { foreignKey: "userId" });
  User.hasOne(Doctor, { foreignKey: "userId" });
  Doctor.belongsTo(User, { foreignKey: "userId" });

  Doctor.hasMany(Appointment, { foreignKey: "professionalId" });
  Appointment.belongsTo(Doctor, { foreignKey: "professionalId" });
  Patient.hasMany(Appointment, { foreignKey: "patientId" });
  Appointment.belongsTo(Patient, { foreignKey: "patientId" });
  
  Doctor.hasMany(Diagnosis, { foreignKey: 'doctorId' });
  Diagnosis.belongsTo(Doctor, { foreignKey: 'doctorId' });
  
  Patient.hasMany(Diagnosis, { foreignKey: 'patientId' });
  Diagnosis.belongsTo(Patient, { foreignKey: 'patientId' });
};
