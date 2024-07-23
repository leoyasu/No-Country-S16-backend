import z from "zod";
import { parseValidationResult } from "../../config/utils/parseData.js";

const patientSchema = z.object({
  name: z.string().min(3).max(20),
  surname: z.string().min(3).max(20),
  birthdate: z.string().refine(
    (date) => {
      const parsedDate = new Date(date);
      return !isNaN(parsedDate);
    },
    {
      message: "Invalid date format. Use YYYY-MM-DD.",
    }
  ),
  medicalHistory: z.string().max(1000).optional(),
  obraSocial: z.string().min(3).max(50).optional(),
  numberAfiled: z.string().min(5).max(20).optional(),
  coveragePlan: z.string().min(3).max(50).optional(),
});

export const validatePatient = (data) => {
  const result = patientSchema.safeParse(data);
  
  const { hasError, errorMessages, userData } = parseValidationResult(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};

export const validateUpdatePatient = (data) => {
  const result = patientSchema.partial().safeParse(data);

  const { errorMessages, hasError, userData } = parseValidationResult(result);
  return { hasError, errorMessages, userData };
};
