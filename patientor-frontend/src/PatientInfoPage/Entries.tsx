import { Entry } from "../types";

const Entries = ({ logs }: { logs: Entry[] | undefined }) => {
  console.log(logs);
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
                  <li key={d}>{d}</li>
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
