import { useStateValue } from "../state";
import { Diagnosis, Entry } from "../types";
import HospitalEntryView from "./HospitalEntryView";
import HealthCheckEntryView from "./HealthCheckEntryView";
import OccupationalEntry from "./OccupationalEntry";
import { assertNever } from "../utils";
import { Box } from "@mui/material";

const Entries = ({ logs }: { logs: Entry[] | undefined }) => {
  const [{ diagnoses }] = useStateValue();

  const getDiagnosisText = (code: string): string => {
    const diagnosis = Object.values(diagnoses).find(
      (d: Diagnosis) => d.code === code
    );
    if (diagnosis) {
      return diagnosis.name;
    }
    return "unkown diagnosis code";
  };

  const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <HospitalEntryView
            entry={entry}
            getDiagnosisText={getDiagnosisText}
          />
        );
      case "HealthCheck":
        return (
          <HealthCheckEntryView
            entry={entry}
            getDiagnosisText={getDiagnosisText}
          />
        );
      case "OccupationalHealthcare":
        return (
          <OccupationalEntry
            entry={entry}
            getDiagnosisText={getDiagnosisText}
          />
        );
      default:
        return assertNever(entry);
    }
  };

  if (!logs) {
    return <h3>entries none</h3>;
  } else {
    return (
      <div>
        <h3>entries</h3>
        {Object.values(logs).map((e: Entry) => (
          <div key={e.id}>
            <Box sx={{ pl: 1, border: "1px solid black" }} borderRadius={2}>
              <EntryDetails entry={e} />
            </Box>
            <br />
          </div>
        ))}
      </div>
    );
  }
};

export default Entries;
