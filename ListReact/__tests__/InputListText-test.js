import React from 'react';
import { Text } from 'react-native';
import InputListText from '../components/InputListText';
import renderer from 'react-test-renderer';

test('Корректный рендер скрытого списка (несколько элементов)', () => {
  const snap1 = renderer.create(<InputListText
    Items = {['A', 'AB', 'CA', 'D']}
    Render = {item => (<Text>{item}</Text>)}
    />).toJSON();
  expect(snap1).toMatchSnapshot();
});

test('Корректный рендер скрытого списка (элементы отсутствуют)', () => {
  const snap1 = renderer.create(<InputListText
    Items = {[]}
    Render = {item => (<Text>{item}</Text>)}
    />).toJSON();
  expect(snap1).toMatchSnapshot();
});

test('Корректный рендер раскрытого списка (несколько элементов)', () => {
  let ListData = renderer.create(<InputListText
    Items = {['A', 'AB', 'CA', 'D']}
    Render = {item => (<Text>{item}</Text>)}
    />);
  ListData.getInstance().setState(() => ({ showList: true }));
  ListData.getInstance().onTextChanged("A");
  const snap2 = ListData.toJSON();
  expect(snap2).toMatchSnapshot();
});

test('Корректный рендер раскрытого списка (элементы отсутствуют)', () => {
  let ListData = renderer.create(<InputListText
    Items = {[]}
    Render = {item => (<Text>{item}</Text>)}
    />);
  ListData.getInstance().setState(() => ({ showList: true }));
  ListData.getInstance().onTextChanged("A");
  const snap2 = ListData.toJSON();
  expect(snap2).toMatchSnapshot();
});

it('Фукция выбраного значения из предложенных', () => {
  let ListData = renderer.create(<InputListText
    Items = {['A', 'AB', 'CA', 'D']}
    Render = {item => (<Text>{item}</Text>)}
    />).getInstance();
  ListData.suggestionSelected("A");
  expect(ListData.state.selectedValue).toBe("A");
  expect(ListData.state.valueType).toBe(false);
});

it('Функция ввода текста пользователем (при раскрытом списке)', () => {
  let ListData = renderer.create(<InputListText
    Items = {['A', 'AB', 'CA', 'D']}
    Render = {item => (<Text>{item}</Text>)}
    />).getInstance();
  ListData.setState(() => ({ showList: true }));
  ListData.onTextChanged("AAA");
  expect(ListData.state.selectedValue).toBe("AAA");
  expect(ListData.state.valueType).toBe(true);
});

it('Функция ввода текста пользователем (при скрытом списке)', () => {
  let ListData = renderer.create(<InputListText
    Items = {['A', 'AB', 'CA', 'D']}
    Render = {item => (<Text>{item}</Text>)}
    />).getInstance();
  ListData.onTextChanged("AAA");
  expect(ListData.state.selectedValue).toBe("AAA");
  expect(ListData.state.valueType).toBe(true);
});