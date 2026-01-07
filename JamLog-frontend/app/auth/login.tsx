import { View, Button, TextInput } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import api from "../../src/api/api";
import { useAuth } from "../../src/context/authContext";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      await login(res.data.token);
      router.replace("/appindex");
    } catch (err) {
      console.error("LOGIN ERROR", err);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
