import { PatientEntry, Gender } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("incorrect or missing name");
  }
  return name;
};
const parseSSN = (SSN: unknown): string => {
  if (!SSN || !isString(SSN)) {
    throw new Error("incorrect or missing ssn");
  }
  return SSN;
};
const parseDOB = (dob: unknown): string => {
  if (!dob || !isString(dob)) {
    throw new Error("incorrect or missing date of birth");
  }
  return dob;
};
const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("incorrect or missing occupation");
  }
  return occupation;
};
const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};
const parseGender = (gender: unknown): string => {
  if (!gender || !isGender) {
    throw new Error("incorrect or missing gender");
  }
  return gender.toString();
};
export const parsePatientRequest = (object: unknown): PatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "gender" in object &&
    "occupation" in object &&
    "ssn" in object
  ) {
    const placeholder: PatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDOB(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      ssn: parseSSN(object.ssn),
    };
    return placeholder;
  }

  throw new Error("Incorrect data: a field missing");
};
