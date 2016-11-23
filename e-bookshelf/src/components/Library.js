import React, { Component } from 'react';

import Bookshelf from './Bookshelf'

class Library extends Component {
  constructor() {
    super();
    this.state = {
      bookshelves: [ 'living room', 'restroom' ],
    };

    this.newBookshelf = this.newBookshelf.bind(this);
    this.renderBookshelves = this.renderBookshelves.bind(this);
  }

  newBookshelf(event) {
    const { value } = this.textInput;
    this.setState((state) => {
      state.bookshelves.push(value);
      return state;
    });
    this.textInput.value = '';
  }

  renderBookshelves() {
    return this.state.bookshelves.map((item, key) => (
      <Bookshelf key={key} name={item} />
    ));
  }

  render() {
    return(
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#/">E-Bookshelf</a>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <a href="#/">Home</a>
              </li>
              <li>
                <a href="#/bookshelves">Bookshelves</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row bottom-buffer">
            <div className="input-group col-md-3">
              <input 
                type="text" 
                className="form-control" 
                placeholder="New bookshelf..."
                ref={(input) => { this.textInput = input; }}
              />
              <span className="input-group-btn">
                <button 
                  className="btn btn-secondary" 
                  type="button"
                  onClick={this.newBookshelf}>
                  Add
                </button>
              </span>
            </div>
          </div>
          <div className="row">
            {this.renderBookshelves()}
          </div>
        </div>
      </div>
    );
  }
}

export default Library;
