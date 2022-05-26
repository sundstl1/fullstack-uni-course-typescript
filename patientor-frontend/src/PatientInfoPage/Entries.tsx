import { useStateValue } from "../state";
import { Diagnosis, Entry } from "../types";

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

  if (!logs) {
    return <h3>entries none</h3>;
  } else {
    return (
      <div>
        <h3>entries</h3>
        {Object.values(logs).map((e: Entry) => (
          <div key={e.id}>
            <p>
              {console.log(e.diagnosisCodes)}
              {e.date} <i>{e.description}</i>
            </p>
            <ul>
              {e.diagnosisCodes ? (
                Object.values(e.diagnosisCodes).map((d: string) => (
                  <li key={d}>
                    {d} {getDiagnosisText(d)}
                  </li>
                ))
              ) : (
                <></>
              )}
            </ul>
          </div>
        ))}
      </div>
    );
  }
};

export default Entries;
