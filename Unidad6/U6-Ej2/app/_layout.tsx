import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen name="index" options={{title: "Inicio"}} />
    <Stack.Screen name="register" options={{title: "Nuevo Usuario"}} />
    <Stack.Screen name="home" options={{title: "Entrar"}} />
  </Stack>
);
}
