import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default class InputListText extends React.Component {
  constructor(props){
    super(props);
    this.items = [
      'Сдать зачёт Бабичеву',
      'Встретить Куренкова',
      'Получить нагоняй от Алещенко',
      'Найти Широкова',
      'Поступить в МИСоС',
    ]; // Временный список элементов, позже будет передаваться в props
    this.state={
      selectedValue: '', // Текущее выбранное значение
      valueType: true, // Тип значения: введено вручную или выбрано пользователем
      suggestions: this.items.sort(), // Список выводимых элементов (отдельным массивом в state для обеспечения возможности поиска)
      showList: false, // Рендерятся ли элементы списка
    }
  }
  
  suggestionSelected (value) { // Если выбрано какое-либо значение из заданного списка
    this.setState(() => ({
      selectedValue: value,
      valueType: false,
      showList: false,
    })) // Изменяется текущее выбранное значение, его тип (если изначально был другим), список скрывается от внимательного взора пользователя
  }

  renderItem = ({item}) => { // Функция рендеринга отдельного элемента из списка (На данный момент работает с кнопками)
    return(
      <Button
        title={item}
        onPress={() => this.suggestionSelected(item)}
      />
    )
  }
  
  onTextChanged = (value) =>{ // Функция, вызываемая при изменении текста в поле ввода
    this.setState({ selectedValue: value }); 
    const reg = new RegExp(`${value}`, 'i'); // ПОНЯТИЯ НЕ ИМЕЮ, ЧТО ЭТО, ОНО ОТКУДА-ТО СКОПИРОВАННОЕ
    const suggest = this.items.sort().filter(v => reg.test(v)); // Новый отсортированный список
    this.setState(() => ({ suggestions: suggest }));
    this.setState(() => ({ valueType: true })); // Тип значения -> введено пользователем
  }

  renderSuggestions(){ // Функция рендеринга элементов списка
    if (this.state.showList == true){ // Случай раскрытого списка: рендерятся все элементы массива suggestions и кнопка "Скрыть варианты"
      const {suggestions} = this.state;
      return (
        <View>
          <View
            style = {{height: 200}}>
            <FlatList
              data={suggestions}
              renderItem={this.renderItem}
              keyExtractor={(item,index)=>index.toString()}
            />
          </View>
          <Button
            title="Скрыть варианты"
            onPress={() => this.setState(() => ({ showList: false }))}
          />
        </View>
      )
    }
    else{ // Случай скрытого списка: рендерится кнопка для его раскрытия
      return (
        <Button
          title="Показать варианты"
          onPress={() => this.setState(() => ({ showList: true }))}
        />
      )
    }
  }

  renderType(){ // Вывод на экран типа данных: введённых пользователем или выбранных из списка (временная функция для проверки корректности работы)
    if(this.state.valueType == true){
      return(<Text>(Введён пользователем)</Text>);
    }
    else{
      return(<Text>(Выбран из предложенных)</Text>);
    }
  }

  render(){
    return (
      <View>
        <Text style={{ marginTop: 60, marginBottom: 20 }} > Помогите Даше найти верное решение</Text>
        <TextInput
          value = {this.state.selectedValue}
          mode="outlined"
          style={{ height: 40, borderWidth: 1, padding: 5 }}
          onChangeText={ (text) => { this.onTextChanged(text) }}
        />
        {this.renderSuggestions()}
        <Text>Выбранный вариант:</Text>
        <Text>{this.state.selectedValue}</Text>
        {this.renderType()} //
      </View>
    )
  } // Разбор составляющих этой функции можно взять как задание! (Если серьёзно, тут просто функция рендера всего и сразу)
}