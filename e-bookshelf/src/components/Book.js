import React, { Component, PropTypes } from 'react';

import genid from './utils/genid';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readCount: 1,
      review: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState((state) => {
      state.modalIsOpen = true;
      return state;
    });
  }

  closeModal() {
    this.setState((state) => {
      state.modalIsOpen = false;
      return state;
    });
  }

  render() {
    const id = genid();
    const { readCount, review } = this.state;
    const { information } = this.props;
    const progressStyle = {
      minWidth: '3em',
      width: `${readCount / information.pageCount * 100}%`
    }

    return (
      <div>
        <button
          type="button"
          className="list-group-item"
          data-toggle="modal"
          data-target={`#modal-${id}`}
        >
          {information.title}
        </button>

        <div className="modal fade" id={`modal-${id}`} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h3 className="modal-title" id="myModalLabel">{information.title}</h3>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 col-xs-4">
                    <div className="thumbnail">
                      <img src={information.imageLink} alt={information.title}/>
                    </div>
                  </div>
                  <div className="col-md-8 col-xs-8">
                    <p><b>Authors:</b> {information.authors}</p>
                    <p><b>Categories:</b> {information.categories}</p>
                    <p><b>Description:</b> {information.description}</p>
                    <p><b>Reading Progress:</b></p>
                    <div className="progress">
                      <div className="progress-bar" role="progressbar" style={progressStyle}>
                        {readCount}/{information.pageCount}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
/*
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>*/

Book.propTypes = {
  information: React.PropTypes.object.isRequired,
}

export default Book;
