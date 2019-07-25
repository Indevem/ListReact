import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity } from 'react-native';

export default class InputListText extends React.Component {
  /** Конструктор принимает список элементов и параметры их рендеринга. */
  constructor(props){
    super(props);
    /** Элементы передаваемого списка. */
    this.items = props.Items;
    /** Парметры рендера элементов списка. */
    this.renderItems = props.Render;
    /** Если список или параметры рендеринга не передаются, выбрасывается исключение. */
    if(this.items == undefined || this.renderItems == undefined){
      throw new Error('You should set the list of items and render options for them');
    }
    this.state={
      /** Текущее выбранное значение. */
      selectedValue: '',
      /** Тип выбранного значения: введено пользователем (true) или выбрано из списка (false). */
      valueType: true,
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
  }

  /** Рендерит отдельный элемент из списка согласно передаваемым в компонент параметрам. */
  renderItem = ({item}) => {
    /** TouchableOpacity делает возможным вызов функции выбора элемента из списка при нажатии на элемент. */
    return(
      <TouchableOpacity onPress={()=> {this.suggestionSelected(item)}}>
        <View>
          {this.props.Render(item)}
        </View>
      </TouchableOpacity>
    )
  }
  
  /** Вызывается при ручном изменении текста в поле ввода */
  onTextChanged = (value) =>{
    /** Устанавливается текущее выбранное значение на новое. */
    this.setState({ selectedValue: value });
    /** Устанавливает тип значения на "введено пользователем" */
    this.setState(() => ({ valueType: true }));
  }

  /** Рендерит элементы списка */
  renderSuggestions(){
    /** Случай раскрытого списка (showList = true): */
    if (this.state.showList == true){ 
      /** В качестве списка использован FlatList.
        * Рендер каждого элемента происходит в функции this.renderItem()
        * Рендерится кнопка "Скрыть варианты", позволяющая пользователю убрать список.
        */
      return (
        <View>
          <View
            style = {{height: 200}}>
            <FlatList
              data={this.items}
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
    /** Случай скрытого списка. */
    else{
      /** Рендерится кнопка "Показать варианты", позволяющая пользователю его раскрыть. */
      return (
        <Button
          title="Показать варианты"
          onPress={() => this.setState(() => ({ showList: true }))}
        />
      )
    }
  }

  /** Возвращает введённый пользователем текст.
   *  В случае выбора одного из предложенных вариантов возвращает пустую строку.
   */
  textInputValue(){
    if (this.state.valueType == true) {
      return this.state.selectedValue;
    }
    else {
      return '';
    }
  }

  /** Выводит на экран выбранный элемент и его тип. */
  renderSelected(){
    /** Если текст введён пользователем, рендерит сам текст. */
    if (this.state.valueType == true) {
      return (
        <View>
          <Text>{this.state.selectedValue}</Text>
          <Text>(Введён пользователем)</Text>
        </View>
      );
    }
    /** Если пользователь выбрал предложенный вариант, рендерит его. */
    else {
      return(
        <View>
          {this.renderItems(this.state.selectedValue)}
          <Text>(Выбран из списка)</Text>
        </View>
      )
    }
  }

  /** Рендерит компонент: поле для ввода текста и доступные для выбора варианты. */
  render(){
    return (
      <View>
        <TextInput
          value = {this.textInputValue()}
          mode="outlined"
          style={{ height: 40, borderWidth: 1, padding: 5 }}
          onChangeText={ (text) => { this.onTextChanged(text) }}
        />
        {this.renderSuggestions()}
        <Button
          title="Сброс"
          onPress={() => this.onTextChanged('')}/>
        <Text>Выбранный вариант:</Text>
        {this.renderSelected()}
      </View>
    )
  }
}