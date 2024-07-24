import z from "zod";
import {
  parseValidationResult,
  parseDate,
} from "../../config/utils/parseData.js";

const appointmentSchema = z.object({
  professionalId: z.string().min(1).max(6),
  patientId: z.string().min(1).max(6),
  date: z.string().refine(
    (dateStr) => {
      const date = parseDate(dateStr);
      const today = new Date();
      today.setUTCHours(0, 0, 0, 0);
      date.setUTCHours(0, 0, 0, 0);
      return date >= today;
    },
    {
      message: "The date cannot be older than today",
    }
  ),
  time: z.string().time(),
  status: z.enum(["accepted", "completed", "cancelled"]),
  reason: z.string().min(1).max(1000).optional(),
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
