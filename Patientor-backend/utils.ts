import {
  NewPatientEntry,
  Gender,
  NewEntry,
  SickLeave,
  Discharge,
} from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isNumber = (number: unknown): number is number => {
  return !isNaN(Number(number));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

export const parseUuid = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error("Incorrect or missing id");
  }

  return id;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

type newPatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  gender: unknown;
  occupation: unknown;
  ssn: unknown;
};

const toNewPatientEntry = ({
  name,
  dateOfBirth,
  gender,
  occupation,
  ssn,
}: newPatientFields): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    ssn: parseSsn(ssn),
  };

  return newEntry;
};

const isType = (
  type: unknown
): type is "Hospital" | "HealthCheck" | "OccupationalHealthcare" => {
  const isString = typeof type === "string" || type instanceof String;
  if (!isString) {
    return false;
  }
  const isHospital = type === "Hospital";
  const isOccupational = type === "OccupationalHealthcare";
  const isHealthCheck = type === "HealthCheck";
  return isString && (isHospital || isOccupational || isHealthCheck);
};

const parseType = (
  type: unknown
): "Hospital" | "HealthCheck" | "OccupationalHealthcare" => {
  if (!type || !isType(type)) {
    throw new Error("Incorrect or missing type: " + type);
  }
  return type;
};

const parseString = (text: unknown, field: string): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing text in field ${field}`);
  }

  return text;
};

const parseNumber = (number: unknown, field: string): number => {
  if (number === undefined || !isNumber(number)) {
    throw new Error(`Incorrect or missing number in field ${field}`);
  }

  return Number(number);
};

const isStringArray = (value: unknown): value is string[] => {
  return Array.isArray(value) && value.every((val) => typeof val === "string");
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] | undefined => {
  if (!diagnosisCodes) {
    return undefined;
  }
  if (!isStringArray(diagnosisCodes)) {
    throw new Error(`Provided diagnosis codes are not a string array`);
  }
  return diagnosisCodes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const type = parseType(object.type);

  switch (type) {
    case "HealthCheck":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return toNewHealthCheckEntry(object);
    case "OccupationalHealthcare":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return toNewOccupationalEntry(object);
    case "Hospital":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return toNewHospitalEntry(object);
    default:
      throw new Error("Unknown entry type: " + type);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeaveFields = (object: any): SickLeave => {
  const sickLeave: SickLeave = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    startDate: parseDate(object.startDate),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    endDate: parseDate(object.endDate),
  };
  return sickLeave;
};

const parseDischargeFields = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any
): Discharge => {
  const discharge: Discharge = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    date: parseDate(object.date),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    criteria: parseString(object.criteria, "discharge criteria"),
  };
  return discharge;
};

const parseSickLeave = (value: unknown): SickLeave | undefined => {
  if (!value) {
    return undefined;
  } else {
    return parseSickLeaveFields(value);
  }
};

const parseDischarge = (value: unknown): Discharge | undefined => {
  if (!value) {
    return undefined;
  } else {
    return parseDischargeFields(value);
  }
};

type HealthCheckFields = {
  type: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  healthCheckRating: unknown;
};
type OccupationalFields = {
  type: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  employerName: unknown;
  sickLeave: unknown;
};
type HospitalFields = {
  type: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes: unknown;
  discharge: unknown;
};

const toNewHealthCheckEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
}: HealthCheckFields): NewEntry => {
  const newEntry: NewEntry = {
    type: "HealthCheck",
    description: parseString(description, "description"),
    date: parseDate(date),
    specialist: parseString(specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    healthCheckRating: parseNumber(healthCheckRating, "healthCheckRating"),
  };
  return newEntry;
};

const toNewOccupationalEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  employerName,
  sickLeave,
}: OccupationalFields): NewEntry => {
  const newEntry: NewEntry = {
    type: "OccupationalHealthcare",
    description: parseString(description, "description"),
    date: parseDate(date),
    specialist: parseString(specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    employerName: parseString(employerName, "employerName"),
    sickLeave: parseSickLeave(sickLeave),
  };
  return newEntry;
};

const toNewHospitalEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  discharge,
}: HospitalFields): NewEntry => {
  const newEntry: NewEntry = {
    type: "Hospital",
    description: parseString(description, "description"),
    date: parseDate(date),
    specialist: parseString(specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(diagnosisCodes),
    discharge: parseDischarge(discharge),
  };
  return newEntry;
};

export default toNewPatientEntry;
