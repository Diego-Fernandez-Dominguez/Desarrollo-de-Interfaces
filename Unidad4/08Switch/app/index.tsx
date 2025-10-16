import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function App() {
  const [estaEncendida, encender] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: estaEncendida ? '#fffbea' : '#222' },
      ]}
    >
      <Text style={[styles.text, { color: estaEncendida ? '#000' : '#fff' }]}>
        {estaEncendida ? 'Encendido' : 'Apagado'}
      </Text>

      <Switch
        value={estaEncendida}
        onValueChange={encender}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    marginBottom: 20,
  },
});