import React, { Component, PropTypes } from 'react';

import genid from './utils/genid';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readCount: 0,
      review: ''
    };

    this.saveChanges = this.saveChanges.bind(this);
  }

  saveChanges() {
    this.setState((state) => {
      this.newReadCount.value = Math.min(this.newReadCount.value, this.props.information.pageCount);
      state.readCount = this.newReadCount.value;
      state.review = this.newReview.value;
      return state;
    });
  }

  render() {
    const id = genid();
    const { readCount, review } = this.state;
    const { information } = this.props;
    
    return (
      <div>
        <button
          type="button"
          className="list-group-item list-group-item-action"
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
                <h3 className="modal-title">{information.title}</h3>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 col-xs-4">
                    <div className="card text-xs-center">
                      <img className="card-img" src={information.imageLink} alt={information.title}/>
                    </div>
                  </div>
                  <div className="col-md-8 col-xs-8">
                    <p>
                      <b>Authors:</b> {information.authors}
                      <button type="button" className="close" data-toggle="modal" data-target={`#modal-config-${id}`}>
                        <i className="material-icons">settings</i>
                      </button>
                    </p>
                    <p><b>Categories:</b> {information.categories}</p>
                    <p><b>Description:</b> {information.description}</p>
                    <p>
                      <b>Reading Progress:</b>
                      <span className="float-md-right float-sm-right">{readCount}/{information.pageCount}</span>
                    </p>
                    <progress className="progress" value={readCount} max={information.pageCount}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    {review !== '' ? (<p><b>Review:</b> {review}</p>) : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id={`modal-config-${id}`} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                  <form role="form">
                    <div className="form-group row">
                      <label className="col-form-label col-md-4 col-xs-4">Reading Progress</label>
                      <div className="col-md-8 col-xs-8">
                      <div className="input-group">
                        <input 
                          className="form-control" 
                          type="number" 
                          ref={(input) => { this.newReadCount = input; }} 
                          placeholder="Current reading progress..."
                        />
                        <span className="input-group-addon">/{information.pageCount} pages</span>
                      </div>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-4 col-xs-4">Review</label>
                      <div className="col-md-8 col-xs-8">
                        <textarea 
                          className="form-control" 
                          rows="6"
                          ref={(input) => { this.newReview = input; }}
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close without saving</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.saveChanges}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Book.propTypes = {
  information: React.PropTypes.object.isRequired,
}

export default Book;
