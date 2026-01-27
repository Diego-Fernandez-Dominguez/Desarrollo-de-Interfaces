import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'expo-router';
import { container } from '../../../di/container';
import { DITypes } from '../../../di/types';
import { PersonasViewModel } from '../../../presentation/viewmodels/persona/PersonasViewModel';
import { PersonaListItem } from '../../../presentation/components/personas/PersonaListItem';

export const ListadoPersonasScreen: React.FC = observer(() => {
  const router = useRouter();
  const viewModel = container.get<PersonasViewModel>(DITypes.PersonasViewModel);

  useEffect(() => {
    viewModel.loadPersonas();
  }, []);

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta persona?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const success = await viewModel.deletePersona(id);
            if (!success && viewModel.error) {
              Alert.alert('Error', viewModel.error);
              viewModel.clearError();
            }
          },
        },
      ]
    );
  };

  const handleEdit = (personaId: number) => {
    const persona = viewModel.personas.find(p => p.id === personaId);
    if (persona) {
      viewModel.selectPersona(persona);

      router.push({
        pathname: '/views/personas/EditarInsertarPersonaScreen',
        params: { personaId },
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Personas</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            viewModel.selectPersona(null);
            router.push('/views/personas/EditarInsertarPersonaScreen');

          }}
        >
          <Text style={styles.addButtonText}>+ Añadir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre, apellido o departamento..."
          value={viewModel.searchQuery}
          onChangeText={(text) => viewModel.setSearchQuery(text)}
        />
      </View>

      {viewModel.loading ? (
        <View style={styles.centerContent}>
          <Text>Cargando...</Text>
        </View>
      ) : (
        <FlatList
          data={viewModel.personasFiltradas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PersonaListItem
              persona={item}
              onPress={() => handleEdit(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.centerContent}>
              <Text style={styles.emptyText}>No hay personas registradas</Text>
            </View>
          }
        />
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e8ed',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  addButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    backgroundColor: '#f5f7fa',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  listContent: {
    paddingVertical: 8,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d',
  },
});

export default ListadoPersonasScreen;
