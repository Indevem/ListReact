import React from 'react';
import 'react-native';
import InputListText from '../components/InputListText';
import renderer from 'react-test-renderer';

it('Select any suggestion test',()=>{
  let ListData = renderer.create(<InputListText
      Items = {[]}
    />).getInstance();
  ListData.suggestionSelected('AAA');
  expect(ListData.state.selectedValue).toEqual('AAA');
})