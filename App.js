import { Router } from "./src/routes";
import { PaperProvider } from "react-native-paper";
import { PatientProvider } from "./src/contexts/patientContext";

export default function App() {
  return (
    <PatientProvider>
      <PaperProvider>
        <Router/>
      </PaperProvider>
    </PatientProvider>
  );
}
