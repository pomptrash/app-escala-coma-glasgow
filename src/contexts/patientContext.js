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

  // função para deletar um paciente por id
  const deletePatient = async (id) => {
    try {
      const updatedPatientList = await deletePatientById(id);
      console.log(updatedPatientList)
      setPatients(updatedPatientList);
    } catch (err) {
      console.log("Erro ao deletar o paciente.", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const contextValue = useMemo(
    () => ({
      patients,
      loading,
      addPatient,
      deletePatient,
      refreshList: fetchPatients,
    }),
    [patients, loading, addPatient, fetchPatients, deletePatient],
  );
  return (
    <PatientContext.Provider value={contextValue}>
      {children}
    </PatientContext.Provider>
  );
}
