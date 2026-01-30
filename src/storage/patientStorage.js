import AsyncStorage from "@react-native-async-storage/async-storage";

const PATIENT_COLLECTION = "@glasgow:patients";

export const getData = async () => {
  try {
    const response = await AsyncStorage.getItem(PATIENT_COLLECTION);
    const data = response ? JSON.parse(response) : [];
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const postData = async (patientData) => {
  try {
    const id = String(new Date().getTime());
    const newPatient = { id, ...patientData };

    const currentData = await getData();

    const updatedData = [...currentData, newPatient];

    await AsyncStorage.setItem(PATIENT_COLLECTION, JSON.stringify(updatedData));
  } catch (err) {
    console.log(err);
    throw err;
  }
};
