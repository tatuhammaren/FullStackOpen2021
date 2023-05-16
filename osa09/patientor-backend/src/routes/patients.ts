import express from "express";
import patientService from "../services/patientService";
import { parsePatientRequest } from "../utils";
const router = express.Router();

router.get("/patients", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/patients", (req, res) => {
  try {
    console.log("mooi");
    console.log(req.body);
    const patientToAdd = parsePatientRequest(req.body);
    const added = patientService.addPatient(patientToAdd);

    res.json(added);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});
export default router;
