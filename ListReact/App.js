import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import InputListText from './components/InputListText'

export default function App() {
  /** Демонстрирует работу компонента InputListTers на на примере списка из четырёх
   * текстовых элементов с их рендерингом в виде строк.
   */
  return (
    <View style={styles.container}>
      <InputListText
        Items = {['В ярость друг меня привел -',
          'Гнев излил я, гнев прошел.',
          'Враг обиду мне нанес -',
          'Я молчал, но гнев мой рос.'
        ]}
        Render = {item => (<Text>{item}</Text>)}
      />
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
