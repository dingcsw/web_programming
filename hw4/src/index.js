const { Component } = React;

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

  render() {
    const displayFooter = this.state.items.length > 0 ? true : false;
    const displayClear = this.state.items.some((item) => {
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
          <input className="toggle-all" type="checkbox"/>
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
          displayFooter={displayFooter}
          displayClear={displayClear}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

// footer part
class CountDisplay extends Component {
  render() {
    return (
      <footer 
        className="footer" 
        style={{display: this.props.displayFooter ? 'block' : 'none' }}>
        <span className="todo-count">{this.props.count} item(s) left</span>
        <button 
          className="clear-completed" 
          style={{display: this.props.displayClear > 0 ? 'block' : 'none'}}
          onClick={this.props.clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

class TodoItem extends Component {
  render() {
    const { completed, changeCompleted, content, destroyItem } = this.props;
    return (
      <div className="view">
        <li className={completed ? 'completed' : ''}>
          <input 
            className="toggle" 
            type="checkbox" 
            onChange={changeCompleted} 
            checked={completed}
          />
          <label>{content}</label>
          <button className="destroy" onClick={destroyItem}></button>
        </li>
      </div>
    );
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
