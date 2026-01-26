import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { container } from '../../../di/container';
import { DITypes } from '../../../di/types';
import { PersonasViewModel } from '../../../presentation/viewmodels/persona/PersonasViewModel';
import { DepartamentosViewModel } from '../../../presentation/viewmodels/departamento/DepartamentosViewModel';
import { clsPersona } from '../../../domain/entities/clsPersona';

type PersonasStackParamList = {
  ListadoPersonas: undefined;
  EditarInsertarPersona: { personaId?: number };
};

type NavigationProp = StackNavigationProp<PersonasStackParamList>;
type RoutePropType = RouteProp<PersonasStackParamList, 'EditarInsertarPersona'>;

export const EditarInsertarPersonaScreen: React.FC = observer(() => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const personasVM = container.get<PersonasViewModel>(DITypes.PersonasViewModel);
  const departamentosVM = container.get<DepartamentosViewModel>(DITypes.DepartamentosViewModel);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [idDepartamento, setIdDepartamento] = useState(0);
  const [foto, setFoto] = useState('');

  const isEditing = route.params?.personaId !== undefined;

  useEffect(() => {
    departamentosVM.loadDepartamentos();

    if (isEditing && personasVM.personaSeleccionada) {
      const persona = personasVM.personaSeleccionada;
      setNombre(persona.nombre);
      setApellido(persona.apellido);
      const fecha = new Date(persona.fechaNacimiento);
      setFechaNacimiento(fecha.toISOString().split('T')[0]);
      setIdDepartamento(persona.idDepartamento);
      setFoto(persona.foto || '');
    }
  }, []);

  const handleSave = async () => {
    if (!nombre || !apellido || !fechaNacimiento || !idDepartamento) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    const persona = new clsPersona(
      isEditing ? personasVM.personaSeleccionada!.id : 0,
      nombre,
      apellido,
      new Date(fechaNacimiento),
      idDepartamento,
      foto || undefined
    );

    const success = isEditing
      ? await personasVM.updatePersona(persona)
      : await personasVM.addPersona(persona);

    if (success) {
      navigation.goBack();
    } else {
      Alert.alert('Error', personasVM.error || 'No se pudo guardar la persona');
      personasVM.clearError();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {isEditing ? 'Editar Persona' : 'Nueva Persona'}
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre *</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ingresa el nombre"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Apellido *</Text>
          <TextInput
            style={styles.input}
            value={apellido}
            onChangeText={setApellido}
            placeholder="Ingresa el apellido"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Fecha de Nacimiento * (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
            placeholder="2000-01-01"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Departamento *</Text>
          <View style={styles.pickerContainer}>
            {departamentosVM.departamentos.map((dept) => (
              <TouchableOpacity
                key={dept.id}
                style={[
                  styles.pickerOption,
                  idDepartamento === dept.id && styles.pickerOptionSelected,
                ]}
                onPress={() => setIdDepartamento(dept.id)}
              >
                <Text
                  style={[
                    styles.pickerText,
                    idDepartamento === dept.id && styles.pickerTextSelected,
                  ]}
                >
                  {dept.nombre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>URL Foto (opcional)</Text>
          <TextInput
            style={styles.input}
            value={foto}
            onChangeText={setFoto}
            placeholder="https://ejemplo.com/foto.jpg"
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
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e8ed',
    overflow: 'hidden',
  },
  pickerOption: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  pickerOptionSelected: {
    backgroundColor: '#3498db',
  },
  pickerText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  pickerTextSelected: {
    color: '#fff',
    fontWeight: '600',
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

export default EditarInsertarPersonaScreen;