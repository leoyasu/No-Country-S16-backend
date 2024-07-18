import express from "express";
import {
  deleteUser,
  findAllUser,
  findOneUser,
  login,
  register,
  updateUser,
} from "./userController.js";
import passport from "../../config/google/passport.js";

export const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.route("/").get(findAllUser);

router.route("/:id").get(findOneUser).patch(updateUser).delete(deleteUser);


router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Aquí puedes enviar una respuesta JSON con el token de autenticación o cualquier otra información necesaria
    res.status(200).json({ message: "Authentication successful", user: req.user });
  }
);


