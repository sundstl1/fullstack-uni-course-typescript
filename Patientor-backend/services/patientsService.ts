import patientsData from "../data/patients.json";
import { Patient, PatientNoSsn, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";
import toNewPatientEntry from "../utils";

const patients: Array<Patient> = patientsData.map((obj) => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  return object;
});

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

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    id: uuid() as string,
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getAllNoSsn,
  addPatient,
};
