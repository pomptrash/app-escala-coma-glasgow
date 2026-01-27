import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";

export function GlasgowFormResult() {
  const route = useRoute();
  const { resultado } = route.params;
  return (
    <View>
      <Text>{resultado}</Text>
    </View>
  );
}
