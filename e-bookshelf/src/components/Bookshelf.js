import React, { Component, PropTypes } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import Book from './Book'

const SortableItem = SortableElement(({value}) => (
  <Book information={value}/>
));

const SortableList = SortableContainer(({items}) => {
  return (
    <div className="list-group">
      {items.map((value, index) => 
        <SortableItem key={`book-${index}`} index={index} value={value} />
      )}
    </div>
  );
});

class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showInputField: false
    };

    this.newBook = this.newBook.bind(this);
    this.showOrHideInputField = this.showOrHideInputField.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  componentDidMount() {
    this.textInput.value = '9780099908401';
    this.newBook();
    this.textInput.value = '9781597226769';
    this.newBook();
    this.textInput.value = '9781467286787';
    this.newBook();
  }

  onSortEnd({oldIndex, newIndex}) {
    this.setState((state) => {
      state.books = arrayMove(state.books, oldIndex, newIndex);
      return state;
    });
  }

  newBook() {
    fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + this.textInput.value)
      .then(res => res.json())
      .then(json => this.setState((state) => {
        if (json.totalItems === 0) return state;
        const book = json.items[0];
        state.books.push({
          title: book['volumeInfo']['title'],
          authors: book['volumeInfo']['authors'],
          description: book['volumeInfo']['description'],
          pageCount: book['volumeInfo']['pageCount'],
          imageLink: book['volumeInfo']['imageLinks']['thumbnail'],
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

  render() {
    const { books, showInputField } = this.state;
    const { name } = this.props;
    
    return (
      <div className="col-md-4">
        <div className="col-md-12 bookshelf">
          <div className="bookshelf-name bottom-buffer-10">{name}</div>
          
          <SortableList items={books} onSortEnd={this.onSortEnd} pressDelay={150}/>

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
  name: React.PropTypes.string.isRequired,
};

export default Bookshelf;
