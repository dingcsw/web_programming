import React, { Component } from 'react';

import Bookshelf from './Bookshelf';

class Library extends Component {
  constructor() {
    super();
    this.state = {
      bookshelves: [],
    };

    this.newBookshelf = this.newBookshelf.bind(this);
    this.renderBookshelves = this.renderBookshelves.bind(this);
  }

  newBookshelf() {
    const { value } = this.textInput;
    this.setState((state) => {
      state.bookshelves.push(value);
      return state;
    });
    this.textInput.value = '';
  }

  renderBookshelves() {
    return this.state.bookshelves.map((item, index) => (
      <Bookshelf key={`bookshelf-${index}`} name={item} />
    ));
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
          <div className="container">
            <a className="navbar-brand" href="#/">E-Bookshelf</a>
          </div>
        </nav>

        <div className="container nav-above">
          <div className="row bottom-buffer-20">
            <div className="col-md-4">
              <div className="input-group">
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
                    onClick={this.newBookshelf}
                  >
                    Add
                  </button>
                </span>
              </div>
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
