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
      <div className="btn-group-vertical bottom-buffer-10" role="group">
        <button type="button" className="btn btn-default book-btn">
          {information.title}
        </button>
      </div>
    );
  }
}

Book.propTypes = {
  information: React.PropTypes.object.isRequired,
}

export default Book;
