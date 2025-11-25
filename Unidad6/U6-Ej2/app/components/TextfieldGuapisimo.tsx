import React from 'react';
import { Text, StyleSheet, Pressable, View, TextInput } from 'react-native';

type Props = {
  text: string;
};

export function TextfieldGuapisimo({
  text="ejemplo"
}: Props) {


  return (
     <View>
        <TextInput style={ styles.input }  placeholder={text}></TextInput>
     </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomColor: '#afa6a6ff',
    borderWidth: 2,
    color: '#afa6a6ff',
    marginBottom: 10,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,

    
  },
});
