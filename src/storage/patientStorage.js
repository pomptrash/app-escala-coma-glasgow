import AsyncStorage from "@react-native-async-storage/async-storage";

const PATIENT_COLLECTION = "@glasgow:patients"; // key passada para o async-storage para identificar os dados salvos

// função para ler os dados salvos
export const getData = async () => {
  try {
    const response = await AsyncStorage.getItem(PATIENT_COLLECTION);
    const data = response ? JSON.parse(response) : []; // caso não exista dados, será criado um array vazio para evitar erros
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// função para salvar os dados
export const postData = async (patientData) => {
  try {
    const id = String(new Date().getTime());
    const newPatient = { id, ...patientData }; // objeto do novo paciente

    // estado atual do array
    const currentData = await getData();

    // adiciona o objeto do novo paciente ao array existente para não sobrescever os dados
    const updatedData = [...currentData, newPatient];

    // guarda o array atualizado
    await AsyncStorage.setItem(PATIENT_COLLECTION, JSON.stringify(updatedData));
  } catch (err) {
    console.log(err);
    throw err;
  }
};
