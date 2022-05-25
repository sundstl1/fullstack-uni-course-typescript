import patientsData from "../data/patients.json";
import { Patient, PublicPatient, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";
import toNewPatientEntry from "../utils";

const patients: Array<Patient> = patientsData.map((obj) => {
  const object = toNewPatientEntry(obj) as Patient;
  object.id = obj.id;
  object.entries = [];
  return object;
});

const getEntries = (): Patient[] => {
  return patients;
};

const getAllNoSsn = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find((p) => p.id === id);
  return entry;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  getAllNoSsn,
  findById,
  addPatient,
};
