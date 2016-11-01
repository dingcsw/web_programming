import React, { Component } from 'react';

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
