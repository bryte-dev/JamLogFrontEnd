import { View, Button, TextInput } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import api from "../../src/api/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        email,
        password,
        username,
      });

      router.replace("/auth/login");
    } catch (err) {
      console.error("REGISTER ERROR", err);
    }
  };

  return (
    <View>
      <TextInput placeholder="Username" onChangeText={setUsername} />
      <TextInput placeholder="Email" onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
}
