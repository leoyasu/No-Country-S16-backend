import express from "express";
import { findAllPatient } from "./patient.control.js";
export const router = express.Router();

router.route("/").get(findAllPatient);
