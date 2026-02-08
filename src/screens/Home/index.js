import { StyleSheet, Text, FlatList, Alert } from "react-native";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PatientCard } from "../../components/PatientCard";

// contexto dos pacientes salvos
import { useCallback, useContext } from "react";
import { PatientContext } from "../../contexts/patientContext";

export default function Home() {
  const navigation = useNavigation();
  // consumo do contexto
  const { patients, loading, deletePatient } = useContext(PatientContext);

  const handleNavigateToDetails = useCallback(
    (patient) => {
      navigation.navigate("PatientDetails", { patient });
    },
    [navigation],
  );

  const handleDeletePatient = useCallback(
    (id, name) => {
      Alert.alert(
        "Confirmação", // título
        "Tem certeza que deseja excluir o paciente?", // mensagem
        [
          {
            text: "Cancelar",
            style: "cancel", // estilo 'cancel' (iOS)
          },
          {
            text: "Excluir",
            onPress: () => {
              deletePatient(id);
            },
            style: "destructive", // estilo 'destructive' (iOS)
          },
        ],
      );
    },
    [deletePatient],
  );

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
            patient={item}
            navigate={handleNavigateToDetails}
            deletePatient={handleDeletePatient}
          />
        )}
      />

      <FAB
        style={styles.fab}
        icon={"plus"}
        label="Adicionar"
        onPress={() => navigation.navigate("GlasgowForm")}
      >
        <Text>Adicionar</Text>
      </FAB>
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

  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    marginBottom: 16,
    backgroundColor: "lightblue",
    fontSize: 24,
  },
});
