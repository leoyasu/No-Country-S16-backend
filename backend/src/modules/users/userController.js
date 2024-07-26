import { verifyPassword } from "../../config/plugins/encryptPassword.js";
import generateJWT from "../../config/plugins/generateJwt.js";
import { AppError } from "../../errors/appError.js";
import { catchAsync } from "../../errors/catchAsync.js";
import Patient from "../patient/patientModel.js";
import Doctor from "../professional/proffesional.model.js";
import { UserServices } from "./userService.js";
import {
  validateLogin,
  validateRegister,
  validateUpdate,
} from "./validetUser.js";

const userServices = new UserServices();

export const login = catchAsync(async (req, res, next) => {
  const { errorMessages, hasError, userData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const user = await userServices.findUserByEmail(userData.email);

  if (!user) {
    return next(new AppError("This user does not exist", 404));
  }

  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError("Password is not correct", 401));
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    user: {
      role: user.role,
      email: user.email,
      googleId: user.googleId,
      profilePicture: user.profilePicture,
    },
  });
});

export const register = catchAsync(async (req, res, next) => {
  const { errorMessages, hasError, userData } = validateRegister(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const user = await userServices.createUser(userData);

  if (userData.role == "patient") {
    await Patient.create({ userId: user.id, ...userData.patientsDetails });
  } else if (userData.role === "doctor") {
    await Doctor.create({ userId: user.id, ...userData.doctorDetails });
  }
  const token = await generateJWT(user.id);

  return res.status(201).json({
    token,
    user: {
      googleId: user.googleId,
      email: user.email,
      role: user.role,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUpdate(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessages,
    });
  }

  const { id } = req.params;

  const user = await userServices.findOneByid(id);

  if (!user) {
    return next(new AppError("user do not exist", 404));
  }
  
  const updatedUser = await userServices.updateUser(user, userData);

  return res.status(200).json(updatedUser);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await userServices.findOneByid(id);

  if (!user) {
    return next(new AppError("user do not exist", 404));
  }

  await userServices.deleteUser(user);

  return res.status(200).json("User delete");
});

export const findAllUser = catchAsync(async (req, res, next) => {
  const user = await userServices.findAll();

  return res.status(200).json(user);
});

export const findOneUser = catchAsync(async (req, res, next) => {
  const { id, email } = req.params;

  let user;
  if (id) {
    user = await userServices.findOneByid(id);
  } else if (email) {
    user = await userServices.findUserByEmail(email);
  } else {
    return next(new AppError("Please provide either id or email", 400));
  }

  if (!user) {
    return next(new AppError("user do not exist", 404));
  }

  return res.status(200).json(user);
});
