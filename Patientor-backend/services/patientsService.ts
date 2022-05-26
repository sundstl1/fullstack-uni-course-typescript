import patientsData from "../data/patients";
import {
  Patient,
  PublicPatient,
  NewPatientEntry,
  NewEntry,
  Entry,
} from "../types";
import { v1 as uuid } from "uuid";
//import toNewPatientEntry from "../utils";

const patients = patientsData;

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

const addPatientEntry = (
  entry: NewEntry,
  patientId: string
): Entry | undefined => {
  const patient = findById(patientId);
  if (!patient) {
    return undefined;
  }
  const newEntry: Entry = {
    id: uuid(),
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  getAllNoSsn,
  findById,
  addPatient,
  addPatientEntry,
};
