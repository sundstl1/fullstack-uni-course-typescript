import patientsData from "../data/patients.json";
import { Patient, PatientNoSsn } from "../types";

const patients: Array<Patient> = patientsData as Array<Patient>;

const getEntries = (): Patient[] => {
  return patients;
};

const getAllNoSsn = (): PatientNoSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
  getAllNoSsn,
};
