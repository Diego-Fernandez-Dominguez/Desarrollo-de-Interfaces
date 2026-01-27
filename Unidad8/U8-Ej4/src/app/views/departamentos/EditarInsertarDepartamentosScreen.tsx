import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { container } from '../../../di/container';
import { DITypes } from '../../../di/types';
import { DepartamentosViewModel } from '../../../presentation/viewmodels/departamento/DepartamentosViewModel';
import { clsDepartamento } from '../../../domain/entities/clsDepartamento';

export const EditarInsertarDepartamentoScreen: React.FC = observer(() => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const departamentoId = params.departamentoId ? Number(params.departamentoId) : undefined;

  const viewModel = container.get<DepartamentosViewModel>(DITypes.DepartamentosViewModel);

  const [nombre, setNombre] = useState('');

  const isEditing = departamentoId !== undefined;

  useEffect(() => {
    const init = async () => {
      if (viewModel.departamentos.length === 0) {
        await viewModel.loadDepartamentos();
      }

      if (!isEditing) {
        setNombre('');
        return;
      }

      const departamento = viewModel.departamentos.find(d => d.id === departamentoId);

      if (departamento) {
        setNombre(departamento.nombre);
      }
    };

    init();
  }, [departamentoId]);

  const handleSave = async () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para el departamento');
      return;
    }

    const departamento = new clsDepartamento(
      isEditing ? departamentoId! : 0,
      nombre
    );

    const success = isEditing
      ? await viewModel.updateDepartamento(departamento)
      : await viewModel.addDepartamento(departamento);

    if (success) {
      router.push('/views/departamentos/ListadoDepartamentosScreen');
    } else {
      Alert.alert('Error', viewModel.error || 'No se pudo guardar el departamento');
      viewModel.clearError();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {isEditing ? 'Editar Departamento' : 'Nuevo Departamento'}
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre del Departamento *</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ingresa el nombre del departamento"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.cancelButton} 
            onPress={() => router.push('/views/departamentos/ListadoDepartamentosScreen')}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e1e8ed',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#95a5a6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#27ae60',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditarInsertarDepartamentoScreen;