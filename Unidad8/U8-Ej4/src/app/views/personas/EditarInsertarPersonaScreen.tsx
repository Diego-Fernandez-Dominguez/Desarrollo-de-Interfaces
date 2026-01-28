import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { container } from '../../../di/container';
import { DITypes } from '../../../di/types';
import { PersonasViewModel } from '../../../presentation/viewmodels/persona/PersonasViewModel';
import { DepartamentosViewModel } from '../../../presentation/viewmodels/departamento/DepartamentosViewModel';
import { clsPersona } from '../../../domain/entities/clsPersona';

export const EditarInsertarPersonaScreen: React.FC = observer(() => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const personaId = params.personaId ? Number(params.personaId) : undefined;

  const personasVM = container.get<PersonasViewModel>(DITypes.PersonasViewModel);
  const departamentosVM = container.get<DepartamentosViewModel>(DITypes.DepartamentosViewModel);

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [idDepartamento, setIdDepartamento] = useState(0);
  const [imagen, setImagen] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isEditing = personaId !== undefined;

  useEffect(() => {
    const init = async () => {
      await departamentosVM.loadDepartamentos();

      if (personasVM.personas.length === 0) {
        await personasVM.loadPersonas();
      }

      if (!isEditing) {
        setNombre('');
        setApellido('');
        setFechaNacimiento('');
        setIdDepartamento(0);
        setImagen('');
        setDireccion('');
        setTelefono('');
        return;
      }

      const persona = personasVM.personas.find(p => p.id === personaId);

      if (persona) {
        setNombre(persona.nombre);
        setApellido(persona.apellido);

        const fecha = new Date(persona.fechaNacimiento);
        setFechaNacimiento(fecha.toISOString().split('T')[0]);

        setIdDepartamento(persona.idDepartamento);
        setImagen(persona.imagen || '');
        setDireccion(persona.direccion || '');
        setTelefono(persona.telefono || '');
      }
    };

    init();
  }, [personaId]);

  const handleSave = async () => {
    if (!nombre || !apellido || !fechaNacimiento || !idDepartamento) {
      window.confirm('Por favor rellena todos los campos');
      return;
    }

    const fechaDate = new Date(fechaNacimiento);

    const persona = new clsPersona(
      isEditing ? personaId! : 0,
      nombre,
      apellido,
      fechaDate,
      idDepartamento,
      imagen || '',
      direccion || '',
      telefono || ''
    );

    const success = isEditing
      ? await personasVM.updatePersona(persona)
      : await personasVM.addPersona(persona);

    if (success) {
      router.push('/views/personas/ListadoPersonaScreen')
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

        {/* NOMBRE */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Nombre *</Text>
          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Ingresa el nombre"
          />
        </View>

        {/* APELLIDO */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Apellido *</Text>
          <TextInput
            style={styles.input}
            value={apellido}
            onChangeText={setApellido}
            placeholder="Ingresa el apellido"
          />
        </View>

        {/* FECHA */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Fecha de Nacimiento * (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.input}
            value={fechaNacimiento}
            onChangeText={setFechaNacimiento}
            placeholder="2000-01-01"
          />
        </View>

        {/* DEPARTAMENTO - DROPDOWN */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Departamento *</Text>

          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDropdownOpen(!dropdownOpen)}
          >
            <Text style={styles.dropdownButtonText}>
              {idDepartamento
                ? departamentosVM.departamentos.find(d => d.id === idDepartamento)?.nombre
                : "Selecciona un departamento"}
            </Text>
            <Text style={styles.dropdownArrow}>{dropdownOpen ? "▲" : "▼"}</Text>
          </TouchableOpacity>

          {dropdownOpen && (
            <View style={styles.dropdownList}>
              {departamentosVM.departamentos.map((dept) => (
                <TouchableOpacity
                  key={dept.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setIdDepartamento(dept.id);
                    setDropdownOpen(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>{dept.nombre}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* IMAGEN */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Imagen (URL)</Text>
          <TextInput
            style={styles.input}
            value={imagen}
            onChangeText={setImagen}
            placeholder="https://ejemplo.com/foto.jpg"
          />
        </View>

        {/* DIRECCIÓN */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Dirección</Text>
          <TextInput
            style={styles.input}
            value={direccion}
            onChangeText={setDireccion}
            placeholder="Dirección"
          />
        </View>

        {/* TELÉFONO */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            value={telefono}
            onChangeText={setTelefono}
            placeholder="Teléfono"
            keyboardType="phone-pad"
          />
        </View>

        {/* BOTONES */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.push('/views/personas/ListadoPersonaScreen')}>
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

  /* DROPDOWN */
  dropdownButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e1e8ed",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  dropdownArrow: {
    fontSize: 16,
    color: "#2c3e50",
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e1e8ed",
    borderRadius: 8,
    marginTop: 4,
    overflow: "hidden",
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e1e8ed",
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#2c3e50",
  },

  /* BOTONES */
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
