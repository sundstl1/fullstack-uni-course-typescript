import { OccupationalHealthcareEntry } from "../types";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalEntry: React.FC<{
  entry: OccupationalHealthcareEntry;
  getDiagnosisText: (code: string) => string;
}> = ({
  entry,
  getDiagnosisText,
}: {
  entry: OccupationalHealthcareEntry;
  getDiagnosisText: (code: string) => string;
}) => {
  return (
    <div>
      <p>
        {entry.date}
        <WorkIcon />
        <i> {entry.employerName}</i>
      </p>
      <p>
        <i>{entry.description}</i>
      </p>
      <ul>
        {entry.diagnosisCodes ? (
          Object.values(entry.diagnosisCodes).map((d: string) => (
            <li key={d}>
              {d} {getDiagnosisText(d)}
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>

      {entry.sickLeave ? (
        <p>
          sickleave from {entry.sickLeave.startDate} to{" "}
          {entry.sickLeave.endDate}
        </p>
      ) : (
        <></>
      )}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default OccupationalEntry;
