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
    const createdAt = String(new Date().toLocaleString("pt-BR"));
    const newPatient = { id, createdAt, ...patientData }; // objeto do novo paciente

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

// função para deletar um paciente por ID
export const deletePatientById = async (id) => {
  try {
    // estado atual dos dados salvos
    const currentData = await getData();

    // filtra e cria um novo array sem o paciente indicado pelo id
    const filteredData = currentData.filter((patient) => patient.id !== id);

    await AsyncStorage.setItem(
      PATIENT_COLLECTION,
      JSON.stringify(filteredData),
    );

    return filteredData;
  } catch (err) {
    throw err;
  }
};
