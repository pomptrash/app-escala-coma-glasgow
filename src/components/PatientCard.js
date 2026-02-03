import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

export function PatientCard({ patientName, patientAge, createdAt, result, deletePatient }) {
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
  const resultColor = () => {
    if (result >= 15) return "#4CAF50";
    if (result >= 13 && result <= 14) return "#4CAF50";
    if (result >= 9 && result <= 12) return "#FFC107";
    if (result >= 3 && result <= 8) return "#FF9800";
    if (result < 3) return "#D32F2F";
  };

  return (
    <View style={[styles.container, { borderLeftColor: resultColor() }]}>
      <TouchableOpacity style={styles.content}>
        <Text style={styles.text} numberOfLines={2}>
          {patientName}
        </Text>
        <Text style={styles.subText}>{patientAge} anos</Text>
        <Text style={{ color: resultColor(), fontWeight: "bold" }}>
          Glasgow: {result}
        </Text>
        <Text style={styles.subText}>Adicionado em: {createdAt}</Text>
        <Text style={styles.infoText}>Clique para ver mais detalhes</Text>
      </TouchableOpacity>
      <IconButton icon={"trash-can-outline"} size={24} onPress={deletePatient}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 2,
    borderRadius: 8,
    padding: 8,
    minWidth: "90%",
    backgroundColor: "#fff",
    flexDirection: "row",
    elevation: 2,
    shadowColor: "#000",
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
    textTransform:'capitalize'
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
