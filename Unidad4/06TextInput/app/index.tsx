import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";

export default function App() {
  const [texto, setTexto] = useState<string>("");

  return (
    <View style={styles.contenedor}>
      <TextInput
        style={styles.entradaDeTexto}
        placeholder="Cuentame tu vida, pero no te flipes"
        value={texto}
        onChangeText={setTexto}
      />
      <Text style={styles.textoEco}>Eco: {texto}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fae8e0ff',
  },
  entradaDeTexto: {
    borderWidth: 2,
    borderColor: '#d17104ff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#ec8129ff',
    backgroundColor: '#ffd591ff',
    marginBottom: 20,
    marginRight:"80%"
  },
  textoEco: {
    fontSize: 18,
    color: '#ec8129ff',
  },
});