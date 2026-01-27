import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { PersonaUIModel } from '../../models/PersonaUIModel';

interface Props {
  persona: PersonaUIModel;
  onPress: () => void;
  onDelete: () => void;
}

export const PersonaListItem: React.FC<Props> = ({ persona, onPress, onDelete }) => {
  const calcularEdad = (fechaNacimiento: Date): number => {
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      
      {/* BARRA DE COLOR */}
      <View style={[styles.colorBar, { backgroundColor: persona.color }]} />

      {/* FOTO */}
      {persona.imagen ? (
        <Image source={{ uri: persona.imagen }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Sin foto</Text>
        </View>
      )}

      {/* CONTENIDO */}
      <View style={styles.content}>
        <Text style={styles.nombre}>{persona.nombre} {persona.apellido}</Text>

        <Text style={styles.info}>
          {persona.nombreDepartamento} • {calcularEdad(persona.fechaNacimiento)} años
        </Text>

        {persona.direccion && (
          <Text style={styles.extra}>📍 {persona.direccion}</Text>
        )}

        {persona.telefono && (
          <Text style={styles.extra}>📞 {persona.telefono}</Text>
        )}
      </View>

      {/* BOTÓN BORRAR */}
      <Pressable
        style={styles.deleteButton}
        onPress={(e) => {
          e.stopPropagation?.();
          onDelete();
        }}
      >
        <Text style={styles.deleteText}>🗑️</Text>
      </Pressable>

    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center'
  },
  colorBar: {
    width: 6,
    height: '100%',
    borderRadius: 6,
    marginRight: 10
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12
  },
  placeholderImage: {
    width: 60,
    height: 60,
    backgroundColor: '#ddd',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  placeholderText: {
    fontSize: 10,
    color: '#555'
  },
  content: {
    flex: 1
  },
  nombre: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50'
  },
  info: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2
  },
  extra: {
    fontSize: 13,
    color: '#95a5a6',
    marginTop: 2
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  deleteText: {
    fontSize: 22
  }
});
