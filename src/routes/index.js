import { NavigationContainer } from "@react-navigation/native";
import { StackRouter } from "./stack.router";

export function Router() {
  return (
    <NavigationContainer>
      <StackRouter />
    </NavigationContainer>
  );
}
