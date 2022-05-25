import { useStateValue } from "../state";
import { Patient } from "../types";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import React from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

const PatientInfoPage = () => {
  const [{ patientsFullInfo }, dispatch] = useStateValue();
  const { id } = useParams();
  const [currentPatient, setCurrentPatient] = React.useState<Patient>();

  const fetchPatientFromBe = async (patientId: string) => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${patientId}`
      );
      dispatch({ type: "ADD_FULL_PATIENT", payload: patientFromApi });
    } catch (e) {
      console.error(e);
    }
  };

  const findById = async (
    id: string | undefined
  ): Promise<Patient | undefined> => {
    if (!id) {
      return undefined;
    }
    const entry = Object.values(patientsFullInfo).find((p) => p.id === id);
    if (!entry) {
      await fetchPatientFromBe(id);
      return Object.values(patientsFullInfo).find((p) => p.id === id);
    }
    return entry;
  };

  findById(id)
    .then((res) => {
      setCurrentPatient(res);
    })
    .catch((e) => console.error(e));

  if (!currentPatient) {
    return <p>no current patient</p>;
  }
  return (
    <div className="App">
      <h2>
        {currentPatient.name}
        {currentPatient.gender === "male" ? (
          <MaleIcon />
        ) : currentPatient.gender === "female" ? (
          <FemaleIcon />
        ) : (
          <TransgenderIcon />
        )}
      </h2>

      <p>
        ssn: {currentPatient.ssn}
        <br />
        occupation: {currentPatient.occupation}
      </p>
    </div>
  );
};

export default PatientInfoPage;
