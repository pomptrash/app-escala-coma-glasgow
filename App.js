import { Router } from "./src/routes";
import { PaperProvider } from "react-native-paper";
import { PatientProvider } from "./src/contexts/patientContext";
import { useThemeContext, ThemeProvider } from "./src/contexts/themeContext";

export default function App() {
  return (
    <ThemeProvider>
      <PatientProvider>
        <Main />
      </PatientProvider>
    </ThemeProvider>
  );
}

function Main() {
  const { theme } = useThemeContext();
  return (
    <PaperProvider theme={theme}>
      <Router theme={theme} />
    </PaperProvider>
  );
}
