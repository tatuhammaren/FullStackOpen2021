import data from "../../data/patients";
import { Patient, NonSensitivePatient, PatientEntry } from "../types";

import { v1 as uuid } from "uuid";
const getPatients = (): Patient[] => {
  return data;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: PatientEntry): Patient => {
  const patientEntry: Patient = {
    id: uuid(),
    ...patient,
  };

  data.push(patientEntry);
  return patientEntry;
};
export default { getPatients, getNonSensitivePatients, addPatient };
