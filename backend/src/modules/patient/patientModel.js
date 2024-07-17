import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js"; // Asegúrate de que esta ruta sea correcta
import User from "../users/userModel.js";

const Patient = sequelize.define("patient", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  medicalHistory: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  obraSocial: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  numberAfiled: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  coveragePlan: {
    allowNull: true,
    type: DataTypes.STRING,
  },
});

export default Patient;
