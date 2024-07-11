import express from "express";
import {
  deleteUser,
  findAllUser,
  findOneUser,
  login,
  register,
  updateUser,
} from "./userController.js";

export const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.route("/").get(findAllUser);

router.route("/:id").get(findOneUser).patch(updateUser).delete(deleteUser);
