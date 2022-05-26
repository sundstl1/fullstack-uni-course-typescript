import { HospitalEntry } from "../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HospitalEntryView: React.FC<{
  entry: HospitalEntry;
  getDiagnosisText: (code: string) => string;
}> = ({
  entry,
  getDiagnosisText,
}: {
  entry: HospitalEntry;
  getDiagnosisText: (code: string) => string;
}) => {
  return (
    <div>
      <p>
        {entry.date}
        <LocalHospitalIcon />
        <br />
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

      {entry.discharge ? (
        <p>
          <b>Discharged {entry.discharge.date}</b>
          <br />
          <i>{entry.discharge.criteria}</i>
        </p>
      ) : (
        <></>
      )}
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntryView;
