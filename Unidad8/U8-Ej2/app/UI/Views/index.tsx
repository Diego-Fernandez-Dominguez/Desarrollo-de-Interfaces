import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";
import { observer } from "mobx-react-lite";
import { PokemonRepository } from "../../Data/Repositories/PokemonRepository";
import { PokemonUseCase } from "../../Domain/UseCases/PokemonUseCase";
import { PokemonListVM } from "../ViewModels/PokemonList";

const vm = new PokemonListVM(
  new PokemonUseCase(new PokemonRepository())
);

const { width } = Dimensions.get('window');
const numColumns = width > 600 ? 4 : 2;
const cardWidth = (width - 32 - (numColumns - 1) * 12) / numColumns;

const getTypeColor = (id: number): string => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#F8B739', '#52B788', '#E76F51', '#2A9D8F'
  ];
  return colors[id % colors.length];
};

export default observer(() => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.title}>Pokédex</Text>
      <Text style={styles.subtitle}>{vm.pokemonList.length} Pokémon capturados</Text>
    </View>

    <FlatList
      data={vm.pokemonList}
      numColumns={numColumns}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContent}
      columnWrapperStyle={numColumns > 1 ? styles.row : null}
      renderItem={({ item }) => (
        <View style={[styles.card, { width: cardWidth }]}>
          <View style={[styles.cardHeader, { backgroundColor: getTypeColor(item.id) }]}>
            <Text style={styles.pokemonId}>#{item.id.toString().padStart(3, '0')}</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.pokemonName}>{item.nombre}</Text>
          </View>
        </View>
      )}
    />

    <TouchableOpacity 
      style={styles.floatingButton}
      onPress={() => vm.loadNextPage()}
    >
      <Text style={styles.floatingButtonText}>Cargar más Pokémon</Text>
    </TouchableOpacity>
  </View>
));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100, // Espacio extra para que el botón flotante no tape el último elemento
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardBody: {
    padding: 12,
    alignItems: 'center',
  },
  pokemonName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212529',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginLeft: 750,
    marginRight: 750,
    alignItems: 'center',
    shadowColor: '#007BFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});