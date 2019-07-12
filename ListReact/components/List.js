import React from 'react';
import { Platform, StyleSheet, View, Button, Picker, Alert } from "react-native";

export default class List extends React.Component {
  constructor(){
    super();
    this.state={
      PickerSelectedVal: ''
    }
  }

  getSelectedPickerValue=()=>{
    Alert.alert(this.state.PickerSelectedVal + ", я выбираю тебя!");
  }

  render() {
    return (
      <View>
        <Picker
          selectedValue={this.state.PickerSelectedVal}
          onValueChange={(itemValue, itemIndex) => this.setState({PickerSelectedVal: itemValue})}
          style={{ height: 100, width: 200 }}>
          <Picker.Item label="Бабичев" value="Бабичев" />
          <Picker.Item label="Галина Сергеевна" value="Галочка" />
          <Picker.Item label="Тригуб" value="Тригуб" />
          <Picker.Item label="МИСоС" value="МИСоС" />
        </Picker>
        <Button title="Кнопка" onPress={ this.getSelectedPickerValue } />
      </View>
    );
  }
}