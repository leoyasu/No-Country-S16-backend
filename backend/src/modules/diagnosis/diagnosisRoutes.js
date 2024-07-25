import express from "express";
import{
    getDiagnosis, 
    getByIdDiagnosis,
    postDiagnosis,
    updateDiagnosis, 
    deleteDiagnosis 
}from './diagnosisControl.js';

export const router = express.Router();


router.route('/')
      .get(getDiagnosis)
      .post(postDiagnosis);

router.route('/:id')
      .get(getByIdDiagnosis)
      .put(updateDiagnosis)
      .delete(deleteDiagnosis);


  