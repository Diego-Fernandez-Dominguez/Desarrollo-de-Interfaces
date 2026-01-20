import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buildChatGrupalVM } from '../app/di/container';
import { clsMensajeUsuario } from '../app/domain/entitites/clsMensajeUsuario';

const HUB_URL = 'https://ejercicio1chatdiegofd-huhpawhwhvdse4hz.spaincentral-01.azurewebsites.net/chatHub';

export const ChatGrupalView: React.FC = () => {
  const [vm] = useState(() => buildChatGrupalVM(HUB_URL));
  const [conexion, setConexion] = useState<boolean>(false);
  const [mensajes, setMensajes] = useState<clsMensajeUsuario[]>([]);
  const [nombre, setNombre] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');

  useEffect(() => {
    vm.comenzarConexion(setMensajes, setConexion);
  }, [vm]);

  const onPressEnviar = async () => {
    vm.setNombre(nombre);
    vm.setMensaje(mensaje);
    await vm.apretarBoton(setMensajes);
    setMensaje(vm.getMensaje()._mensaje); // se queda vacío tras enviar
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.estado}>
        {conexion ? 'Conectado al chat' : 'Desconectado'}
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.input}
        />
        <TextInput
          placeholder="Mensaje"
          value={mensaje}
          onChangeText={setMensaje}
          style={styles.input}
        />
        <Button title="Enviar" onPress={onPressEnviar} />
      </View>

      <FlatList
        data={mensajes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageItem}>
            <Text style={styles.userText}>{item._nombre}:</Text>
            <Text>{item._mensaje}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  estado: { marginBottom: 10, fontWeight: 'bold' },
  inputContainer: { marginBottom: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  messageItem: { flexDirection: 'row', marginBottom: 10 },
  userText: { fontWeight: 'bold', marginRight: 5 },
});
