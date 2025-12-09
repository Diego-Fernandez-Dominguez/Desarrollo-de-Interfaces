import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { container } from "@/app/Core/container";
import { TYPES } from "@/app/Core/types";
import { clsPersona } from "@/app/Domain/Entities/clsPersona";
import { PeopleListVM } from "@/app/UI/ViewModels/PeopleListVM";

const PeopleList = observer(() => {
  const vmRef = useRef<PeopleListVM | null>(null);

  if (vmRef.current === null) {
    vmRef.current = container.get<PeopleListVM>(TYPES.IndexVM);
  }

  const viewModel = vmRef.current;

  const renderItem = ({ item }: { item: clsPersona }) => {
    const isSelected = viewModel.personaSeleccionada?.Id === item.Id;
    return (
      <Pressable onPress={() => (viewModel.personaSeleccionada = item)}>
        <View style={[styles.item, isSelected && styles.itemSeleccionado]}>
          {item.Imagen ? (
            <Image source={{ uri: item.Imagen }} style={styles.imagen} />
          ) : null}
          <Text style={styles.itemText}>
            {item.Nombre} {item.Apellido}
          </Text>
          <Text style={styles.itemSubText}>
            Fecha de nacimiento: {item.FechaNac.toLocaleDateString()}
          </Text>
          {item.Telefono ? <Text style={styles.itemSubText}>Tel: {item.Telefono}</Text> : null}
          {item.IdDepartamento ? (
            <Text style={styles.itemSubText}>Departamento ID: {item.IdDepartamento}</Text>
          ) : null}
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Listado de Personas</Text>
      {viewModel.personaSeleccionada ? (
        <Text style={styles.subtitulo}>
          Persona seleccionada: {viewModel.personaSeleccionada.Nombre}{" "}
          {viewModel.personaSeleccionada.Apellido}
        </Text>
      ) : (
        <Text style={styles.subtitulo}>Seleccione una persona de la lista</Text>
      )}

      <FlatList
        data={viewModel.personasList}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => (
          <Text style={styles.textoVacio}>No hay personas registradas</Text>
        )}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFDF8",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
    textAlign: "center",
    color: "#D35400", // naranja principal
    letterSpacing: 1,
    fontFamily: "System",
  },
  subtitulo: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    color: "#D97733", // naranja más claro y cálido
    fontStyle: "italic",
    fontFamily: "System",
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F0E5D8",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  itemSeleccionado: {
    backgroundColor: "#FFEFD5",
    borderColor: "#E67E22",
    borderWidth: 1.5,
  },
  imagen: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: "#2C2C2C",
    fontFamily: "System",
  },
  itemSubText: {
    fontSize: 14,
    color: "#555",
    fontFamily: "System",
  },
  separator: {
    height: 12,
  },
  textoVacio: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#B7410E",
    fontStyle: "italic",
    fontFamily: "System",
  },
});

export default PeopleList;
