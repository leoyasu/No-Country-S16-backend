import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";
import { encryptedPassword } from "../../config/plugins/encryptPassword.js";

const DEFAULT_PROFILE_PICTURE_URL =
  "https://thumbs.dreamstime.com/b/icono-gris-de-perfil-usuario-s%C3%ADmbolo-empleado-avatar-web-y-dise%C3%B1o-ilustraci%C3%B3n-signo-aislado-en-fondo-blanco-191067342.jpg";

const User = sequelize.define(
  "users",
  {
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false,
    },
    role: {
      type: DataTypes.ENUM("admin", "patient", "proffesional"),
      allowNull: false,
      defaultValue: "normal",
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DEFAULT_PROFILE_PICTURE_URL,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await encryptedPassword(user.password);
        if (!user.profilePicture) {
          user.profilePicture = DEFAULT_PROFILE_PICTURE_URL;
        }
      },
    },
  }
);

export default User;
