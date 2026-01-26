import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>👥</Text>
        <Text style={styles.title}>Gestión de Personal</Text>
        <Text style={styles.subtitle}>
          Sistema de administración de personas y departamentos
        </Text>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/views/personas/ListadoPersonaScreen')}
        >
          <Text style={styles.buttonText}>Ver Personas</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => router.push('/views/departamentos/ListadoDepartamentosScreen')}
        >
          <Text style={styles.buttonText}>Ver Departamentos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f23',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8888aa',
    textAlign: 'center',
    marginBottom: 48,
    paddingHorizontal: 32,
  },
  button: {
    backgroundColor: '#667eea',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 12,
    marginBottom: 16,
    minWidth: 250,
  },
  buttonSecondary: {
    backgroundColor: '#764ba2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});