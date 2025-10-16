import React, { useState } from "react";
import { View, Text, Pressable, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);

  const handlePress = () => {
    setCargando(true);
    setExito(false);

    setTimeout(() => {
      setCargando(false);
      setExito(true);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.boton} onPress={handlePress}>
        <Ionicons name="reload" size={32} color="#fff" />
      </Pressable>

      {cargando && (
        <View style={styles.activityContainer}>
          <ActivityIndicator style={styles.activity} />
        </View>
      )}

      {exito && <Text style={styles.textoExito}>Cargado con éxito</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fae8e0ff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  boton: {
    backgroundColor: '#ec8129ff',
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  activityContainer: {
    marginTop: 20,
  },
  activity: {
    transform: [{ scale: 1.5 }],
    tintColor: '#ec8129ff',
  },
  textoExito: {
    marginTop: 20,
    fontSize: 18,
    color: '#d17104ff',
    fontWeight: 'bold',
  },
});