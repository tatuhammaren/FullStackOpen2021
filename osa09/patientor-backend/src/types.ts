export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};

export enum Gender {
  Other = "other",
  Male = "male",
  Female = "female",
}
export type NonSensitivePatient = Omit<Patient, "ssn">;
export type PatientEntry = Omit<Patient, "id">;
