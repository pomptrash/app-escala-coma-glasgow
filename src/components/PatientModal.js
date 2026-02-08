import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  Button,
  Modal,
  Portal,
  IconButton,
  TextInput,
  useTheme,
} from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useCallback, memo, useEffect } from "react";

export const PatientModal = memo(function PatientModal({
  modalVisible,
  hideModal,
  onSubmit,
  editingPatient,
}) {
  // react hook form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: editingPatient });

  const { colors } = useTheme();

  useEffect(() => {
    if (editingPatient) {
      reset(editingPatient);
    }
  }, [editingPatient, reset]);

  const handleSave = useCallback(
    (data) => {
      onSubmit(data);
    },
    [onSubmit],
  );
  return (
    <Portal>
      <Modal
        visible={modalVisible}
        onDismiss={hideModal}
        style={styles.modal}
        contentContainerStyle={[
          styles.modalContent,
          { borderColor: colors.border, backgroundColor: colors.background },
        ]}
      >
        {/* btn para fechar o modal */}
        <IconButton
          icon={"close-box"}
          size={30}
          iconColor={colors.button}
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
                      <Text
                        style={[styles.errorMessage, { color: colors.danger }]}
                      >
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
                      <Text
                        style={[styles.errorMessage, { color: colors.danger }]}
                      >
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
                onPress={handleSubmit(handleSave)}
                textColor={colors.textPrimary}
                buttonColor={colors.button}
                labelStyle={{ fontWeight: "bold" }}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  padding: 8,
                }}
              >
                Salvar Dados
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
});

const styles = StyleSheet.create({
  modal: {
    padding: 15,
  },
  modalContent: {
    borderWidth: 1,
    padding: 30,
    paddingVertical: 50,
    borderRadius: 16,
  },
  errorMessage: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    padding: 5,
  },
});
