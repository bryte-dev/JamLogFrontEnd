import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../src/context/authContext";
import { ActivityIndicator } from "react-native";

function RootLayout() {
  const { token, loading } = useAuth();

  if (loading) return <ActivityIndicator />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {token ? (
        <Stack.Screen name="(app)" />
      ) : (
        <Stack.Screen name="auth" />
      )}
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}
