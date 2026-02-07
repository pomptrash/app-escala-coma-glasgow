import { StyleSheet, Text, FlatList, Alert } from "react-native";
import { FAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PatientCard } from "../../components/PatientCard";

// contexto dos pacientes salvos
import { useContext } from "react";
import { PatientContext } from "../../contexts/patientContext";

export default function Home() {
  const navigation = useNavigation();

  // consumo do contexto
  const { patients, loading, deletePatient } = useContext(PatientContext);
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
            navigate={() =>
              navigation.navigate("PatientDetails", { patient: item })
            }
            deletePatient={() =>
              Alert.alert(
                "Confirmação", // título
                "Tem certeza que deseja excluir o paciente?", // mensagem
                [
                  {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel", // estilo 'cancel' (iOS)
                  },
                  {
                    text: "Excluir",
                    onPress: () => {
                      (deletePatient(item.id),
                        console.log(`paciente ${item.patientName} deletado`));
                    },
                    style: "destructive", // estilo 'destructive' (iOS)
                  },
                ],
              )
            }
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
