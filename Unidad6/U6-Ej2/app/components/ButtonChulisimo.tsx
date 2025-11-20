import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  color?: string;
  textColor?: string;
  onPress?: () => void;
  text?: string;
};

export function ButtonChulisimo({
  color = '#dd7b1fff',
  textColor = '#000000ff',
  onPress,
  text
}: Props) {

  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, { backgroundColor: color }]}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>
        {text}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    height: '10%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
