import { StyleSheet, Text, FlatList, Alert, View } from "react-native";
import { FAB, IconButton, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PatientCard } from "../../components/PatientCard";

import { useThemeContext } from "../../contexts/themeContext";
// contexto dos pacientes salvos
import { useCallback, useContext } from "react";
import { PatientContext } from "../../contexts/patientContext";

export default function Home() {
  const { toggleTheme, darkMode } = useThemeContext();
  const navigation = useNavigation();
  // consumo do contexto
  const { patients, loading, deletePatient } = useContext(PatientContext);

  const { colors } = useTheme();

  const handleNavigateToDetails = useCallback(
    (patient) => {
      navigation.navigate("PatientDetails", { patient });
    },
    [navigation],
  );

  const handleDeletePatient = useCallback(
    (id) => {
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
      {/* botão para alterar o tema */}
      <View style={styles.toggleThemeBtn}>
        {darkMode ? (
          <IconButton
            icon={"weather-night"}
            onPress={toggleTheme}
            iconColor={colors.textPrimary}
          />
        ) : (
          <IconButton
            icon={"white-balance-sunny"}
            onPress={toggleTheme}
            iconColor={colors.textPrimary}
          />
        )}
      </View>

      <Text style={[styles.title, { color: colors.textPrimary }]}>
        Lista de Pacientes ({patients.length})
      </Text>
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
        style={[styles.fab, { backgroundColor: colors.button }]}
        icon={"plus"}
        label="Adicionar"
        onPress={() => navigation.navigate("GlasgowForm")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  toggleThemeBtn: {
    position: "absolute",
    right: 10,
    top: 40,
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
    fontSize: 24,
  },
});
