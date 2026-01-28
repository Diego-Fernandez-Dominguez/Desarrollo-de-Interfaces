import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'reflect-metadata';

export default function RootLayout() {
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
            drawerLabel: 'Inicio',
            title: 'Gestión de Personal',
            drawerIcon: () => <Text style={styles.icon}></Text>,
          }}
        />

        <Drawer.Screen
          name="views/personas/ListadoPersonaScreen"
          options={{
            drawerLabel: 'Personas',
            title: 'Gestión de Personas',
            drawerIcon: () => <Text style={styles.icon}></Text>,
          }}
        />

        <Drawer.Screen
          name="views/departamentos/ListadoDepartamentosScreen"
          options={{
            drawerLabel: 'Departamentos',
            title: 'Gestión de Departamentos',
            drawerIcon: () => <Text style={styles.icon}></Text>,
          }}
        />

        <Drawer.Screen
          name="views/personas/EditarInsertarPersonaScreen"
          options={{
            drawerItemStyle: { display: 'none' },
            title: 'Editar Persona',
          }}
        />

        <Drawer.Screen
          name="views/departamentos/EditarInsertarDepartamentosScreen"
          options={{
            drawerItemStyle: { display: 'none' },
            title: 'Editar Departamento',
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
  icon: {
    fontSize: 20,
  },
});