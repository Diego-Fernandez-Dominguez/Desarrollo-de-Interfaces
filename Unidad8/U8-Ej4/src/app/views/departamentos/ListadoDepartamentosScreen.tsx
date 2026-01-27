import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'expo-router';
import { container } from '../../../di/container';
import { DITypes } from '../../../di/types';
import { DepartamentosViewModel } from '../../../presentation/viewmodels/departamento/DepartamentosViewModel';
import { DepartamentoListItem } from '../../../presentation/components/departamentos/DepartamentoListItem';

export const ListadoDepartamentosScreen: React.FC = observer(() => {
  const router = useRouter();
  const viewModel = container.get<DepartamentosViewModel>(DITypes.DepartamentosViewModel);

  useEffect(() => {
    viewModel.selectDepartamento(null);
    viewModel.loadDepartamentos();
  }, []);

  const handleDelete = async (id: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este departamento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            const success = await viewModel.deleteDepartamento(id);
            if (!success && viewModel.error) {
              Alert.alert('Error', viewModel.error);
              viewModel.clearError();
            }
          },
        },
      ]
    );
  };

  const handleEdit = (departamentoId: number) => {
    const departamento = viewModel.departamentos.find(d => d.id === departamentoId);
    if (departamento) {
      viewModel.selectDepartamento(departamento);

      router.push({
        pathname: '/views/departamentos/EditarInsertarDepartamentosScreen',
        params: { departamentoId },
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Departamentos</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            viewModel.selectDepartamento(null);
            router.push('/views/departamentos/EditarInsertarDepartamentosScreen');
          }}
        >
          <Text style={styles.addButtonText}>+ Añadir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar departamento..."
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
          data={viewModel.departamentosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <DepartamentoListItem
              departamento={item}
              onPress={() => handleEdit(item.id)}
              onDelete={() => handleDelete(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.centerContent}>
              <Text style={styles.emptyText}>No hay departamentos registrados</Text>
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
    backgroundColor: '#9b59b6',
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

export default ListadoDepartamentosScreen;
