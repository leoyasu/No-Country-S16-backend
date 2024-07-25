import Diagnosis  from './diagnosisModel.js';

export class DiagnosisService {
    async findAll() {
      return await Diagnosis.findAll({
        where: {
          status: true,
        },
      });
    }
  
    async createDiagnosis(data) {
      return await Diagnosis.create(data);
    }
  
    async findOneById(id) {
      return await Diagnosis.findOne({
        where: {
          id:id,
          status: true,
        },
      });
    }
  
    async updateDiagnosis(id, data) {
      const diagnosis = await Diagnosis.findOne({
        where: {
          id:id,
          status: true,
        },
      });
  
      if (!diagnosis) {
        throw new Error('Diagnóstico no encontrado o está inactivo');
      }
  
      return await diagnosis.update(data);
    }
  
    async deleteDiagnosis(id) {
      const diagnosis = await Diagnosis.findOne({
        where: {
          id:id,
          status: true,
        },
      });
  
      if (!diagnosis) {
        throw new Error('Diagnosis no encontrado');
      }
  
      return await diagnosis.update({
        status: false,
      });
    }
  }