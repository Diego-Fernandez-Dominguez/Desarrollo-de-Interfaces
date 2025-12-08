import { AuthProvider, useAuth } from "../context/AuthContext";
import { Button, Text, View } from "react-native";

function AuthStatus() {
  const { isLoggedIn, userName, loginUser, logoutUser } = useAuth();
  
  return (
    <View>
      {isLoggedIn ? (
        <>
          <Text>Conectado, pero no mucho</Text>
          <Text>Usuario: {userName}</Text>
          <Button 
            title="Cerrar Sesion" 
            onPress={logoutUser} 
            color="red" 
          />
        </>
      ) : (
        <>
          <Text>Flipao, no estas ni conectado</Text>
          <Button 
            title="Iniciar Sesion" 
            onPress={() => loginUser("Yo")} 
            color="cyan" 
          />
        </>
      )}
    </View>
  );
}

export default function Index() {
  return (
    <AuthProvider>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AuthStatus />
      </View>
    </AuthProvider>
  );
}