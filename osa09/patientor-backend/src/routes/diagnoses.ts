import express from "express";
/* import { Diagnose } from "../../types"; */
import diagnoseService from "../services/diagnoseService";

const router = express.Router();
const asd = "moi";

console.log("moi");

router.get("/diagnoses", (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

export default router;
