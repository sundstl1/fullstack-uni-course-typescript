import { EntryFormValues } from "./AddPatientModal/AddEntryForm";
import { NoIdEntry } from "./types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const toEntry = (value: EntryFormValues): NoIdEntry => {
  const commonProps = {
    description: value.description,
    date: value.date,
    specialist: value.specialist,
    diagnosisCodes: value.diagnosisCodes,
  };
  console.log(value);
  switch (value.type) {
    case "Hospital":
      let discharge = value.discharge;
      if (!discharge || !discharge.date || !discharge.criteria) {
        discharge = undefined;
      }
      return {
        ...commonProps,
        type: "Hospital",
        discharge: value.discharge,
      };
    case "HealthCheck":
      if (value.healthCheckRating === undefined) {
        console.log("undefined");
        throw new Error("Missing health check rating");
      }
      return {
        ...commonProps,
        type: "HealthCheck",
        healthCheckRating: value.healthCheckRating,
      };
    case "OccupationalHealthcare":
      if (!value.employerName) {
        throw new Error("Missing employer name");
      }
      let sickLeave = value.sickLeave;
      if (!sickLeave || !sickLeave.startDate || !sickLeave.endDate) {
        sickLeave = undefined;
      }
      return {
        ...commonProps,
        type: "OccupationalHealthcare",
        employerName: value.employerName,
        sickLeave: sickLeave,
      };
    default:
      throw new Error("Unknown entry type");
  }
};
