import express from "express";
import {
  createProffesional,
  findAllProfessional,
  findOneProffesional,
  updateProffesional,
} from "./proffesional.control.js";
import { deletePatient } from "../patient/patient.control.js";

export const router = express.Router();

router.route("/").get(findAllProfessional).post(createProffesional);

router
  .route("/:id")
  .get(findOneProffesional)
  .patch(updateProffesional)
  .delete(deletePatient);
