import zod from "zod";

import { parseValidationResult } from "../../config/utils/parseData";

const registerUser = zod.object({
  name: z.string().min(3).max(20),
  surname: z.string().min(3).max(20),
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(8),
});

const loginUserSchema = z.object({
  email: z.string().email({ message: "invalid email" }),
  password: z.string().min(8).max(25),
});

export const validateRegister = (data) => {
  const result = registerUser.safeParse(data);

  const { hasError, errorMessages, userData } = extractValidationData(result);

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
  } = extractValidationData(result);

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
  } = extractValidationData(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};
