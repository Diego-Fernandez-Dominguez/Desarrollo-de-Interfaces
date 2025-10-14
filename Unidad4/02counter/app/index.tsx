import React, { useState, useRef } from "react";
import { Pressable, Text, View, StyleSheet, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const Index = () => {
  const [count, setCount] = useState(0);
  const clicks = useRef(0);

  const check10times = () => {
    if (count % 10 == 0) {
      window.alert(`FELICIDADESSSSS, LLEVAS ${clicks.current} CLICKSSSSSSS`);
    }
  };

  const handlePress = () => {
    setCount(count + 1);
    clicks.current += 1;
    check10times();
  };

  const handlePressNegative = () => {
    setCount(count - 1);
    clicks.current += 1;
    check10times();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contador: {count}</Text>

      <Pressable onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Incrementar</Text>
        <Ionicons name="add-circle" size={24} color="white" />
      </Pressable>

      <Pressable onPress={handlePressNegative} style={[styles.button]}>
        <Text style={styles.buttonText}>Decrementar</Text>
        <Ionicons name="remove-circle" size={24} color="red" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginRight: 8,
  },
});

export default Index;
