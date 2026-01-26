import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DepartamentoUIModel } from '../../models/DepartamentoUIModel';

interface Props {
  departamento: DepartamentoUIModel;
  onPress: () => void;
  onDelete: () => void;
}

export const DepartamentoListItem: React.FC<Props> = ({ departamento, onPress, onDelete }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.colorIndicator, { backgroundColor: departamento.color }]} />
      <View style={styles.content}>
        <Text style={styles.nombre}>{departamento.nombre}</Text>
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
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  colorIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  nombre: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 20,
  },
});