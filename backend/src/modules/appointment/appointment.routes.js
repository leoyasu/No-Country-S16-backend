import express from "express";
import {
  createAppointment,
  findAllAppointments,
  findAllByPatient,
  findAllbyProfessional,
  findOneAppointment,
  updateAppointment,
  deleteAppointment,
} from "./appointment.control.js";

export const router = express.Router();

router.route("/").get(findAllAppointments).post(createAppointment);

router
  .route("/:id")
  .get(findOneAppointment)
  .patch(updateAppointment)
  .delete(deleteAppointment);

router.route("/patient/:id").get(findAllByPatient);

router.route("/professional/:id").get(findAllbyProfessional);
