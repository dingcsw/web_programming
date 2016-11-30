import React, { Component, PropTypes } from 'react';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import Book from './Book';
import { genid } from './utils';

const SortableItem = SortableElement(({value}) => (
  <Book information={value}/>
));

const SortableList = SortableContainer(({items}) => {
  return (
    <div className="list-group">
      {items.map((value, index) => 
        <SortableItem key={`book-${index}`} index={index} value={value}/>
      )}
    </div>
  );
});

class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };

    this.newBook = this.newBook.bind(this);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({oldIndex, newIndex}) {
    this.setState((state) => {
      state.books = arrayMove(state.books, oldIndex, newIndex);
      return state;
    });
  }

  shouldCancelStart(event) {
    console.log(event.target);
    return !event.target.classList.contains('list-group-item');
  }

  newBook() {
    fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + this.textInput.value)
      .then(res => res.json())
      .then(json => this.setState((state) => {
        if (json.totalItems === 0) return state; // no book found
        const book = json.items[0];
        state.books.push({
          title: book['volumeInfo']['title'],
          authors: book['volumeInfo']['authors'],
          categories: book['volumeInfo']['categories'],
          description: book['volumeInfo']['description'],
          pageCount: book['volumeInfo']['pageCount'],
          imageLink: book['volumeInfo']['imageLinks']['thumbnail'],         
        });
        return state;
      }));
    this.textInput.value = '';
  }

  render() {
    const { books } = this.state;
    const { name } = this.props;
    const id = genid();
    
    return (
      <div className="col-md-4 col-xs-12">
        <div className="col-md-12 col-xs-12 bookshelf">
          <div className="bookshelf-name bottom-buffer-10">
            {name}
            <button 
              type="button" 
              className="close" 
              data-toggle="collapse" 
              data-target={`#bookshelf-${id}`}
            >
              <i className="material-icons">settings</i>
            </button>
          </div>
          
          <SortableList
            items={books}
            onSortEnd={this.onSortEnd}
            shouldCancelStart={this.shouldCancelStart}
            pressDelay={150}
          />

          <div className="top-buffer-10">
            <span className="float-md-right float-sm-right">
              Total books: {books.length}
            </span>
          </div>

          <div className="collapse top-buffer-40" id={`bookshelf-${id}`}>
            <div className="input-group">
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
                  onClick={this.newBook}
                >
                  Add
                </button>
              </span>
            </div>
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
