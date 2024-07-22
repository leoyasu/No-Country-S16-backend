import express from "express";
import { router as userRouter } from "../modules/users/userRoutes.js";
import { router as patientRouter } from "../modules/patient/patient.routes.js";
import { router as proffesionalRouter } from "../modules/professional/proffesional.routes.js";
import { router as appointmentRouter } from "../modules/appointment/appointment.routes.js";
export const router = express.Router();

router.use("/users", userRouter);
router.use("/patients", patientRouter);
router.use("/proffesional", proffesionalRouter);
router.use("/appointment", appointmentRouter)