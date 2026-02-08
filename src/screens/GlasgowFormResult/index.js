import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { useCallback, useState, useContext, memo } from "react";

// contexto dos pacientes salvos
import { PatientContext } from "../../contexts/patientContext";

import { PatientModal } from "../../components/PatientModal";

export function GlasgowFormResult() {
  // consumo do contexto de pacientes
  const { addPatient } = useContext(PatientContext);

  // modal
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = useCallback(() => setModalVisible(true), []);
  const hideModal = useCallback(() => setModalVisible(false), []);

  // navigation params
  const navigation = useNavigation();
  const route = useRoute();
  const { resultado, indicadores } = route.params;

  // conditional result component
  const ResultCard = memo(function ResultCard({
    resultado,
    gravidade,
    mensagem,
    color,
  }) {
    return (
      <View style={[styles.container, { borderWidth: 1, borderColor: color }]}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Resultado:</Text>
        <Text style={[styles.resultado, { color: color }]}>{resultado}</Text>
        <Text style={[styles.gravidade, { color: color }]}>{gravidade}</Text>
        <Text style={styles.mensagem}>{mensagem}</Text>
      </View>
    );
  });

  // função para persistir os dados inseridos pelo usuário
  const handleCreatePatient = useCallback(
    async (data) => {
      try {
        const patientData = {
          ...data,
          indicadores,
          resultado,
        };
        await addPatient(patientData);

        hideModal();
        navigation.navigate("Home");
      } catch (err) {
        console.error(err);
        alert("Erro ao salvar");
      }
    },
    [indicadores, resultado, addPatient, navigation],
  );
  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "#f3f4f5",
        padding: 20,
        paddingBottom: 40,
        gap: 16,
      }}
    >
      {/* MODAL COM FORM PARA SALVAR DADOS */}
      <PatientModal
        modalVisible={modalVisible}
        hideModal={hideModal}
        onSubmit={handleCreatePatient}
      />

      {/* cards condicionais de acordo com o resultado do cálculo da escala de glasgow */}
      {resultado >= 15 && (
        <ResultCard
          color="#4CAF50"
          resultado={resultado}
          gravidade={"Estado normal ou alerta"}
          mensagem={
            "O paciente está totalmente consciente e orientado. Responde de maneira adequada a estímulos verbais e motores."
          }
        />
      )}

      {resultado >= 13 && resultado <= 14 && (
        <ResultCard
          color="#4CAF50"
          resultado={resultado}
          gravidade={"Leve"}
          mensagem={
            "O paciente apresenta algum grau de desorientação ou resposta motoras reduzidas, mas está relativamente consciente."
          }
        />
      )}

      {resultado >= 9 && resultado <= 12 && (
        <ResultCard
          color="#FFC107"
          resultado={resultado}
          gravidade={"Moderado"}
          mensagem={
            "O paciente pode estar desorientado ou com dificuldades para responder de forma apropriada, mas ainda apresenta respostas motoras e/ou verbais. Pode haver sinais de lesão cerebral."
          }
        />
      )}

      {resultado >= 3 && resultado <= 8 && (
        <ResultCard
          color="#FF9800"
          resultado={resultado}
          gravidade={"Grave"}
          mensagem={
            "O paciente está em coma moderado a profundo, com respostas extremamente limitadas ou ausentes."
          }
        />
      )}

      {resultado < 3 && (
        <ResultCard
          color="#D32F2F"
          resultado={resultado}
          gravidade={"Coma profundo / morte cerebral"}
          mensagem={
            "Nenhuma resposta ocular, verbal ou motora. Este é o pior estado possível, indicativo de coma profundo ou morte cerebral."
          }
        />
      )}

      {/* btn container */}
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          textColor="#00468b"
          buttonColor="lightblue"
          rippleColor={"lightcyan"}
          labelStyle={{ fontWeight: "bold" }}
          style={{ borderWidth: 1, borderColor: "#00468b" }}
        >
          Novo Cálculo
        </Button>
        <Button
          mode="contained"
          onPress={showModal}
          textColor="#00468b"
          buttonColor="lightblue"
          rippleColor={"lightcyan"}
          labelStyle={{ fontWeight: "bold" }}
          style={{ borderWidth: 1, borderColor: "#00468b" }}
        >
          Salvar Dados
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    gap: 8,
    backgroundColor: "#fff",
  },
  resultado: {
    fontSize: 40,
    fontWeight: "bold",
  },
  gravidade: {
    fontSize: 24,
    fontWeight: "bold",
  },
  mensagem: {
    fontWeight: "bold",
    fontSize: 24,
  },
});
