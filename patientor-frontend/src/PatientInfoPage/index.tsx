import { useStateValue, addFullPatient, addEntry } from "../state";
import { Entry, Patient } from "../types";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import React from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import Entries from "./Entries";
import { AddEntryModal } from "../AddPatientModal";
import { Button } from "@material-ui/core";
import { EntryFormValues } from "../AddPatientModal/AddEntryForm";
import { toEntry } from "../utils";

const PatientInfoPage = () => {
  const [{ patientsFullInfo }, dispatch] = useStateValue();
  const { id } = useParams();
  const [currentPatient, setCurrentPatient] = React.useState<Patient>();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entryToSend = toEntry(values);
      if (!currentPatient) {
        return;
      }
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${currentPatient.id}/entries`,
        entryToSend
      );
      dispatch(addEntry(newEntry, currentPatient.id));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(String(e?.response?.data) || "Unrecognized axios error");
        console.log("error state: ", error);
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
        console.log("error state: ", error);
      }
    }
  };

  const fetchPatientFromBe = async (patientId: string) => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${patientId}`
      );
      dispatch(addFullPatient(patientFromApi));
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
      <Entries logs={currentPatient.entries} />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientInfoPage;
