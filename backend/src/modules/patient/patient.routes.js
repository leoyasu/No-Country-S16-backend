import express from "express";
import {
  createPatient,
  deletePatient,
  findAllPatient,
  findOnePatient,
  updatePatient,
} from "./patient.control.js";
export const router = express.Router();

router.route("/").get(findAllPatient).post(createPatient);

router
  .route("/:id")
  .get(findOnePatient)
  .patch(updatePatient)
  .delete(deletePatient);
