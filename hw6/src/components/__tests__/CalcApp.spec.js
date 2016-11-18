import React from 'react';
import { mount } from 'enzyme';

import CalcApp from '../CalcApp';
import CalcButton from '../CalcButton';

it('render all buttons', () => {
  const app = mount(<CalcApp />);

  const rows = app.find('.calc-row');
  const btns0 = rows.at(0).find(CalcButton);
  const btns1 = rows.at(1).find(CalcButton);
  const btns2 = rows.at(2).find(CalcButton);
  const btns3 = rows.at(3).find(CalcButton);
  const btns4 = rows.at(4).find(CalcButton);

  expect(btns0.at(0).text()).toBe('AC');
  expect(btns0.at(1).text()).toBe('+/-');
  expect(btns0.at(2).text()).toBe('%');
  expect(btns0.at(3).text()).toBe('÷');
  expect(btns1.at(0).text()).toBe('7');
  expect(btns1.at(1).text()).toBe('8');
  expect(btns1.at(2).text()).toBe('9');
  expect(btns1.at(3).text()).toBe('x');
  expect(btns2.at(0).text()).toBe('4');
  expect(btns2.at(1).text()).toBe('5');
  expect(btns2.at(2).text()).toBe('6');
  expect(btns2.at(3).text()).toBe('-');
  expect(btns3.at(0).text()).toBe('1');
  expect(btns3.at(1).text()).toBe('2');
  expect(btns3.at(2).text()).toBe('3');
  expect(btns3.at(3).text()).toBe('+');
  expect(btns4.at(0).text()).toBe('0');
  expect(btns4.at(1).text()).toBe('.');
  expect(btns4.at(2).text()).toBe('=');
});

it('AC should clear state', () => {
  const app = mount(<CalcApp />);

  const initialState = app.state();

  const rows = app.find('.calc-row');
  const row0 = rows.at(0);
  const AC = row0.find(CalcButton).at(0);

  const row1 = rows.at(1);
  const btn7 = row1.find(CalcButton).at(0);

  btn7.simulate('click');
  AC.simulate('click');

  expect(app.state()).toEqual(initialState);
});

