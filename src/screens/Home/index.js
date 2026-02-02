import { StyleSheet, Text, FlatList } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PatientCard } from "../../components/PatientCard";

// contexto dos pacientes salvos
import { useContext } from "react";
import { PatientContext } from "../../contexts/patientContext";

export default function Home() {
  const navigation = useNavigation();

  // consumo do contexto
  const { patients, loading } = useContext(PatientContext);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Pacientes ({patients.length})</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PatientCard
            patientName={item.patientName}
            patientAge={item.patientAge}
            createdAt={item.createdAt}
            result={item.resultado}
          />
        )}
      />

      <Button
        style={styles.buttonView}
        textColor="#000"
        labelStyle={{ fontWeight: "bold", fontSize: 16 }}
        onPress={() => navigation.navigate("GlasgowForm")}
      >
        <Text>Adicionar</Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f5",
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    padding: 24,
    alignSelf: "flex-start",
  },

  buttonView: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#000",
  },
});
