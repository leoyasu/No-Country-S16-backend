import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";
import Patient from "../patient/patientModel.js";
import Doctor from "../professional/proffesional.model.js";

const Diagnosis = sequelize.define("diagnosis", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  patientId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Patient,
      key: "id"
    },
  },
  doctorId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Doctor,
      key: "id"
    },
  },
  altura: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  peso: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  masaCorporal: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  temperatura: {
    allowNull: false,
    type: DataTypes.FLOAT 
  },
  frecuenciaRespiratoria: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  presionArterial: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  frecuenciaCardiaca: {
    allowNull: false,
    type: DataTypes.FLOAT 
  },
  alergiasAMedicamentos: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  otrasAlergias: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  antecedentesPatologicos: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true // Suponiendo que el valor predeterminado sea verdadero
  }
});

export default Diagnosis;
