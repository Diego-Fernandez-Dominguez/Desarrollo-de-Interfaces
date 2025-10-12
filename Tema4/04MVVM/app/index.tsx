import React, { useState } from "react";
import { Text, View, FlatList, StyleSheet, Pressable } from "react-native";
import { IndexVM } from "../app/ViewModels/indexVM";

export default function Index() {
  const viewModel = new IndexVM();
  const personas = viewModel.obtenerPersonas();
  const [personaSeleccionadaId, setPersonaSeleccionadaId] = useState<string | null>(null);

  const renderItem = ({ item }: { item: { id: string; nombreCompleto: string } }) => (
    <Pressable
      onPress={() => setPersonaSeleccionadaId(item.id)}
      style={({ pressed }) => [
        styles.item,
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
          <Text style={styles.textoDeLoDeAbajo}>Selecciona una persona</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "#fff3e0",
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#ffb74d",
    backgroundColor: "#ffffff",
    marginVertical: 6,
    borderRadius: 8,
  },
  itemPressed: {
    backgroundColor: "#ffe0b2",
  },
  textito: {
    fontSize: 18,
    color: "#ef6c00"
  },
  loDeAbajo: {
    marginTop: 28,
    padding: 18,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    elevation: 3,
    borderColor: "#ffb74d",
    borderWidth: 1,
  },
  textoDeLoDeAbajo: {
    fontSize: 17,
    color: "#e65100",
  },
});