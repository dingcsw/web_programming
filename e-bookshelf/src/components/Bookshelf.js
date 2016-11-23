import React, { Component, PropTypes } from 'react';

class Bookshelf extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      books: []
    };

    this.newBook = this.newBook.bind(this);
    this.renderBooks = this.renderBooks.bind(this);
  }

  componentDid

  newBook(event) {
    if (event.keyCode === 13 && event.target.value !== '') {
      fetch("https://www.googleapis.com/books/v1/volumes?q=isbn:" + event.target.value)
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
      event.target.value = '';
    }
  }

  renderBooks() {
    const { books } = this.state;
    return books.map((item, key) => (
      <tr key={key}>
        <th>{key + 1}</th>
        <td>{item.title}</td>
        <td>{item.author}</td>
        <td>{item.ranking}</td>
      </tr>
    ))
  }

  render() {
    const { name, books } = this.state;

    return (
      <div className="col-md-4">
        <div className="col-md-12">    
          <div>
            Bookself name: {name}
          </div>
          <input 
            className="new-book" 
            placeholder="Add new book..." 
            onKeyDown={this.newBook}
          />
          <table className="table table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Ranking</th>
              </tr>
            </thead>
            <tbody>
              {this.renderBooks()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
} 

Bookshelf.propTypes = {
  name: React.PropTypes.string,
};

export default Bookshelf;
