import React, { Component } from 'react';

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

module.exports = TodoItem;