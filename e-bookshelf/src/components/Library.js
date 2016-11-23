import React, { Component } from 'react';

import Bookshelf from './Bookshelf'

class Library extends React.Component {
  constructor() {
    super();
    this.state = {
      bookshelves: [ 'living room', 'restroom' ],
    };

    this.newBookshelf = this.newBookshelf.bind(this);
    this.renderBookshelves = this.renderBookshelves.bind(this);
  }

  newBookshelf(event) {
    if (event.keyCode === 13 && event.target.value !== '') {
      const value = event.target.value;
      this.setState((state) => {
        state.bookshelves.push(value);
        return state;
      });
      event.target.value = '';
    }
  }

  renderBookshelves() {
    console.log(this.state.bookshelves);
    return this.state.bookshelves.map((item, key) => (
      <Bookshelf key={key} name={item}/>
    ));
  }

  render() {
    return(
      <div className="container">
        <div className="row">
          <input 
            className="new-bookshelf" 
            placeholder="Add new bookshelf..." 
            onKeyDown={this.newBookshelf}
          />
        </div>
        <div className="row">
          {this.renderBookshelves()}
        </div>
      </div>
    );
  }
}

export default Library;
