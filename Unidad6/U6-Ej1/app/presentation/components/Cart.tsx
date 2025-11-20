import React from 'react';
import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle } from 'react-native';

type Props = {
  size?: number;                
  color?: string;                
  onPress?: () => void;          
  style?: StyleProp<ViewStyle>;  
};

export function Cart({ size = 24, color = '#000', onPress, style }: Props) {
  return (
    <Pressable onPress={onPress} style={style}>
      <Text style={[styles.icon, { fontSize: size, color }]}>{'🛒'}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  icon: {
    textAlign: 'center',
  },
});
