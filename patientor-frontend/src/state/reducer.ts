import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export const setPatientList = (patients: Patient[]) => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  } as const;
};

export const addPatient = (patient: Patient) => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  } as const;
};

export const addFullPatient = (patient: Patient) => {
  return {
    type: "ADD_FULL_PATIENT",
    payload: patient,
  } as const;
};

export const setDiagnoses = (diagnoses: Diagnosis[]) => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnoses,
  } as const;
};

export type Action =
  | ReturnType<typeof setPatientList>
  | ReturnType<typeof addPatient>
  | ReturnType<typeof addFullPatient>
  | ReturnType<typeof setDiagnoses>;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_FULL_PATIENT":
      return {
        ...state,
        patientsFullInfo: {
          ...state.patientsFullInfo,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
        },
      };

    default:
      return state;
  }
};
