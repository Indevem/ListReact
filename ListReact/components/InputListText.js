import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default class InputListText extends React.Component {
  /** Конструктор принимает список элементов и параметры их рендеринга. */
  constructor(props){
    super(props);
    this.items = props.Items;
    if(this.items == undefined){
      this.items = [];
    }
    this.state={
      /** Текущее выбранное значение. */
      selectedValue: '',
      /** Тип выбранного значения: введено пользователем (true) или выбрано из списка (false). */
      valueType: true,
      /** Список выводимых на экран элементов. */
      suggestions: this.items.sort(),
      /** Рендерится ли список. */
      showList: false,
    }
  }
  
  /** 
    * Вызывается при выборе какого-либо значения из списка.
    * Изменяет выбранное значение, устанавливает его тип на "выбрано из списка", скрывает сам список.
    */
  suggestionSelected (value) {
    /**
    * Изменяется текущее выбранное значение, его тип (если изначально был другим).
    * Список скрывается от внимательного взора пользователя.
      */ 
    this.setState(() => ({
      selectedValue: value,
      valueType: false,
      showList: false,
    }))
    /** Создаётся новый отсортированный список */
    const reg = new RegExp(`${value}`, 'i');
    const suggest = this.items.sort().filter(v => reg.test(v));
    /** Изменяется выводимый на экран список. */
    this.setState(() => ({ suggestions: suggest }));
  }

  /** Рендерит отдельный элемент из списка согласно передаваемым в компонент параметрам. */
  renderItem = ({item}) => { // (На данный момент работает только с кнопками)
    return(
      <Button
        title={item}
        onPress={() => this.suggestionSelected(item)}
      />
    )
  }
  
  /** Вызывается при ручном изменении текста в поле ввода */
  onTextChanged = (value) =>{
    /** Устанавливается текущее выбранное значение на новое. */
    this.setState({ selectedValue: value });
    /** Создаётся новый отсортированный список */
    const reg = new RegExp(`${value}`, 'i');
    const suggest = this.items.sort().filter(v => reg.test(v));
    /** Изменяется выводимый на экран список. */
    this.setState(() => ({ suggestions: suggest }));
    /** Устанавливает тип значения на "введено пользователем" */
    this.setState(() => ({ valueType: true }));
  }

  /** Рендерит элементы списка */
  renderSuggestions(){
    /** Случай раскрытого списка (showList = true):
    * Рендерится каждый элемент списка.
    * Рендерится кнопка "Скрыть варианты", позволяющая пользователю убрать список.
    */
    if (this.state.showList == true){ 
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
    /** Случай скрытого списка: рендерится кнопка "Показать варианты", позволяющая пользователю его раскрыть. */
    else{
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

  /** Рендерит компонент: поле для ввода текста и доступные для выбора варианты. */
  render(){
    return (
      <View>
        <TextInput
          value = {this.state.selectedValue}
          mode="outlined"
          style={{ height: 40, borderWidth: 1, padding: 5 }}
          onChangeText={ (text) => { this.onTextChanged(text) }}
        />
        {this.renderSuggestions()}
        <Button
          title="Очистить поле ввода"
          onPress={() => this.onTextChanged('')}/>
        <Text>Выбранный вариант:</Text>
        <Text>{this.state.selectedValue}</Text>
        {this.renderType()}
      </View>
    )
  }
}