import React, { Component, PropTypes } from 'react';

import genid from './utils/genid';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
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
    const { progress, review } = this.state;
    const { information } = this.props;

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

        <div className="modal fade" id={`modal-${id}`} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">{information.title}</h4>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-3 col-xs-3">
                    <div className="thumbnail">
                      <img src={information.imageLink} alt={information.title}/>
                    </div>
                  </div>
                  <div className="col-md-9 col-xs-9">
                    <p><b>Authors:</b> {information.authors}</p>
                    <p><b>Description:</b> {information.description}</p>
                  </div>
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
