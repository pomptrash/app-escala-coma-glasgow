import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import { getData, postData } from "../storage/patientStorage";

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
  const addPatient = useCallback(
    async (newPatient) => {
      try {
        await postData(newPatient);
        await fetchPatients();
      } catch (err) {
        throw err;
      }
    },
    [fetchPatients],
  );

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const contextValue = useMemo(
    () => ({
      patients,
      loading,
      addPatient,
      refreshList: fetchPatients,
    }),
    [patients, loading, addPatient, fetchPatients],
  );
  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
}
