import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { container } from '../../../../di/container';
import { DITypes } from '../../../../di/types';
import { DepartamentosViewModel } from '../../../../presentation/viewmodels/departamento/DepartamentosViewModel';
import { clsDepartamento } from '../../../../domain/entities/clsDepartamento';

type DepartamentosStackParamList = {
  ListadoDepartamentos: undefined;
  EditarInsertarDepartamento: { departamentoId?: number };
};

type NavigationProp = StackNavigationProp<DepartamentosStackParamList>;
type RoutePropType = RouteProp<DepartamentosStackParamList, 'EditarInsertarDepartamento'>;

export const EditarInsertarDepartamentoScreen: React.FC = observer(() => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const viewModel = container.get<DepartamentosViewModel>(DITypes.DepartamentosViewModel);

  const [nombre, setNombre] = useState('');

  const isEditing = route.params?.departamentoId !== undefined;

  useEffect(() => {
    if (isEditing && viewModel.departamentoSeleccionado) {
      setNombre(viewModel.departamentoSeleccionado.nombre);
    }
  }, []);

  const handleSave = async () => {
    if (!nombre.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para el departamento');
      return;
    }

    const departamento = new clsDepartamento(
      isEditing ? viewModel.departamentoSeleccionado!.id : 0,
      nombre
    );

    const success = isEditing
      ? await viewModel.updateDepartamento(departamento)
      : await viewModel.addDepartamento(departamento);

    if (success) {
      navigation.goBack();
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
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
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