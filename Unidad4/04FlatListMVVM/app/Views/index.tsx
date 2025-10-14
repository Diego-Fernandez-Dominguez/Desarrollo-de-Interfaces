import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";
import { IndexVM } from "../ViewModels/indexVM";

export default function Index() {
  const viewModel = new IndexVM();
  const personas = viewModel.obtenerPersonas();
  const [personaSeleccionadaId, setPersonaSeleccionadaId] = useState<string | null>(null);

  const renderItem = ({ item }: { item: { id: string; nombreCompleto: string } }) => (
    <Pressable
      onPress={() => setPersonaSeleccionadaId(item.id)}
      style={({ pressed }) => [
        styles.contenedoresDePersonasJijiji,
        pressed && styles.itemPressed
      ]}
    >
      <Text style={styles.textito}>{item.nombreCompleto}</Text>
    </Pressable>
  );

  const datos = personaSeleccionadaId ? viewModel.obtenerDatosPersona(personaSeleccionadaId) : null;

  return (
    <View style={styles.container}>
      <FlatList
        data={personas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
      <View style={styles.loDeAbajo}>
        {datos ? (
          <Text style={styles.textoDeLoDeAbajo}>
            ID: {datos.id}{"\n"}
            Nombre: {datos.nombre}{"\n"}
            Apellido: {datos.apellido}
          </Text>
        ) : (
          <Text style={styles.textoDeLoDeAbajo}>Hazle cosquillas a un nombre:</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fae8e0ff",
  },
  contenedoresDePersonasJijiji: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderColor: '#d17104ff',
    borderWidth: 2
  },
  itemPressed: {
    backgroundColor: "#ffe0b2",
  },
  textito: {
    fontSize: 18,
    color: "#ec8129ff"
    
  },
  loDeAbajo: {
    marginTop: 28,
    padding: 18,
    backgroundColor: "#ec8129ff",
    borderRadius: 12,
    elevation: 3,
    borderColor: "#d17104ff",
    borderWidth: 1,
  },
  textoDeLoDeAbajo: {
    fontSize: 18,
    color: "#ffff",
  },
});