import { promisify } from "util";
import jwt from "jsonwebtoken";
import { catchAsync } from "../../errors/catchAsync.js";
import { ProffesionalService } from "./proffesional.service.js";
import {
  validateProffesional,
  validateUpdateProffesional,
} from "./proffesional.validate.js";
import { envs } from "../../config/enviroments/enviroments.js";
import { AppError } from "../../errors/appError.js";

const proffesionalService = new ProffesionalService();

export const findAllProfessional = catchAsync(async (req, res, next) => {
  const proffesional = await proffesionalService.findAll();

  return res.status(200).json(proffesional);
});

export const createProffesional = catchAsync(async (req, res, next) => {
  const { errorMessages, hasError, userData } = validateProffesional(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = await promisify(jwt.verify)(token, envs.SECRET_JWD_SEED);
  const userId = decodedToken.id;

  const existingProffesional = await proffesionalService.findOneById(userId);

  if (existingProffesional) {
    return res.status(400).json({
      status: "error",
      message: "El usuario ya es un Proffesional registrado.",
    });
  }

  const proffesionalData = { ...userData, userId };
  const proffesional = await proffesionalService.createProffesional(
    proffesionalData
  );

  return res.status(201).json({
    status: "success",
    data: proffesional,
  });
});

export const findOneProffesional = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const proffesional = await proffesionalService.findOneById(id);

  if (!proffesional) {
    return next(new AppError("proffesional do not exist", 404));
  }

  return res.status(200).json(proffesional);
});

export const deleteProffesional = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const proffesional = await proffesionalService.findOneById(id);

  if (!proffesional) {
    return next(new AppError("Proffesional do not exist", 404));
  }

  await proffesionalService.deleteProfesional(proffesional);

  return res.status(200).json("Delete Proffesional");
});

export const updateProffesional = catchAsync(async (req, res, next) => {
  const { errorMessages, hasError, userData } = validateUpdateProffesional(
    req.body
  );

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const { id } = req.params;

  const proffesional = await proffesionalService.findOneById(id);
  if (!proffesional) {
    return next(new AppError("Proffesional do not exist", 404));
  }

  const updateProffesional = await proffesionalService.updateProffesional(
    proffesional,
    userData
  );

  return res.status(200).json(updateProffesional);
});
