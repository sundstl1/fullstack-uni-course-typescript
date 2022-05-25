export interface Diagnosis {
  code: string;
  name: string;
  latin: string;
}

export type NonLatinDiagnosis = Omit<Diagnosis, "latin">;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  occupation: string;
  ssn: string;
}

export type PatientNoSsn = Omit<Patient, "ssn">;
