import { NavigationContainer } from "@react-navigation/native";
import { StackRouter } from "./stack.router";

export function Router({ theme }) {
  return (
    <NavigationContainer theme={theme}>
      <StackRouter />
    </NavigationContainer>
  );
}
