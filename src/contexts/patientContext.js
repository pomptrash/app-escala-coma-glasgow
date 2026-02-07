import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import {
  getData,
  postData,
  deletePatientById,
  updatePatient,
} from "../storage/patientStorage";

export const PatientContext = createContext(); // criação do contexto

export function PatientProvider({ children }) {
  // estados
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  // função para carregar os pacientes salvos
  const fetchPatients = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getData();
      setPatients(data);
    } catch (err) {
      console.log("Erro ao carregar.", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // função para salvar um novo paciente
  const addPatient = useCallback(async (newPatient) => {
    try {
      const updatedData = await postData(newPatient);

      setPatients(updatedData);
    } catch (err) {
      throw err;
    }
  }, []);

  // função para editar um paciente
  const updatePatientData = useCallback(async (id, data) => {
    try {
      const updatedData = await updatePatient(id, data);

      setPatients(updatedData);

      return true;
    } catch (err) {
      console.error(err);

      return false;
    }
  }, []);

  // função para deletar um paciente por id
  const deletePatient = useCallback(async (id) => {
    try {
      const updatedPatientList = await deletePatientById(id);
      setPatients(updatedPatientList);
    } catch (err) {
      console.log("Erro ao deletar o paciente.", err);
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const contextValue = useMemo(
    () => ({
      patients,
      loading,
      addPatient,
      deletePatient,
      updatePatientData,
      refreshList: fetchPatients,
    }),
    [
      patients,
      loading,
      addPatient,
      fetchPatients,
      deletePatient,
      updatePatientData,
    ],
  );
  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
}
