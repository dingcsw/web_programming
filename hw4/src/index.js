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
  }

  onEnter(event) {
    if (event.keyCode === 13 && event.target.value !== '') {
      this.setState({
        todoCount: this.state.todoCount + 1,
        items: this.state.items.concat([{
          content: event.target.value,
          completed: ''
        }])
      });
      console.log('New todo \'' + event.target.value + '\' added.');
      event.target.value = '';
    }
  }

  changeCompleted(index) {
    this.setState((state) => {
      const item = state.items[index];
      if (item.completed === '') {
        item.completed = 'completed';
        state.todoCount -= 1;
      } else {
        item.completed = '';
        state.todoCount += 1;
      }
      return state;
    });  
  }

  destroyItem(index) {
    this.setState((state) => {
      if (state.items[index].completed === '') {
        state.todoCount -= 1;
      }
      state.items.splice(index, 1);
      return state;
    });
  }

  render() {
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
        <Footer count={this.state.todoCount}/>
      </section>
    );
  }
}

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <span className="todo-count">{this.props.count} item(s) left</span>
        <button className="clear-completed">Clear completed</button>
      </footer>
    );
  }
}

class TodoItem extends Component {
  render() {
    const { completed, changeCompleted, content, destroyItem } = this.props;
    const isChecked = completed ? true : false;
    return (
      <div className="view">
        <li className={completed}>
          <input 
            className="toggle" 
            type="checkbox" 
            onChange={changeCompleted} 
            checked={isChecked}
          />
          <label>{content}</label>
          <button className="destroy" onClick={destroyItem}></button>
        </li>
      </div>
    );
  }
}

class CountDisplay extends Component {
  render() {
    return (
      <footer class="footer">
        <span class="todo-count"></span>
        <button class="clear-completed" onClick={this.onClick}>Clear completed</button>
      </footer>
    );
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);
