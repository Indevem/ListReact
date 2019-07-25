import React from 'react';
import { Text } from 'react-native';
import InputListText from '../components/InputListText';
import renderer from 'react-test-renderer';

/** Тестирование рендера скрытого списка (SnapShot) при наличии в передаваемом
 * списке четырёх элементов. Сгенерированный программой код сравнивается с сохранённым
 * ранее кодом.
 */
test('Корректный рендер скрытого списка (несколько элементов)', () => {
  const snap1 = renderer.create(<InputListText
    Items = {['A', 'AB', 'CA', 'D']}
    Render = {item => (<Text>{item}</Text>)}
    />).toJSON();
  expect(snap1).toMatchSnapshot();
});

/** Тестирование рендера скрытого списка (SnapShot) при отсутствии в передаваемом
 * списке элементов.
 */
test('Корректный рендер скрытого списка (элементы отсутствуют)', () => {
  const snap1 = renderer.create(<InputListText
    Items = {[]}
    Render = {item => (<Text>{item}</Text>)}
    />).toJSON();
  expect(snap1).toMatchSnapshot();
});

/** Тестирование рендера раскрытого списка (SnapShot) при наличии в передаваемом
 * списке элементов.
 */
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

/** Тестирование рендера раскрытого списка (SnapShot) при отсутствии в передаваемом
 * списке элементов.
 */
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

/** Тестирование вызова функции, обычно вызываемой при выборе какого-либо значения
 * пользователем из предложенных. Сравнивает значение и его тип в состоянии компонента
 * с заданными вручную путём вызова suggestionSelected().
 */
it('Фукция выбраного значения из предложенных', () => {
  let ListData = renderer.create(<InputListText
    Items = {['A', 'AB', 'CA', 'D']}
    Render = {item => (<Text>{item}</Text>)}
    />).getInstance();
  ListData.suggestionSelected("A");
  expect(ListData.state.selectedValue).toBe("A");
  expect(ListData.state.valueType).toBe(false);
});

/** Тестирование вызова функции, обычно вызываемой при изменении содержания текстового
 * поля пользователем. Сравнивает значение и его тип в состоянии компонента с заданными
 * вручную путём вызова onTextChanged(). Проверка при раскрытом списке. 
 */
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

/** Тестирование вызова функции, обычно вызываемой при изменении содержания текстового
 * поля пользователем. Проверка при скрытом списке
 */
it('Функция ввода текста пользователем (при скрытом списке)', () => {
  let ListData = renderer.create(<InputListText
    Items = {['A', 'AB', 'CA', 'D']}
    Render = {item => (<Text>{item}</Text>)}
    />).getInstance();
  ListData.onTextChanged("AAA");
  expect(ListData.state.selectedValue).toBe("AAA");
  expect(ListData.state.valueType).toBe(true);
});