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
          
          <View style={styles.contentRow}>
            {item.Imagen ? (
              <View style={[styles.imageContainer, isSelected && styles.imageContainerSelected]}>
                <Image source={{ uri: item.Imagen }} style={styles.imagen} />
              </View>
            ) : null}
            
            <View style={styles.infoBlock}>
              {/* He mantenido el formato Nombre Apellido original */}
              <Text style={styles.itemText}>
                {`> ${item.Nombre} ${item.Apellido}`}
              </Text>
              
              <Text style={styles.itemSubText}>
                Fecha de nacimiento: {item.FechaNac.toLocaleDateString()}
              </Text>
              
              {item.Telefono ? (
                <Text style={styles.itemSubText}>Tel: {item.Telefono}</Text>
              ) : null}
              
              {item.IdDepartamento ? (
                <Text style={styles.itemSubText}>Departamento ID: {item.IdDepartamento}</Text>
              ) : null}
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Título original pero con estilo */}
      <Text style={styles.titulo}>LISTADO DE PERSONAS</Text>
      
      <View style={styles.statusPanel}>
        {viewModel.personaSeleccionada ? (
          <Text style={styles.subtituloSelected}>
            Persona seleccionada: {viewModel.personaSeleccionada.Nombre} {viewModel.personaSeleccionada.Apellido}
          </Text>
        ) : (
          <Text style={styles.subtitulo}>Seleccione una persona de la lista</Text>
        )}
      </View>

      <FlatList
        data={viewModel.personasList}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={() => (
          <Text style={styles.textoVacio}>No hay personas registradas</Text>
        )}
      />
    </SafeAreaView>
  );
});

// --- ESTILOS VISUALES FRIKIS ---
const COLORS = {
  background: "#050505",   // Negro profundo
  cardBg: "#0F0F0F",       // Casi negro
  neonGreen: "#00FF41",    // Verde Matrix
  neonPink: "#FF00FF",     // Rosa Cyberpunk
  textMain: "#E0E0E0",     // Blanco apagado
  textDim: "#AAAAAA",      // Gris claro
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    color: COLORS.neonGreen,
    fontFamily: "monospace", // Fuente tipo código
    fontWeight: "bold",
    textShadowColor: COLORS.neonGreen,
    textShadowRadius: 8,
    letterSpacing: 2,
  },
  statusPanel: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neonGreen,
    paddingBottom: 10,
    borderStyle: 'dashed', // Línea punteada retro
  },
  subtitulo: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.textDim,
    fontFamily: "monospace",
  },
  subtituloSelected: {
    fontSize: 14,
    textAlign: "center",
    color: COLORS.neonPink,
    fontFamily: "monospace",
    fontWeight: "bold",
    textShadowColor: COLORS.neonPink,
    textShadowRadius: 5,
  },
  listContent: {
    paddingBottom: 20,
  },
  item: {
    backgroundColor: COLORS.cardBg,
    padding: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.neonGreen,
    borderLeftWidth: 6, // Borde lateral grueso
  },
  itemSeleccionado: {
    borderColor: COLORS.neonPink,
    backgroundColor: '#1a051a', // Un tono rojizo muy oscuro
    borderLeftColor: COLORS.neonPink,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: COLORS.neonGreen,
    padding: 2,
    marginRight: 12,
  },
  imageContainerSelected: {
    borderColor: COLORS.neonPink,
  },
  imagen: {
    width: 50,
    height: 50,
  },
  infoBlock: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    color: COLORS.textMain,
    fontFamily: "monospace",
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemSubText: {
    fontSize: 12,
    color: COLORS.neonGreen, // Texto secundario en verde
    fontFamily: "monospace",
    opacity: 0.8,
    marginTop: 2,
  },
  separator: {
    height: 16,
  },
  textoVacio: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "red",
    fontFamily: "monospace",
  },
});

export default PeopleList;