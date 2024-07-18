import { catchAsync } from "../../errors/catchAsync.js";
import { ProffesionalService } from "./proffesional.service.js";

const proffesionalService = new ProffesionalService();

export const findAllProfessional = catchAsync(async (req, res, next) => {
  const proffesional = await proffesionalService.findAll();

  return res.status(200).json(proffesional);
});
