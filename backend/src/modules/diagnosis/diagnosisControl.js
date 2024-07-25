import { catchAsync } from "../../errors/catchAsync.js";
import { DiagnosisService } from "./diagnosisService.js";
import { AppError } from "../../errors/appError.js";

const diagnosisService = new DiagnosisService();

export const getDiagnosis = catchAsync(async (req, res, next) => {
  const diagnosisGet = await diagnosisService.findAll();

  if (!diagnosisGet) {
    return next(new AppError("No se encontraron diagnósticos", 404));
  }

  return res.status(200).json({
    status: "success",
    data: diagnosisGet, 
  });
});


export const getByIdDiagnosis = catchAsync(async (req, res, next) => {
    const { id } = req.params; 
  
    const diagnosisGetById = await diagnosisService.findOneById(id);
  
    if (!diagnosisGetById) {
      return next(new AppError("Diagnóstico no encontrado o está inactivo", 404));
    }
  
    return res.status(200).json({
      status: "success",
      data: diagnosisGetById,
    });
});


export const postDiagnosis = catchAsync(async (req, res, next) => {
    const { doctorId, patientId, altura, peso, masaCorporal, temperatura, frecuenciaRespiratoria,
      presionArterial, frecuenciaCardiaca, alergiasAMedicamentos, otrasAlergias,
      antecedentesPatologicos } = req.body;
  
    const data = { doctorId, patientId, altura, peso, masaCorporal, temperatura, frecuenciaRespiratoria,
      presionArterial, frecuenciaCardiaca, alergiasAMedicamentos, otrasAlergias,
      antecedentesPatologicos }

      const diagnosisPost = await diagnosisService.createDiagnosis(data);

      if(!diagnosisPost){
        return next(new AppError("no se pudo crear el diagnostico", 404));
      }
  
      return res.status(201).json({
        status: "success",
        data: diagnosisPost,
      });
});


export const updateDiagnosis = catchAsync(async (req, res, next) => {
    const { id } = req.params; 
    const { doctorId, patientId, altura, peso, masaCorporal, temperatura, frecuenciaRespiratoria,
      presionArterial, frecuenciaCardiaca, alergiasAMedicamentos, otrasAlergias,
      antecedentesPatologicos } = req.body;

    const data = { doctorId, patientId, altura, peso, masaCorporal, temperatura, frecuenciaRespiratoria,
      presionArterial, frecuenciaCardiaca, alergiasAMedicamentos, otrasAlergias,
      antecedentesPatologicos }
  
      const diagnosisUpdate = await diagnosisService.updateDiagnosis(id, data);
      
      if(!diagnosisUpdate){
        return next(new AppError("no se pudo actuallizar el diagnostico", 404));
      }
  
      return res.status(200).json({
        status: "success",
        data: diagnosisUpdate,
      });
});



export const deleteDiagnosis = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const diagnosisDelete = await diagnosisService.findOneById(id);
  
    if (!diagnosisDelete) {
      return next(new AppError("Diagnóstico no encontrado o está inactivo", 404));
    }
      await diagnosisService.deleteDiagnosis(id);
  
      return res.status(204).json({
        status: "success",
        message: "Diagnóstico eliminado con éxito",
      });
});