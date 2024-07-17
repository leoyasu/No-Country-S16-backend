import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database/database.js";
import { encryptedPassword } from "../../config/plugins/encryptPassword.js";
import bcrypt from "bcrypt"; // Importa bcrypt para generar contraseñas seguras

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
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: "", 
    },
    role: {
      type: DataTypes.ENUM("admin", "user", "patient", "professional"),
      allowNull: false,
      defaultValue: "user",
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
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (!user.password) {
          const generatedPassword = await bcrypt.hash("password", 10);
          user.password = generatedPassword;
        }

        if (user.changed("password")) {
          user.password = await encryptedPassword(user.password);
        }

        if (!user.profilePicture) {
          user.profilePicture = DEFAULT_PROFILE_PICTURE_URL;
        }
      },
    },
  }
);

export default User;
