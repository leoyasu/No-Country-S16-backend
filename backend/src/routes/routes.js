import express from "express";
import { router as userRouter } from "../modules/users/userRoutes.js";
export const router = express.Router();

router.use("/users", userRouter);
