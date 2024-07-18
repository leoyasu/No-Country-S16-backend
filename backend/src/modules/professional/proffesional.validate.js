import z from "zod";
import { parseValidationResult } from "../../config/utils/parseData";

const proffesionalShema = z.object({
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
  specialty: z.string().max(1000).optional(),
  consults: z.string().min(3).max(50).optional(),
  matricule: z.string().min(5).max(20).optional(),
  coveragePlan: z.string().min(3).max(50).optional(),
});

export const validateProffesional = (data) => {
  const result = proffesionalShema.safeParse(data);

  const { errorMessages, hasError, userData } = parseValidationResult(result);
  return {
    hasError,
    errorMessages,
    userData,
  };
};

export const validateUpdateProffesional = (data) => {
  const result = proffesionalShema.partial().safeParse(data);

  const { errorMessages, hasError, userData } = parseValidationResult(result);

  return { hasError, errorMessages, userData };
};
