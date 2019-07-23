import React from 'react';
import 'react-native';
import InputListText from '../components/InputListText';
import renderer from 'react-test-renderer';

test('Корректный рендер скрытого списка', () => {
  const snap1 = renderer.create(<InputListText />).toJSON();
  expect(snap1).toMatchSnapshot();
});

test('Корректный рендер раскрытого списка', () => {
  let ListData = renderer.create(<InputListText
    Items = {['A', 'AB', 'CA', 'D']}
    />);
  ListData.getInstance().setState(() => ({ showList: true }));
  ListData.getInstance().onTextChanged("A");
  const snap2 = ListData.toJSON();
  expect(snap2).toMatchSnapshot();
});

it('Фукция выбраного значения из предложенных', () => {
  let ListData = renderer.create(<InputListText
    Items = {[]}
    />).getInstance();
  ListData.suggestionSelected("AAA");
  expect(ListData.state.selectedValue).toBe("AAA");
  expect(ListData.state.valueType).toBe(false);
});

it('Функция ввода текста пользователем', () => {
  let ListData = renderer.create(<InputListText
    Items = {[]}
    />).getInstance();
  ListData.onTextChanged("AAA");
  expect(ListData.state.selectedValue).toBe("AAA");
  expect(ListData.state.valueType).toBe(true);
});