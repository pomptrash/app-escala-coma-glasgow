import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { resultColor } from "../../components/PatientCard";
import { FAB, useTheme } from "react-native-paper";
import { useState, useCallback, useContext } from "react";
import { PatientModal } from "../../components/PatientModal";

import { PatientContext } from "../../contexts/patientContext";

export function PatientDetails() {
  const route = useRoute();
  const { patient } = route.params;

  const { colors } = useTheme();

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
    [patient.id, updatePatientData, hideModal],
  );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <PatientModal
        modalVisible={modalVisible}
        hideModal={hideModal}
        onSubmit={handleUpdate}
        editingPatient={currentPatient}
      />

      <Text style={[styles.text, { color: colors.textPrimary }]}>
        Informações
      </Text>

      <View
        style={[styles.patientInfoContainer, { borderColor: colors.border }]}
      >
        <Text style={[styles.text, { color: colors.textPrimary }]}>
          Nome:{" "}
          <Text style={styles.patientName}>{currentPatient.patientName}</Text>
        </Text>
      </View>
      <View
        style={[styles.patientInfoContainer, { borderColor: colors.border }]}
      >
        <Text style={[styles.text, { color: colors.textPrimary }]}>
          Idade: {currentPatient.patientAge} anos
        </Text>
      </View>

      <Text style={[styles.text, { color: colors.textPrimary }]}>
        Quadro Clínico
      </Text>
      <View
        style={[styles.patientInfoContainer, { borderColor: colors.border }]}
      >
        <Text
          style={[
            styles.report,
            { color: resultColor(currentPatient.resultado) },
          ]}
        >
          Glasgow: {currentPatient.resultado}
        </Text>
        <View style={styles.subContent}>
          <Text style={[styles.text, { color: colors.textPrimary }]}>
            Abertura Ocular: {currentPatient.indicadores.aberturaOcular}
          </Text>
          <Text style={[styles.text, { color: colors.textPrimary }]}>
            Resposta Verbal: {currentPatient.indicadores.respostaVerbal}
          </Text>
          <Text style={[styles.text, { color: colors.textPrimary }]}>
            Resposta Motora: {currentPatient.indicadores.respostaMotora}
          </Text>
          <Text style={[styles.text, { color: colors.textPrimary }]}>
            Reatividade Pupilar: {currentPatient.indicadores.reatividadePupilar}
          </Text>
        </View>

        <View>
          <Text style={[styles.report, { color: colors.textPrimary }]}>
            Observação:
          </Text>
          <View style={styles.subContent}>
            <Text
              style={[
                styles.text,
                {
                  padding: 16,
                  borderRadius: 8,
                  color: colors.textPrimary,
                  backgroundColor: colors.card,
                  textTransform: "capitalize",
                },
              ]}
            >
              {currentPatient.patientReport}
            </Text>
          </View>
        </View>
      </View>

      <Text
        style={[
          styles.text,
          { fontWeight: "400", marginTop: 16, color: colors.textPrimary },
        ]}
      >
        Adicionado em {currentPatient.createdAt}
      </Text>
      <FAB
        style={[styles.fab, { backgroundColor: colors.button }]}
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
    padding: 20,
    gap: 8,
  },
  patientInfoContainer: {
    borderWidth: 1,
    // borderColor: "#000",
    borderRadius: 16,
    padding: 16,
  },

  patientName: {
    fontSize: 24,
    textTransform: "capitalize",
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
    fontSize: 24,
  },
});
