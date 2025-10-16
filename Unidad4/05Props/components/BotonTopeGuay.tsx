import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';


interface BotonTopeGuayProps {
  texto: string;
}

const BotonTopeGuay: React.FC<BotonTopeGuayProps> = ({ texto }) => {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.buttonText}>{texto}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#eb8519ff',
    padding: 10,  
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
    marginLeft:"35%",
    marginRight:"35%",
    borderWidth: 4,
    borderColor: '#7b470fff',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontStyle: 'italic',
  },
});

export default BotonTopeGuay;
