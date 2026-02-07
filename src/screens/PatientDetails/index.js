import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { resultColor } from "../../components/PatientCard";
import { FAB } from "react-native-paper";

export function PatientDetails() {
  const route = useRoute();
  const { patient } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.text}>Informações</Text>
      
      <View style={styles.patientInfoContainer}>
        <Text style={styles.text}>
          Nome: <Text style={styles.patientName}>{patient.patientName}</Text>
        </Text>
      </View>
      <View style={styles.patientInfoContainer}>
        <Text style={styles.text}>Idade: {patient.patientAge} anos</Text>
      </View>

      <Text style={styles.text}>Quadro Clínico</Text>
      <View style={styles.patientInfoContainer}>
        <Text
          style={[styles.report, { color: resultColor(patient.resultado) }]}
        >
          Glasgow: {patient.resultado}
        </Text>
        <View style={styles.subContent}>
          <Text style={styles.text}>
            Abertura Ocular: {patient.indicadores.aberturaOcular}
          </Text>
          <Text style={styles.text}>
            Resposta Verbal: {patient.indicadores.respostaVerbal}
          </Text>
          <Text style={styles.text}>
            Resposta Motora: {patient.indicadores.respostaMotora}
          </Text>
          <Text style={styles.text}>
            Reatividade Pupilar: {patient.indicadores.reatividadePupilar}
          </Text>
        </View>

        <View>
          <Text style={styles.report}>Observação:</Text>
          <View style={styles.subContent}>
            <Text
              style={[
                styles.text,
                { padding: 16, borderRadius: 8, backgroundColor: "#f3f4f5" },
              ]}
            >
              {patient.patientReport}
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.text, { fontWeight: "400", marginTop: 16 }]}>
        Adicionado em {patient.createdAt}
      </Text>
      <FAB style={styles.fab} icon={"pencil"} label="Editar" onPress={() => {}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 20,
    gap: 8,
  },
  patientInfoContainer: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 16,
    padding: 16,
  },

  patientName: {
    fontSize: 24,
  },
  report: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  subContent: {
    padding: 8,
  },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    marginBottom: 16,
    backgroundColor: "lightblue",
    fontSize: 24,
  },
});
