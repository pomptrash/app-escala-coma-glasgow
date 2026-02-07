import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { resultColor } from "../../components/PatientCard";

export function PatientDetails() {
  const route = useRoute();
  const { patient } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View>
        <Text style={styles.patientName}>
          {patient.patientName},{" "}
          <Text style={styles.Text}>{patient.patientAge} anos</Text>
        </Text>
      </View>

      <View>
        <Text style={[styles.report, {color: resultColor(patient.resultado)}]}>Glasgow: {patient.resultado}</Text>
        <View style={styles.subContent}>
          <Text style={styles.Text}>
            Abertura Ocular: {patient.indicadores.aberturaOcular}
          </Text>
          <Text style={styles.Text}>
            Resposta Verbal: {patient.indicadores.respostaVerbal}
          </Text>
          <Text style={styles.Text}>
            Resposta Motora: {patient.indicadores.respostaMotora}
          </Text>
          <Text style={styles.Text}>
            Reatividade Pupilar: {patient.indicadores.reatividadePupilar}
          </Text>
        </View>
      </View>
      <View>
        <Text style={styles.report}>Observação:</Text>
        <View style={styles.subContent}>
          <Text style={styles.Text}>{patient.patientReport}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f3f4f5",
    padding: 20,
    gap: 8,
  },

  patientName: {
    fontSize: 32,
    fontWeight: "600",
  },
  report: {
    fontSize: 24,
    fontWeight: "600",
  },
  Text: {
    fontSize: 16,
    fontWeight: "600",
  },
  subContent: {
    padding: 8,
    gap: 2
  },
});
