import React from 'react';

import CalcButton from './CalcButton';
// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numA: '0',
      numB: '',
      operator: '',
    };

    this.appendNumber = this.appendNumber.bind(this);
    this.setOperator = this.setOperator.bind(this);
  }

  resetState() {
    this.setState({
      numA: '0',
      numB: '',
      operator: '',
    });
  }

  appendNumber(num) {
    this.setState((state) => {
      if (state.operator === '' || state.operator[0] === '=') {
        if (state.operator[0] === '=') {
          state.operator = '';
          state.numA = num;
        } else {
          state.numA = (state.numA === '0' ? num : state.numA + num);
        }
      } else {
        state.numB = (state.numB === '0' ? num : state.numB + num);
      }
      // console.log(state);
      return state;
    });
  }

  setOperator(ch) {
    this.setState((state) => {
      if (state.operator[0] === '=' && ch === '=') {
        state.numB = state.operator.substring(2);
        state.operator = state.operator[1];
        // console.log(state); 
      }
      if (state.operator !== '' && state.numB !== '') {
        switch (state.operator) {
          case '+': state.numA = parseFloat(state.numA) + parseInt(state.numB); break;
          case '-': state.numA = parseFloat(state.numA) - parseInt(state.numB); break;
          case 'x': state.numA = parseFloat(state.numA) * parseInt(state.numB); break;
          case '÷': state.numA = parseFloat(state.numA) / parseInt(state.numB); break;
        }
        state.numA = state.numA.toString();
      }
      state.operator = (ch === '=' ? '=' + state.operator + state.numB : ch); 
      state.numB = '';
      // console.log(state); 
      return state;
    });
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.numB === '' ? this.state.numA : this.state.numB}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.resetState.bind(this)}>AC</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>+/-</CalcButton>
            <CalcButton onClick={this.showNotImplemented.bind(this)}>%</CalcButton>
            <CalcButton onClick={this.setOperator} className="calc-operator">÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.appendNumber} className="calc-number">7</CalcButton>
            <CalcButton onClick={this.appendNumber} className="calc-number">8</CalcButton>
            <CalcButton onClick={this.appendNumber} className="calc-number">9</CalcButton>
            <CalcButton onClick={this.setOperator} className="calc-operator">x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.appendNumber} className="calc-number">4</CalcButton>
            <CalcButton onClick={this.appendNumber} className="calc-number">5</CalcButton>
            <CalcButton onClick={this.appendNumber} className="calc-number">6</CalcButton>
            <CalcButton onClick={this.setOperator} className="calc-operator">-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.appendNumber} className="calc-number">1</CalcButton>
            <CalcButton onClick={this.appendNumber} className="calc-number">2</CalcButton>
            <CalcButton onClick={this.appendNumber} className="calc-number">3</CalcButton>
            <CalcButton onClick={this.setOperator} className="calc-operator">+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.appendNumber} className="calc-number bigger-btn">0</CalcButton>
            <CalcButton >.</CalcButton>
            <CalcButton onClick={this.setOperator} className="calc-operator">=</CalcButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CalcApp;
