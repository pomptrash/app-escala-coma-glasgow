import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlasgowForm } from "../screens/GlasgowForm";
import Home from "../screens/Home";

const StackNavigator = createNativeStackNavigator();

export function StackRouter() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        component={Home}
        name="Home"
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        component={GlasgowForm}
        name="GlasgowForm"
        options={{ headerShown: true, headerTitle: "Calcular Escala Glasgow" }}
      />
    </StackNavigator.Navigator>
  );
}
