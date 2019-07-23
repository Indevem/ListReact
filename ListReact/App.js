import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import InputListText from './components/InputListText'

export default function App() {
  return (
    <View style={styles.container}>
      <InputListText/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
