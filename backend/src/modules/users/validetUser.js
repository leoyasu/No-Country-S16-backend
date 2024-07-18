import z from "zod";

import { parseValidationResult } from "../../config/utils/parseData.js";

const registerUser = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(8).max(25),
  role: z.string().min(3).max(20).optional(),
});

const loginUserSchema = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(8).max(25),
});

export const validateRegister = (data) => {
  const result = registerUser.safeParse(data);
  const { hasError, errorMessages, userData } = parseValidationResult(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};

export const validateLogin = (data) => {
  const result = loginUserSchema.safeParse(data);
  const {
    hasError,
    errorMessages,
    data: userData,
  } = parseValidationResult(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};

export const validateUpdate = (data) => {
  const result = registerUser.partial().safeParse(data);

  const {
    hasError,
    errorMessages,
    data: userData,
  } = parseValidationResult(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};
