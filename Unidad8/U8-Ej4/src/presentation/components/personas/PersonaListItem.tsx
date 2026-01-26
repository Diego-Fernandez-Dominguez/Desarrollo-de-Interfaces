import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.colorBar, { backgroundColor: persona.color }]} />
      <View style={styles.content}>
        <Text style={styles.nombre}>
          {persona.nombre} {persona.apellido}
        </Text>
        <Text style={styles.info}>
          {persona.nombreDepartamento} • {calcularEdad(persona.fechaNacimiento)} años
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  colorBar: {
    width: 6,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
  deleteButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  deleteText: {
    fontSize: 20,
  },
});