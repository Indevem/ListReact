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
    ];
    this.state={
      selectedValue: '',
      valueType: true,
      suggestions: this.items.sort(),
      showList: false,
    }
  }
  
  suggestionSelected (value) {
    this.setState(() => ({
      selectedValue: value,
      valueType: false,
      showList: false,
    }))
  }

  renderItem = ({item}) => {
    return(
      <Button
        title={item}
        onPress={() => this.suggestionSelected(item)}
      />
    )
  }
  
  onTextChanged = (value) =>{
    this.setState({ selectedValue: value }); 
    const reg = new RegExp(`${value}`, 'i');
    const suggest = this.items.sort().filter(v => reg.test(v));
    this.setState(() => ({ suggestions: suggest }));
    this.setState(() => ({ valueType: true }));
  }

  renderSuggestions(){
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
    else{
      return (
        <Button
          title="Показать варианты"
          onPress={() => this.setState(() => ({ showList: true }))}
        />
      )
    }
  }

  renderType(){
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
        {this.renderType()}
      </View>
    )
  }
}