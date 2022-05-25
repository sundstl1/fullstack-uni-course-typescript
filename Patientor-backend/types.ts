export interface Diagnosis {
  code: string;
  name: string;
  latin: string;
}

export type NonLatinDiagnosis = Omit<Diagnosis, "latin">;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  ssn: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;
export type NewPatientEntry = Omit<Patient, "id" | "entries">;

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}
