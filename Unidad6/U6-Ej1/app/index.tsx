import React from 'react';
import { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { ProductCard } from './presentation/components/ProductCard';
import { Cart } from './presentation/components/Cart';

const products = [
  {
    id: '1',
    name: "Gra, el hermano de Gru",
    price: 140,
    imageUrl: "https://ih1.redbubble.net/image.4744606411.8211/flat,750x,075,f-pad,750x1000,f8f8f8.jpg",
  },
  {
    id: '2',
    name: "Manzana Dorada",
    price: 120,
    imageUrl: "https://minecraft.wiki/images/Golden_Apple_JE2_BE2.png?aa827",
  },
  {
    id: '3',
    name: "Camiseta Oficial Puma",
    price: 90,
    imageUrl: "https://i.etsystatic.com/16224542/r/il/cef338/3515744426/il_fullxfull.3515744426_fh49.jpg",
  },
  {
    id: '4',
    name: "PlayStation",
    price: 75,
    imageUrl: "https://i.ytimg.com/vi/8QPwgxkCQCQ/maxresdefault.jpg",
  },
];

export default function Index() {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => setCartCount(prev => prev + 1);

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Text style={styles.title}>Nuestros Productos</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Cart
            size={30}
            color="#3984d4"
            onPress={() => console.log('Carrito presionado')}
            style={{ marginLeft: 10 }}
          />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            price={item.price}
            imageUrl={item.imageUrl}
            onAddToCart={addToCart}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  badge: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 5,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
