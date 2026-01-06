import { View, Button } from "react-native";
import { router } from "expo-router";

export default function AuthChoice() {
  return (
    <View style={{ padding: 24 }}>
      <Button title="Login" onPress={() => router.push("/auth/login")} />
      <Button title="Register" onPress={() => router.push("/auth/register")} />
    </View>
  );
}
