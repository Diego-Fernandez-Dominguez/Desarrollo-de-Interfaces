import React from 'react';
import { Text, StyleSheet, Pressable, View } from 'react-native';

type Props = {
  children?: React.ReactNode;
};

export function LaCartaDeFuera({children
}: Props) {

  return (
     <View style={styles.card}>
         {children}
     </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '40%',
    height: '60%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
});
