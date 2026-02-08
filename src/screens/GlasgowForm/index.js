import { Controller, useForm } from "react-hook-form";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RadioButton, Button, useTheme } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useCallback } from "react";

export function GlasgowForm() {
  const navigation = useNavigation();
  const { colors } = useTheme();

  // hook do react hook form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      aberturaOcular: "4",
      respostaVerbal: "5",
      respostaMotora: "6",
      reatividadePupilar: "0",
    },
  });

  // função para calcular o resultado da escala de glasgow
  const calculateGlasgow = useCallback((data) => {
    const {
      aberturaOcular,
      respostaMotora,
      respostaVerbal,
      reatividadePupilar,
    } = data; // parâmetro data que será passado pelo onSubmit

    // fazendo o cálculo.
    // utilizando o operador unário (+) para a conversão dos valores de string para number
    const resultado =
      +aberturaOcular + +respostaMotora + +respostaVerbal + +reatividadePupilar;

    return resultado;
  }, []);

  // função para navegar até a tela de resultado
  const onSubmit = useCallback(
    (data) => {
      const resultado = calculateGlasgow(data);
      navigation.navigate("GlasgowFormResult", {
        resultado,
        indicadores: data,
      });
    },
    [navigation, calculateGlasgow],
  );
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          gap: 16,
          paddingBottom: 40,
        }}
      >
        {/* input da abertura ocular */}
        <Controller
          name="aberturaOcular"
          control={control}
          rules={{ required: "Campo obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <View style={[styles.inputContainer, {borderColor: colors.border}]}>
              {/* mensagem de erro caso o input não seja preenchido */}
              {errors.aberturaOcular && (
                <Text style={styles.errorMessage}>
                  {errors.aberturaOcular.message}
                </Text>
              )}
              <View>
                <Text
                  style={[styles.inputLabel, { color: colors.textPrimary }]}
                >
                  Abertura Ocular
                </Text>
              </View>
              <RadioButton.Group
                onValueChange={(newValue) => onChange(newValue)}
                value={value}
              >
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Abertura ocular espontânea (4)"
                  value="4"
                />
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Abertura ocular ao comando verbal (3)"
                  value="3"
                />
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Abertura ocular à dor (2)"
                  value="2"
                />
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Sem abertura ocular (1)"
                  value="1"
                />
              </RadioButton.Group>
            </View>
          )}
        />

        {/* input da resposta verbal */}
        <Controller
          name="respostaVerbal"
          control={control}
          rules={{ required: "Campo obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <View style={[styles.inputContainer, {borderColor: colors.border}]}>
              {/* mensagem de erro caso o input não seja preenchido */}
              {errors.respostaVerbal && (
                <Text style={styles.errorMessage}>
                  {errors.respostaVerbal.message}
                </Text>
              )}

              <View>
                <Text
                  style={[styles.inputLabel, { color: colors.textPrimary }]}
                >
                  Resposta Verbal
                </Text>
              </View>
              <RadioButton.Group
                onValueChange={(newValue) => onChange(newValue)}
                value={value}
              >
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Orientado (responde de forma adequada) (5)"
                  value="5"
                />
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Confusa (responde, mas com dificuldade para entender ou responder adequadamente) (4)"
                  value="4"
                />
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Palavras inadequadas (fala, mas não faz sentido) (3)"
                  value="3"
                />
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Sons incompreensíveis (emite sons, mas não palavras) (2)"
                  value="2"
                />
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Sem resposta verbal (1)"
                  value="1"
                />
              </RadioButton.Group>
            </View>
          )}
        />

        {/* input da resposta motora */}
        <Controller
          name="respostaMotora"
          control={control}
          rules={{ required: "Campo obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <View style={[styles.inputContainer, {borderColor: colors.border}]}>
              {/* mensagem de erro caso o input não seja preenchido */}
              {errors.respostaMotora && (
                <Text style={styles.errorMessage}>
                  {errors.respostaMotora.message}
                </Text>
              )}
              <View>
                <Text
                  style={[styles.inputLabel, { color: colors.textPrimary }]}
                >
                  Resposta Motora
                </Text>
              </View>
              <RadioButton.Group
                onValueChange={(newValue) => onChange(newValue)}
                value={value}
              >
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Obedece a comandos (realiza movimentos solicitados) (6)"
                  value="6"
                />
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Localiza a dor (move-se para o local da dor) (5)"
                  value="5"
                />
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Resposta de flexão normal (flexão dos membros devido à dor) (4)"
                  value="4"
                />
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Resposta de flexão anormal (flexão involuntária dos membros, mas de forma não adequada)
 (3)"
                  value="3"
                />
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Extensão anormal (extensão dos membros devido à dor) (2)"
                  value="2"
                />
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Sem resposta motora (1)"
                  value="1"
                />
              </RadioButton.Group>
            </View>
          )}
        />

        {/* input de reatividade pupilar */}
        <Controller
          name="reatividadePupilar"
          control={control}
          rules={{ required: "Campo obrigatório" }}
          render={({ field: { onChange, value } }) => (
            <View style={[styles.inputContainer, {borderColor: colors.border}]}>
              {/* mensagem de erro caso o input não seja preenchido */}
              {errors.reatividadePupilar && (
                <Text style={styles.errorMessage}>
                  {errors.reatividadePupilar.message}
                </Text>
              )}
              <View>
                <Text
                  style={[styles.inputLabel, { color: colors.textPrimary }]}
                >
                  Reatividade Pupilar
                </Text>
              </View>
              <RadioButton.Group
                onValueChange={(newValue) => onChange(newValue)}
                value={value}
              >
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Ambas as pupilas reagem à luz (0)"
                  value="0"
                />
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Apenas uma pupila reage à luz (-1)"
                  value="-1"
                />
                <RadioButton.Item
                  labelStyle={styles.radioItem}
                  label="Nenhuma pupila reage à luz (-2)"
                  value="-2"
                />
              </RadioButton.Group>
            </View>
          )}
        />

        {/* submit btn */}
        <Button
          onPress={handleSubmit(onSubmit)}
          mode="contained"
          textColor={colors.textPrimary}
          style={{ padding: 8 }}
        >
          Calcular
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 24,
    fontWeight: "900",
    padding: 8,
  },
  inputContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
  },
  errorMessage: {
    fontSize: 16,
    color: "#c00",
    fontWeight: "bold",
    textTransform: "uppercase",
    position: "absolute",
    top: -15,
    right: 30,
    padding: 5,
  },
  radioItem: {
    fontWeight: "bold",
  },
});
