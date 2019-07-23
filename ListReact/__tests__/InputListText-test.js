import React from 'react';
import 'react-native';
import InputListText from '../components/InputListText';
import renderer from 'react-test-renderer';

test('App snapshot',()=>{
  const snap = renderer.create(
    <App/>
  ).toJSON();
})