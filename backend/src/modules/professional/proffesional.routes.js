import express from "express";
import { findAllProfessional } from "./proffesional.control.js";

export const router = express.Router();

router.route("/").get(findAllProfessional);
