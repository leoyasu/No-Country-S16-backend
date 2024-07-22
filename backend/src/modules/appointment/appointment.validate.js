import z from "zod";
import { parseValidationResult } from "../../config/utils/parseData.js";

const appointmentSchema = z.object({
  professionalId: z.string().min(1).max(6),
  patientId: z.string().min(1).max(6),
  date: z.string().date(),
  time: z.string().time(),
  status: z.enum(["accepted", "completed", "cancelled"]),
});

export const validateAppointment = (data) => {
  const result = appointmentSchema.safeParse(data);

  const { hasError, errorMessages, userData } = parseValidationResult(result);

  return {
    hasError,
    errorMessages,
    userData,
  };
};

export const validateUpdateAppointment = (data) => {
  const result = appointmentSchema.partial().safeParse(data);

  const { errorMessages, hasError, userData } = parseValidationResult(result);
  return { hasError, errorMessages, userData };
};
