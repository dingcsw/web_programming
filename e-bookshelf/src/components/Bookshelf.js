import React, { Component } from 'react';

class Bookshelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      books: []
    };
  }

  render() {
    const { name, books } = this.state;

    return (
      <div className="col-md-4">
        <div>
          Bookself name: {name}
        </div>
        <input 
              className="new-book" 
              placeholder="Add new book..." 
              onKeyDown={this.newBook}
        />
        <table className="table table-hover">

        </table>
      </div>
    );
  }
} 

Bookshelf.propTypes = {
  name: React.PropTypes.string,
};

export default Bookshelf;
