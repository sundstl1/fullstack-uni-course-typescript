import diagnosisData from "../data/diagnoses.json";
import { Diagnosis, NonLatinDiagnosis } from "../types";

const diagnoses: Array<Diagnosis> = diagnosisData as Array<Diagnosis>;

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const getNonLatin = (): NonLatinDiagnosis[] => {
  return diagnoses.map(({ code, name }) => ({ code, name }));
};

export default {
  getEntries,
  getNonLatin,
};
