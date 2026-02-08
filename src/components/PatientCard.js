import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { memo } from "react";

export const PatientCard = memo(function PatientCard({
  patient,
  deletePatient,
  navigate,
}) {
  // objeto de exemplo
  //   {
  //   "createdAt": "01/02/2026, 22:54:42",
  //   "id": "1769997282666",
  //   "indicadores": {"aberturaOcular": "1", "reatividadePupilar": "0", "respostaMotora": "2", "respostaVerbal": "3"},
  //   "patientAge": "25",
  //   "patientName": "exemplo",
  //   "patientReport": "exemplo",
  //   "resultado": 6
  // }

  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderLeftColor: resultColor(patient.resultado),
          backgroundColor: colors.card,
          shadowColor: colors.textPrimary,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        onPress={() => navigate(patient)}
      >
        <Text
          style={[styles.text, { color: colors.textPrimary }]}
          numberOfLines={2}
        >
          {patient.patientName}
        </Text>
        <Text style={[styles.subText, { color: colors.textPrimary }]}>
          {patient.patientAge} anos
        </Text>
        <Text
          style={{ color: resultColor(patient.resultado), fontWeight: "bold" }}
        >
          Glasgow: {patient.resultado}
        </Text>
        <Text
          style={[
            styles.subText,
            { color: colors.textSecondary, fontSize: 12 },
          ]}
        >
          Adicionado em: {patient.createdAt}
        </Text>
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>
          Clique para ver mais detalhes
        </Text>
      </TouchableOpacity>
      <IconButton
        icon={"trash-can-outline"}
        iconColor={colors.danger}
        size={24}
        onPress={() => deletePatient(patient.id, patient.patientName)}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 2,
    borderRadius: 8,
    padding: 8,
    minWidth: "90%",
    flexDirection: "row",
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
  },
  text: {
    fontWeight: "700",
    fontSize: 24,
    textTransform: "capitalize",
  },
  subText: {
    fontWeight: "500",
    fontSize: 16,
  },
  infoText: {
    fontWeight: "500",
    fontSize: 16,
    alignSelf: "center",
    margin: 8,
  },
});

// função para definir uma cor para cada resultado
export const resultColor = (result) => {
  if (result >= 13) return "#4CAF50";
  if (result >= 9 && result <= 12) return "#FFC107";
  if (result >= 3 && result <= 8) return "#FF9800";
  if (result < 3) return "#D32F2F";
};
