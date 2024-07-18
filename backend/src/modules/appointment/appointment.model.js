import { sequelize } from "../../config/database/database.js";
import { DataTypes } from "sequelize";
import Doctor from "../professional/proffesional.model.js";
import Patient from "../patient/patientModel.js";

const Professional = Doctor;

const Appointment = sequelize.define("appointment", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  professionalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Professional,
      key: "id",
    },
  },
  patientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Patient,
      key: "id",
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("accepted", "completed", "cancelled"),
    allowNull: false,
    defaultValue: "accepted",
  },
});

export default Appointment;
