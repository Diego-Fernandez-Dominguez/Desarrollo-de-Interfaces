import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'reflect-metadata';

export default function Layout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: '#1a1a3e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerShadowVisible: false,
          drawerActiveTintColor: '#667eea',
          drawerInactiveTintColor: '#8888aa',
          drawerActiveBackgroundColor: 'rgba(102, 126, 234, 0.1)',
          drawerStyle: {
            backgroundColor: '#0f0f23',
            borderRightWidth: 1,
            borderRightColor: '#333366',
          },
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: '500',
          },
        }}
      >
        <Drawer.Screen
  name="index"
  options={{
    drawerLabel: '🏠 Inicio',
    title: 'Gestión de Personal',
  }}
/>

<Drawer.Screen
  name="/personas/ListadoPersonasScreen.tsx"
  options={{
    drawerLabel: 'Personas',
    title: 'Personas',
  }}
/>

<Drawer.Screen
  name="personas/ListadoDepartamentosScreen.tsx"
  options={{
    drawerLabel: 'Departamentos',
    title: 'Departamentos',
  }}
/>

<Drawer.Screen
  name="app/views/WelcomeScreen.tsx"
  options={{
    drawerLabel: 'Bienvenida',
    title: 'Bienvenida',
    drawerItemStyle: { display: 'none' },
  }}
/>

      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
});