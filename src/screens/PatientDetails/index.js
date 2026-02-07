import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { resultColor } from "../../components/PatientCard";
import { FAB } from "react-native-paper";
import { useState, useCallback, useContext } from "react";
import { PatientModal } from "../../components/PatientModal";

import { PatientContext } from "../../contexts/patientContext";

export function PatientDetails() {
  const route = useRoute();
  const { patient } = route.params;

  const { updatePatientData, patients } = useContext(PatientContext);

  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), []);
  const hideModal = useCallback(() => setModalVisible(false), []);

  const currentPatient = patients.find((p) => p.id === patient.id) || patient;

  const handleUpdate = useCallback(
    async (data) => {
      const newData = await updatePatientData(patient.id, data);

      if (newData) {
        hideModal();
      }
    },
    [currentPatient.id, updatePatientData, hideModal],
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <PatientModal
        modalVisible={modalVisible}
        hideModal={hideModal}
        onSubmit={handleUpdate}
        editingPatient={currentPatient}
      />

      <Text style={styles.text}>Informações</Text>

      <View style={styles.patientInfoContainer}>
        <Text style={styles.text}>
          Nome:{" "}
          <Text style={styles.patientName}>{currentPatient.patientName}</Text>
        </Text>
      </View>
      <View style={styles.patientInfoContainer}>
        <Text style={styles.text}>Idade: {currentPatient.patientAge} anos</Text>
      </View>

      <Text style={styles.text}>Quadro Clínico</Text>
      <View style={styles.patientInfoContainer}>
        <Text
          style={[
            styles.report,
            { color: resultColor(currentPatient.resultado) },
          ]}
        >
          Glasgow: {currentPatient.resultado}
        </Text>
        <View style={styles.subContent}>
          <Text style={styles.text}>
            Abertura Ocular: {currentPatient.indicadores.aberturaOcular}
          </Text>
          <Text style={styles.text}>
            Resposta Verbal: {currentPatient.indicadores.respostaVerbal}
          </Text>
          <Text style={styles.text}>
            Resposta Motora: {currentPatient.indicadores.respostaMotora}
          </Text>
          <Text style={styles.text}>
            Reatividade Pupilar: {currentPatient.indicadores.reatividadePupilar}
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
              {currentPatient.patientReport}
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.text, { fontWeight: "400", marginTop: 16 }]}>
        Adicionado em {currentPatient.createdAt}
      </Text>
      <FAB
        style={styles.fab}
        icon={"pencil"}
        label="Editar"
        onPress={showModal}
      />
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
    textTransform: "capitalize"
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