describe('testing arithmetic functions', () => {
  it('testing 1 + 2 = -> 3', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn12 = rows.at(3).find(CalcButton).at(0);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn12.simulate('click');
    btn15.simulate('click');
    btn13.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('3');
  });

  it('testing 1 - 2 = -> -1', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn12 = rows.at(3).find(CalcButton).at(0);
    const btn11 = rows.at(2).find(CalcButton).at(3);
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn12.simulate('click');
    btn11.simulate('click');
    btn13.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('-1');
  });

  it('testing 1 x 2 = -> 2', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn12 = rows.at(3).find(CalcButton).at(0);
    const btn7 = rows.at(1).find(CalcButton).at(3);
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn12.simulate('click');
    btn7.simulate('click');
    btn13.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('2');
  });

  it('testing 1 / 2 = -> 0.5', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn12 = rows.at(3).find(CalcButton).at(0);
    const btn3 = rows.at(0).find(CalcButton).at(3);
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn12.simulate('click');
    btn3.simulate('click');
    btn13.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('0.5');
  });

  it('testing 2 + 3 = = -> 8', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn14 = rows.at(3).find(CalcButton).at(2);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn13.simulate('click');
    btn15.simulate('click');
    btn14.simulate('click');
    btn18.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('8');
  });

  it('testing 2 - 3 = = -> -4', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn11 = rows.at(2).find(CalcButton).at(3);
    const btn14 = rows.at(3).find(CalcButton).at(2);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn13.simulate('click');
    btn11.simulate('click');
    btn14.simulate('click');
    btn18.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('-4');
  });

  it('testing 2 x 3 = = -> 18', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn7 = rows.at(1).find(CalcButton).at(3);
    const btn14 = rows.at(3).find(CalcButton).at(2);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn13.simulate('click');
    btn7.simulate('click');
    btn14.simulate('click');
    btn18.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('18');
  });

  it('testing 2 + 3 -> 3', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn14 = rows.at(3).find(CalcButton).at(2);

    btn13.simulate('click');
    btn15.simulate('click');
    btn14.simulate('click');

    expect(app.find('.calc-display').text()).toBe('3');
  });

  it('testing 4 + 5 + -> 9', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn8 = rows.at(2).find(CalcButton).at(0);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn9 = rows.at(2).find(CalcButton).at(1);

    btn8.simulate('click');
    btn15.simulate('click');
    btn9.simulate('click');
    btn15.simulate('click');

    expect(app.find('.calc-display').text()).toBe('9');
  });

  it('testing 6 - 7 + x -> -1', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn10 = rows.at(2).find(CalcButton).at(2);
    const btn11 = rows.at(2).find(CalcButton).at(3);
    const btn4 = rows.at(1).find(CalcButton).at(0);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn7 = rows.at(1).find(CalcButton).at(3);

    btn10.simulate('click');
    btn11.simulate('click');
    btn4.simulate('click');
    btn15.simulate('click');
    btn7.simulate('click');

    expect(app.find('.calc-display').text()).toBe('-1');
  });

  it('testing 2 + 3 - = -> 5', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn14 = rows.at(3).find(CalcButton).at(2);
    const btn11 = rows.at(2).find(CalcButton).at(3);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn13.simulate('click');
    btn15.simulate('click');
    btn14.simulate('click');
    btn11.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('5');
  });

  it('testing 2 + 3 - = = -> 5', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn14 = rows.at(3).find(CalcButton).at(2);
    const btn11 = rows.at(2).find(CalcButton).at(3);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn13.simulate('click');
    btn15.simulate('click');
    btn14.simulate('click');
    btn11.simulate('click');
    btn18.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('5');
  });

  it('testing 1 = = -> 1', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn12 = rows.at(3).find(CalcButton).at(0);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn12.simulate('click');
    btn18.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('1');
  });

  it('testing 2 + = -> 2', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn13.simulate('click');
    btn15.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('2');
  });

  it('testing 2 + = 3 -> 3', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn18 = rows.at(4).find(CalcButton).at(2);
    const btn14 = rows.at(3).find(CalcButton).at(2);

    btn13.simulate('click');
    btn15.simulate('click');
    btn18.simulate('click');
    btn14.simulate('click');

    expect(app.find('.calc-display').text()).toBe('3');
  });

  it('testing 4 = 5 -> 5', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn8 = rows.at(2).find(CalcButton).at(0);
    const btn18 = rows.at(4).find(CalcButton).at(2);
    const btn9 = rows.at(2).find(CalcButton).at(1);

    btn8.simulate('click');
    btn18.simulate('click');
    btn9.simulate('click');

    expect(app.find('.calc-display').text()).toBe('5');
  });

  it('testing x 2 -> 2', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn7 = rows.at(1).find(CalcButton).at(3);
    const btn13 = rows.at(3).find(CalcButton).at(1);

    btn7.simulate('click');
    btn13.simulate('click');

    expect(app.find('.calc-display').text()).toBe('2');
  });

  it('testing x 2 = -> 0', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn7 = rows.at(1).find(CalcButton).at(3);
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn7.simulate('click');
    btn13.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('0');
  });

  it('testing - -> 0', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn11 = rows.at(2).find(CalcButton).at(3);

    btn11.simulate('click');

    expect(app.find('.calc-display').text()).toBe('0');
  });

  it('testing 1 + 2 + 3 + -> 6', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn12 = rows.at(3).find(CalcButton).at(0);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn14 = rows.at(3).find(CalcButton).at(2);

    btn12.simulate('click');
    btn15.simulate('click');
    btn13.simulate('click');
    btn15.simulate('click');
    btn14.simulate('click');
    btn15.simulate('click');

    expect(app.find('.calc-display').text()).toBe('6');
  });

  it('testing 1 + 2 / 3 = -> 1', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn12 = rows.at(3).find(CalcButton).at(0);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn3 = rows.at(0).find(CalcButton).at(3);
    const btn14 = rows.at(3).find(CalcButton).at(2);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn12.simulate('click');
    btn15.simulate('click');
    btn13.simulate('click');
    btn3.simulate('click');
    btn14.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('1');
  });

  it('testing 2 + 2 = = = / 8 = -> 1', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn18 = rows.at(4).find(CalcButton).at(2);
    const btn3 = rows.at(0).find(CalcButton).at(3);
    const btn5 = rows.at(1).find(CalcButton).at(1);

    btn13.simulate('click');
    btn15.simulate('click');
    btn13.simulate('click');
    btn18.simulate('click');
    btn18.simulate('click');
    btn18.simulate('click');
    btn3.simulate('click');
    btn5.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('1');
  });

  it('testing 5 - 6 + 4 = = -> 7', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn9 = rows.at(2).find(CalcButton).at(1);
    const btn11 = rows.at(2).find(CalcButton).at(3);
    const btn10 = rows.at(2).find(CalcButton).at(2);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn8 = rows.at(2).find(CalcButton).at(0);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn9.simulate('click');
    btn11.simulate('click');
    btn10.simulate('click');
    btn15.simulate('click');
    btn8.simulate('click');
    btn18.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('7');
  });

  it('testing + 2 3 - 1 1 = -> 12', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn14 = rows.at(3).find(CalcButton).at(2);
    const btn11 = rows.at(2).find(CalcButton).at(3);
    const btn12 = rows.at(3).find(CalcButton).at(0);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn15.simulate('click');
    btn13.simulate('click');
    btn14.simulate('click');
    btn11.simulate('click');
    btn12.simulate('click');
    btn12.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('12');
  });

  it('testing 1 + 2 3 4 = -> 235', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn12 = rows.at(3).find(CalcButton).at(0);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn14 = rows.at(3).find(CalcButton).at(2);
    const btn8 = rows.at(2).find(CalcButton).at(0);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn12.simulate('click');
    btn15.simulate('click');
    btn13.simulate('click');
    btn14.simulate('click');
    btn8.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('235');
  });

  it('testing 1 + - 3 = -> -2', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn12 = rows.at(3).find(CalcButton).at(0);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn11 = rows.at(2).find(CalcButton).at(3);
    const btn14 = rows.at(3).find(CalcButton).at(2);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn12.simulate('click');
    btn15.simulate('click');
    btn11.simulate('click');
    btn14.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('-2');
  });

  it('testing - 4 + 2 = -> -2', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn11 = rows.at(2).find(CalcButton).at(3);
    const btn8 = rows.at(2).find(CalcButton).at(0);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn11.simulate('click');
    btn8.simulate('click');
    btn15.simulate('click');
    btn13.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('-2');
  });

  it('testing - 4 + 2 = = -> 0', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn11 = rows.at(2).find(CalcButton).at(3);
    const btn8 = rows.at(2).find(CalcButton).at(0);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn11.simulate('click');
    btn8.simulate('click');
    btn15.simulate('click');
    btn13.simulate('click');
    btn18.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('0');
  });

  it('testing - 4 + 2 = = = -> 2', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn11 = rows.at(2).find(CalcButton).at(3);
    const btn8 = rows.at(2).find(CalcButton).at(0);
    const btn15 = rows.at(3).find(CalcButton).at(3);
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn18 = rows.at(4).find(CalcButton).at(2);

    btn11.simulate('click');
    btn8.simulate('click');
    btn15.simulate('click');
    btn13.simulate('click');
    btn18.simulate('click');
    btn18.simulate('click');
    btn18.simulate('click');

    expect(app.find('.calc-display').text()).toBe('2');
  });

  it('testing 2 / 2 - 1 x -> 0', () => {
    const app = mount(<CalcApp />);

    const rows = app.find('.calc-row');
    const btn13 = rows.at(3).find(CalcButton).at(1);
    const btn3 = rows.at(0).find(CalcButton).at(3);
    const btn11 = rows.at(2).find(CalcButton).at(3);
    const btn12 = rows.at(3).find(CalcButton).at(0);
    const btn7 = rows.at(1).find(CalcButton).at(3);

    btn13.simulate('click');
    btn3.simulate('click');
    btn13.simulate('click');
    btn11.simulate('click');
    btn12.simulate('click');
    btn7.simulate('click');

    expect(app.find('.calc-display').text()).toBe('0');
  });
});