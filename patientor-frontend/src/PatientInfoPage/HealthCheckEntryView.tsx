import { HealthCheckEntry, HealthCheckRating } from "../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HealthCheckEntryView: React.FC<{
  entry: HealthCheckEntry;
  getDiagnosisText: (code: string) => string;
}> = ({
  entry,
  getDiagnosisText,
}: {
  entry: HealthCheckEntry;
  getDiagnosisText: (code: string) => string;
}) => {
  const HealthIcon: React.FC<{ rating: HealthCheckRating }> = ({ rating }) => {
    switch (rating) {
      case 0:
        return <FavoriteIcon style={{ color: "green" }} />;

      case 1:
        return <FavoriteIcon style={{ color: "yellow" }} />;
      case 2:
        return <FavoriteIcon style={{ color: "orange" }} />;
      case 3:
        return <FavoriteIcon style={{ color: "red" }} />;
      default:
        return <></>;
    }
  };

  return (
    <div>
      <p>
        {entry.date}
        <MedicalServicesIcon />
        <br />
        <i>{entry.description}</i>
        <br />
        <HealthIcon rating={entry.healthCheckRating} />
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

      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HealthCheckEntryView;
