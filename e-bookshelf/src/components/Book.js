import React, { Component, PropTypes } from 'react';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
      review: ''
    };
  }

  render() {
    const { progress, review } = this.state;
    const { information } = this.props;

    return (
      <button type="button" className="list-group-item">
        {information.title}
      </button>
    );
  }
}

Book.propTypes = {
  information: React.PropTypes.object.isRequired,
}

export default Book;
