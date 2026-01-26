import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Router } from "./src/routes";
import { PaperProvider, Button } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <Router>
        <View style={styles.container}>
          <Button>
            <Text>Adicionar</Text>
          </Button>
        </View>
      </Router>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
