import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  Button,
  Modal,
  Portal,
  IconButton,
  TextInput,
} from "react-native-paper";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { postData } from "../../storage/patientStorage";

export function GlasgowFormResult() {
  // modal
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  // navigation params
  const navigation = useNavigation();
  const route = useRoute();
  const { resultado, indicadores } = route.params;

  // react hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // conditional result component
  function ResultCard({ resultado, gravidade, mensagem, color }) {
    return (
      <View style={[styles.container, { borderWidth: 1, borderColor: color }]}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Resultado:</Text>
        <Text style={[styles.resultado, { color: color }]}>{resultado}</Text>
        <Text style={[styles.gravidade, { color: color }]}>{gravidade}</Text>
        <Text style={styles.mensagem}>{mensagem}</Text>
      </View>
    );
  }

  // função para persistir os dados inseridos pelo usuário
  const onSubmit = async (data) => {
    try {
      const patientData = {
        ...data,
        indicadores,
        resultado,
      };
      console.log(patientData);
      await postData(patientData);

      hideModal();
      navigation.navigate("Home");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar");
    }
  };
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
      <Portal>
        <Modal
          visible={modalVisible}
          onDismiss={hideModal}
          style={styles.modal}
          contentContainerStyle={styles.modalContent}
        >
          {/* btn para fechar o modal */}
          <IconButton
            icon={"close-box"}
            size={30}
            iconColor="#00468b"
            onPress={hideModal}
            style={{
              position: "absolute",
              top: -10,
              right: -10,
              borderRadius: 8,
            }}
          />
          {/* form container */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: "flex-start",
                paddingTop: 20,
                paddingBottom: 20,
              }}
            >
              <View style={{ gap: 16 }}>
                {/* input para nome */}
                <Controller
                  name="patientName"
                  control={control}
                  rules={{
                    required: "Campo obrigatório",
                    maxLength: {
                      value: 100,
                      message: "O nome não deve exceder 100 caracteres",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <View>
                      {errors.patientName && (
                        <Text style={styles.errorMessage}>
                          {errors.patientName.message}
                        </Text>
                      )}
                      <TextInput
                        mode="outlined"
                        label={"Nome Do Paciente *"}
                        value={value}
                        onChangeText={(text) => {
                          const filteredText = text.replace(
                            /[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g,
                            "",
                          );
                          onChange(filteredText);
                        }}
                      />
                    </View>
                  )}
                />

                {/* input para idade */}
                <Controller
                  name="patientAge"
                  control={control}
                  rules={{
                    required: "Campo obrigatório",
                    min: {
                      value: 0,
                      message: "A idade não pode ser negativa",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <View>
                      {errors.patientAge && (
                        <Text style={styles.errorMessage}>
                          {errors.patientAge.message}
                        </Text>
                      )}
                      <TextInput
                        mode="outlined"
                        keyboardType="numeric"
                        label={"Idade Do Paciente *"}
                        value={value}
                        onChangeText={(age) => {
                          const filteredAge = age.replace(/[^0-9]/g, "");
                          onChange(filteredAge);
                        }}
                      />
                    </View>
                  )}
                />

                {/* input para observação */}
                <Controller
                  name="patientReport"
                  control={control}
                  rules={{
                    maxLength: {
                      value: 500,
                      message: "O campo não pode exceder 500 caracteres",
                    },
                  }}
                  render={({ field: { onChange, value } }) => (
                    <View>
                      <TextInput
                        mode="outlined"
                        label={`Observação (Opcional) ${value?.length ? value.length : "0"}/500`}
                        value={value}
                        onChangeText={onChange}
                        style={{ maxHeight: 120 }}
                        multiline={true}
                      />
                    </View>
                  )}
                />

                <Button
                  mode="contained"
                  onPress={handleSubmit(onSubmit)}
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
          </KeyboardAvoidingView>
        </Modal>
      </Portal>

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
  modal: {
    padding: 15,
  },
  modalContent: {
    backgroundColor: "#f4f5f6",
    borderWidth: 1,
    borderColor: "black",
    padding: 30,
    paddingVertical: 50,
    borderRadius: 16,
  },
  errorMessage: {
    fontSize: 12,
    color: "#c00",
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: 5,
  },
});
