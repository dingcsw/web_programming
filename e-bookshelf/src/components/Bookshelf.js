import React, { Component, PropTypes } from 'react';

import Book from './Book'

class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showInputField: false
    };

    this.newBook = this.newBook.bind(this);
    this.showOrHideInputField = this.showOrHideInputField.bind(this);
    this.renderBooks = this.renderBooks.bind(this);
  }

  newBook() {
    fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + this.textInput.value)
      .then(res => res.json())
      .then(json => this.setState((state) => {
        if (json.totalItems === 0) return state;
        const book = json.items[0];
        state.books.push({
          title: book['volumeInfo']['title'],
          author: book['volumeInfo']['authors'][0],
          ranking: 0,            
        })
        return state;
      }));
    this.textInput.value = '';
  }

  showOrHideInputField() {
    this.setState((state) => {
      state.showInputField = !state.showInputField;
      return state;
    })
  }

  renderBooks() {
    return this.state.books.map((item, key) => (
      <Book key={key} information={item}/>
    ))
  }

  render() {
    const { books, showInputField } = this.state;
    const { name } = this.props;

    return (
      <div className="col-md-4">
        <div className="col-md-12 bookshelf">
          <div className="bookshelf-name">{name}</div>
          {this.renderBooks()}

          <div>
            <span>
              <button 
                type="button" 
                className="btn btn-default btn-xs"
                onClick={this.showOrHideInputField}>
                <span 
                  className={"glyphicon " + (showInputField ? 'glyphicon-minus' : 'glyphicon-plus')} 
                  aria-hidden="true"
                />
              </button>
            </span>
            <span className="pull-right">
              Total books: {books.length}
            </span>
          </div>

          <div className={"input-group top-buffer-10 " + (showInputField ? '': 'hidden')}>
            <input 
              type="text" 
              className="form-control" 
              placeholder="New book..."
              ref={(ref) => { this.textInput = ref; }}
            />
            <span className="input-group-btn">
              <button 
                className="btn btn-secondary" 
                type="button"
                onClick={this.newBook}>
                Add
              </button>
            </span>
          </div>
        </div>
      </div>
    );
  }
} 

Bookshelf.propTypes = {
  name: React.PropTypes.string,
};

export default Bookshelf;
