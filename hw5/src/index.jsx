import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TodoItem from './TodoItem.jsx';
import CountDisplay from './CountDisplay.jsx';

import './todo.css';

class TodoApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoCount: 0,
      items: [],
      inputValue: ''
    };
    this.onEnter = this.onEnter.bind(this);
    this.destroyItem = this.destroyItem.bind(this);
    this.clearCompleted = this.clearCompleted.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
  }

  onEnter(event) {
    if (event.keyCode === 13 && event.target.value !== '') {
      this.setState({
        todoCount: this.state.todoCount + 1,
        items: this.state.items.concat([{
          content: event.target.value,
          completed: false
        }])
      });
      console.log('New todo \'' + event.target.value + '\' added.');
      event.target.value = '';
    }
  }

  changeCompleted(index) {
    this.setState((state) => {
      const item = state.items[index];
      if (item.completed) {
        item.completed = false;
        state.todoCount += 1;
      } else {
        item.completed = true;
        state.todoCount -= 1;
      }
      return state;
    });  
  }

  destroyItem(index) {
    this.setState((state) => {
      if (!state.items[index].completed) {
        state.todoCount -= 1;
      }
      state.items.splice(index, 1);
      return state;
    });
  }

  clearCompleted() {
    this.setState((state) => {
      let i = state.items.length;
      while (i--) {
        if (state.items[i].completed) {
          state.items.splice(i, 1);
        }
      }
      return state;
    });
  }

  toggleAll() {
    this.setState((state) => {
      const allChecked = state.items.every((item) => {
      return item.completed;
      }) && state.items.length > 0;
      if (allChecked) {
        state.items.forEach((item) => {
          item.completed = false;
        });
        state.todoCount = state.items.length;
      } else {
        state.items.forEach((item) => {
          item.completed = true;
        });
        state.todoCount = 0;
      }
      return state;
    });
  }

  render() {
    const notEmpty = this.state.items.length > 0 ? true : false;
    const displayClear = this.state.items.some((item) => {
      return item.completed;
    });
    const allChecked = this.state.items.every((item) => {
      return item.completed;
    });

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input 
            className="new-todo" 
            placeholder="What needs to be done?" 
            onKeyDown={this.onEnter}>
          </input>
        </header>
        <section className="main">
          { notEmpty ? <input className="toggle-all" type="checkbox" onClick={this.toggleAll} checked={allChecked}/> : null}
          <label htmlFor="toggle-all">Mark all as complete></label>
          <ul className="todo-list">{
            this.state.items.map((item, key) => (
              <TodoItem 
                content={item.content} 
                key={key} 
                completed={item.completed}
                changeCompleted={() => this.changeCompleted(key)}
                destroyItem={() => this.destroyItem(key)} 
              />
            ))
          }</ul>
        </section>  
        <CountDisplay 
          count={this.state.todoCount} 
          displayFooter={notEmpty}
          displayClear={displayClear}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
